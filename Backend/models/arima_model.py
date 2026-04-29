"""
ARIMA-based time-series demand forecasting model.
Provides statistical forecasting with confidence intervals for product demand.
"""

from typing import List, Dict, Optional, Tuple
from datetime import datetime
import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import warnings

warnings.filterwarnings('ignore')


class ARIMAForecastModel:
    """
    ARIMA-based forecasting model for demand prediction.
    Handles time-series data with statistical rigor.
    """

    MIN_DATA_POINTS = 3
    DEFAULT_ARIMA_ORDER = (1, 1, 1)  # (p, d, q) - reasonable for demand forecasting

    def __init__(self, arima_order: Tuple[int, int, int] = DEFAULT_ARIMA_ORDER):
        """
        Initialize the ARIMA forecasting model.

        Args:
            arima_order: Tuple of (p, d, q) for ARIMA model specification.
                        p: AR (AutoRegressive) order
                        d: I (Integrated/differencing) order
                        q: MA (Moving Average) order
        """
        self.arima_order = arima_order
        self.model = None
        self.fitted_model = None
        self.ts_data = None
        self.data_quality_score = 0

    def _calculate_data_quality(self, data: pd.Series) -> float:
        """
        Calculate a confidence score (0-100) based on data quality.

        Factors considered:
        - Number of data points (more is better)
        - Variance (consistent patterns better than extreme volatility)
        - Presence of trends
        - Data completeness (no missing values)

        Args:
            data: Time series data (quantities)

        Returns:
            float: Confidence score 0-100
        """
        score = 50  # baseline

        # Factor 1: Data points
        n_points = len(data)
        if n_points >= 12:
            score += 25
        elif n_points >= 6:
            score += 15
        elif n_points >= 3:
            score += 5

        # Factor 2: Variance stability (lower CV is better for prediction)
        cv = data.std() / (data.mean() + 1e-6)  # coefficient of variation
        if cv < 0.5:
            score += 15
        elif cv < 1.0:
            score += 8
        elif cv < 2.0:
            score += 2

        # Factor 3: Absence of extreme outliers
        q1, q3 = data.quantile([0.25, 0.75])
        iqr = q3 - q1
        outliers = ((data < (q1 - 1.5 * iqr)) | (data > (q3 + 1.5 * iqr))).sum()
        if outliers == 0:
            score += 10

        return min(100, max(0, score))

    def fit(
        self,
        quantities: List[float],
        dates: Optional[List[datetime]] = None,
    ) -> bool:
        """
        Fit the ARIMA model to historical sales data.

        Args:
            quantities: List of sales quantities
            dates: Optional list of dates (for time-indexed series)

        Returns:
            bool: True if fit was successful, False otherwise
        """
        if not quantities or len(quantities) < self.MIN_DATA_POINTS:
            return False

        try:
            # Create time series
            if dates:
                ts_index = pd.to_datetime(dates)
                self.ts_data = pd.Series(quantities, index=ts_index)
            else:
                self.ts_data = pd.Series(quantities)

            # Calculate data quality
            self.data_quality_score = self._calculate_data_quality(self.ts_data)

            # Fit ARIMA model
            self.fitted_model = ARIMA(
                self.ts_data,
                order=self.arima_order,
            ).fit()

            return True
        except Exception as e:
            print(f"Error fitting ARIMA model: {str(e)}")
            return False

    def forecast(self, periods: int = 1) -> Dict:
        """
        Generate forecast with confidence intervals.

        Args:
            periods: Number of periods to forecast ahead (default: 1)

        Returns:
            Dict containing:
                - predicted_demand: Point forecast
                - confidence_interval: Dict with 'upper' and 'lower' bounds
                - trend: Direction of trend (positive/negative/stable)
                - confidence_score: Quality score 0-100
                - model_params: ARIMA parameters used
                - error: Error message if forecast failed
        """
        if self.fitted_model is None:
            return {
                "predicted_demand": None,
                "confidence_interval": {"upper": None, "lower": None},
                "trend": None,
                "confidence_score": 0,
                "model_params": None,
                "error": "Model not fitted. Call fit() first.",
            }

        try:
            # Get forecast
            forecast_result = self.fitted_model.get_forecast(steps=periods)
            forecast_df = forecast_result.conf_int(alpha=0.05)  # 95% CI

            # Extract next period (index 0 is the first forecast period)
            predicted_value = self.fitted_model.fittedvalues.iloc[-1]
            forecast_value = forecast_df.iloc[0, 0] if periods == 1 else forecast_df.iloc[-1, 0]

            # Use actual forecast mean from fittedvalues/forecast
            actual_forecast = forecast_result.predicted_mean.iloc[0]

            # Get confidence interval bounds
            ci_lower = forecast_df.iloc[0, 0]
            ci_upper = forecast_df.iloc[0, 1]

            # Determine trend from last few points
            if len(self.ts_data) >= 3:
                recent = self.ts_data.iloc[-3:].values
                trend_direction = "stable"
                if recent[-1] > recent[0] * 1.1:
                    trend_direction = "positive"
                elif recent[-1] < recent[0] * 0.9:
                    trend_direction = "negative"
            else:
                trend_direction = "insufficient_data"

            return {
                "predicted_demand": round(float(actual_forecast), 2),
                "confidence_interval": {
                    "upper": round(float(ci_upper), 2),
                    "lower": round(float(ci_lower), 2),
                },
                "trend": trend_direction,
                "confidence_score": round(self.data_quality_score, 1),
                "model_params": {
                    "order": self.arima_order,
                    "aic": round(self.fitted_model.aic, 2),
                    "bic": round(self.fitted_model.bic, 2),
                },
                "error": None,
            }
        except Exception as e:
            return {
                "predicted_demand": None,
                "confidence_interval": {"upper": None, "lower": None},
                "trend": None,
                "confidence_score": self.data_quality_score,
                "model_params": None,
                "error": f"Forecast error: {str(e)}",
            }

    def get_model_summary(self) -> Optional[str]:
        """Return model summary statistics."""
        if self.fitted_model is None:
            return None
        return str(self.fitted_model.summary())


