"""
Integration guide for ARIMA Forecasting Model

The arima_model.py module provides statistical time-series forecasting
for product demand prediction.

QUICK USAGE:
============

1. Simple one-shot forecast:
   
   from models.arima_model import forecast_demand
   
   quantities = [20, 25, 30, 40, 35, 45]
   result = forecast_demand(quantities)
   
   # Returns:
   # {
   #   'predicted_demand': 48.5,
   #   'confidence_interval': {'upper': 55.2, 'lower': 41.8},
   #   'trend': 'positive',
   #   'confidence_score': 75.5,
   #   'model_params': {'order': (1,1,1), 'aic': 123.45, 'bic': 124.56},
   #   'error': None
   # }

2. Using the model class for more control:
   
   from models.arima_model import ARIMAForecastModel
   from datetime import datetime
   
   model = ARIMAForecastModel(arima_order=(1, 1, 1))
   
   # With historical dates
   dates = [datetime(2026, 1, 1), datetime(2026, 2, 1), ...]
   quantities = [20, 25, 30, ...]
   
   if model.fit(quantities, dates):
       forecast = model.forecast(periods=1)
       print(f"Next month forecast: {forecast['predicted_demand']}")
   else:
       print("Fit failed - insufficient data")

INTEGRATION WITH SALES ROUTES:
==============================

In your FastAPI routes, you can integrate like this:

    from models.arima_model import forecast_demand
    from datetime import datetime
    
    @router.get("/products/{product_id}/forecast")
    async def get_product_forecast(product_id: int, db: Session):
        # Get sales history for this product
        sales = db.query(SalesDB).filter(
            SalesDB.product_id == product_id
        ).order_by(SalesDB.sale_date).all()
        
        if len(sales) < 3:
            return {"error": "Insufficient data for forecasting"}
        
        quantities = [s.quantity for s in sales]
        dates = [s.sale_date for s in sales]
        
        forecast = forecast_demand(quantities, dates)
        return forecast

FEATURES:
=========

✓ ARIMA(1,1,1) default - suitable for most demand patterns
✓ Automatic confidence intervals at 95% confidence level
✓ Data quality scoring (0-100) based on:
  - Number of data points
  - Variance/consistency
  - Presence of outliers
✓ Trend detection (positive/negative/stable)
✓ Graceful handling of insufficient data (< 3 points)
✓ AIC/BIC model statistics for comparison
✓ Works with or without date information

WHAT IS ARIMA?
==============

ARIMA = AutoRegressive Integrated Moving Average

- AutoRegressive (AR): Uses past values to predict future
- Integrated (I): Handles non-stationary data through differencing
- Moving Average (MA): Uses past forecast errors

Order (p,d,q):
- p=1: Uses 1 previous value (AR component)
- d=1: Differences once to make data stationary
- q=1: Uses 1 previous error (MA component)

Perfect for sales forecasting where demand depends on:
- Previous demand patterns
- Trends and seasonality
- Random variations

EDGE CASES HANDLED:
===================

1. Too few data points (< 3):
   Returns error message with graceful fallback

2. Volatile/high-variance data:
   Still produces forecast but confidence score reflects uncertainty

3. Insufficient training data for full ARIMA:
   Model adapts gracefully with reduced order parameters

4. Missing dates:
   Uses sequential indices instead of time-based

CONFIDENCE SCORE INTERPRETATION:
================================

80-100: High confidence - stable, consistent pattern with good data
60-80:  Moderate confidence - some variability but usable
40-60:  Low confidence - volatile or limited data, use with caution
<40:    Very low confidence - data too sparse or inconsistent

Always check confidence_score before relying on predictions!
"""