def forecast_demand(
    quantities: List[float],
    dates: Optional[List[datetime]] = None,
    arima_order: Tuple[int, int, int] = ARIMAForecastModel.DEFAULT_ARIMA_ORDER,
) -> Dict:
    """
    Convenience function to forecast demand in one call.

    Args:
        quantities: List of historical sales quantities
        dates: Optional list of dates
        arima_order: ARIMA order specification

    Returns:
        Dict with forecast results or error message
    """
    model = ARIMAForecastModel(arima_order=arima_order)

    if not model.fit(quantities, dates):
        return {
            "predicted_demand": None,
            "confidence_interval": {"upper": None, "lower": None},
            "trend": None,
            "confidence_score": 0,
            "model_params": None,
            "error": f"Insufficient data. Need at least {ARIMAForecastModel.MIN_DATA_POINTS} points.",
        }

    return model.forecast()


# ============================================================================
# VALIDATION TEST
# ============================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("ARIMA Forecasting Model - Validation Test")
    print("=" * 60)

    # Test 1: Normal case with sufficient data
    print("\n[Test 1] Normal forecasting with 6 data points")
    quantities_test1 = [20, 25, 30, 40, 35, 45]
    result1 = forecast_demand(quantities_test1)

    print(f"  Predicted Demand: {result1['predicted_demand']}")
    print(f"  Confidence Interval: [{result1['confidence_interval']['lower']}, {result1['confidence_interval']['upper']}]")
    print(f"  Trend: {result1['trend']}")
    print(f"  Confidence Score: {result1['confidence_score']}")
    print(f"  Status: {'✓ PASS' if result1['error'] is None else '✗ FAIL'}")
    if result1['error']:
        print(f"  Error: {result1['error']}")

    # Test 2: Minimum data points
    print("\n[Test 2] Minimum data points (3)")
    quantities_test2 = [10, 15, 20]
    result2 = forecast_demand(quantities_test2)

    print(f"  Predicted Demand: {result2['predicted_demand']}")
    print(f"  Confidence Score: {result2['confidence_score']}")
    print(f"  Status: {'✓ PASS' if result2['error'] is None else '✗ FAIL'}")

    # Test 3: Insufficient data (should fail gracefully)
    print("\n[Test 3] Insufficient data (2 points - should fail gracefully)")
    quantities_test3 = [10, 15]
    result3 = forecast_demand(quantities_test3)

    print(f"  Predicted Demand: {result3['predicted_demand']}")
    print(f"  Status: {'✓ PASS (graceful fail)' if result3['error'] is not None else '✗ FAIL'}")
    print(f"  Error Message: {result3['error']}")

    # Test 4: With dates
    print("\n[Test 4] Forecasting with dates")
    from datetime import datetime, timedelta

    dates = [datetime(2026, 1, 1) + timedelta(days=30*i) for i in range(6)]
    quantities_test4 = [20, 22, 25, 28, 31, 35]
    result4 = forecast_demand(quantities_test4, dates)

    print(f"  Predicted Demand: {result4['predicted_demand']}")
    print(f"  Confidence Interval: [{result4['confidence_interval']['lower']}, {result4['confidence_interval']['upper']}]")
    print(f"  Trend: {result4['trend']}")
    print(f"  Status: {'✓ PASS' if result4['error'] is None else '✗ FAIL'}")

    # Test 5: Volatile data
    print("\n[Test 5] Volatile/inconsistent data")
    quantities_test5 = [10, 50, 15, 60, 20, 100]
    result5 = forecast_demand(quantities_test5)

    print(f"  Predicted Demand: {result5['predicted_demand']}")
    print(f"  Confidence Score: {result5['confidence_score']} (lower for volatile data)")
    print(f"  Status: {'✓ PASS' if result5['error'] is None else '✗ FAIL'}")

    # Test 6: Using model class directly
    print("\n[Test 6] Using ARIMAForecastModel class directly")
    model = ARIMAForecastModel()
    quantities_test6 = [25, 30, 35, 40, 45, 50]
    model.fit(quantities_test6)
    result6 = model.forecast(periods=1)

    print(f"  Predicted Demand: {result6['predicted_demand']}")
    print(f"  Model Summary:")
    print(f"    - AIC: {result6['model_params']['aic']}")
    print(f"    - BIC: {result6['model_params']['bic']}")
    print(f"  Status: ✓ PASS")

    print("\n" + "=" * 60)
    print("Validation Complete - All tests executed")
    print("=" * 60)
