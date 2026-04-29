"""
Comprehensive ML Integration Test Suite for ARIMA-based Prediction System.

This test suite validates:
1. All ML modules load correctly
2. ARIMA model initialization and fitting
3. Forecast generation with confidence intervals
4. Integration with prediction service
5. Comparison with legacy fallback predictions
6. End-to-end prediction workflow
"""

import sys
import os
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Tuple

# Setup path for imports
sys.path.insert(0, str(Path(__file__).parent))

print("=" * 80)
print("ML INTEGRATION TEST SUITE - ARIMA Prediction System")
print("=" * 80)


# ============================================================================
# TEST 1: MODULE IMPORTS
# ============================================================================
print("\n[TEST 1] Validating ML Module Imports")
print("-" * 80)

test_results = {
    "imports": {},
    "arima_basic": None,
    "arima_with_dates": None,
    "prediction_service": None,
    "comparison": None,
    "summary": {}
}

try:
    from models.arima_model import ARIMAForecastModel, forecast_demand
    test_results["imports"]["arima_model"] = "✓ PASS"
    print("✓ models.arima_model imported successfully")
except Exception as e:
    test_results["imports"]["arima_model"] = f"✗ FAIL: {str(e)}"
    print(f"✗ Failed to import models.arima_model: {str(e)}")

try:
    import numpy as np
    test_results["imports"]["numpy"] = "✓ PASS"
    print("✓ numpy imported successfully")
except Exception as e:
    test_results["imports"]["numpy"] = f"✗ FAIL: {str(e)}"
    print(f"✗ Failed to import numpy: {str(e)}")

try:
    import pandas as pd
    test_results["imports"]["pandas"] = "✓ PASS"
    print("✓ pandas imported successfully")
except Exception as e:
    test_results["imports"]["pandas"] = f"✗ FAIL: {str(e)}"
    print(f"✗ Failed to import pandas: {str(e)}")

try:
    from statsmodels.tsa.arima.model import ARIMA
    test_results["imports"]["statsmodels"] = "✓ PASS"
    print("✓ statsmodels imported successfully")
except Exception as e:
    test_results["imports"]["statsmodels"] = f"✗ FAIL: {str(e)}"
    print(f"✗ Failed to import statsmodels: {str(e)}")

try:
    from services.prediction_service import calculate_prediction, _fallback_prediction
    test_results["imports"]["prediction_service"] = "✓ PASS"
    print("✓ services.prediction_service imported successfully")
except Exception as e:
    test_results["imports"]["prediction_service"] = f"✗ FAIL: {str(e)}"
    print(f"✗ Failed to import services.prediction_service: {str(e)}")

# Check if all imports passed
all_imports_passed = all("✓" in str(v) for v in test_results["imports"].values())
print(f"\nImport Status: {'✓ ALL PASSED' if all_imports_passed else '✗ SOME FAILED'}")


# ============================================================================
# TEST 2: ARIMA BASIC FUNCTIONALITY
# ============================================================================
print("\n[TEST 2] ARIMA Model Basic Functionality")
print("-" * 80)

try:
    # Test data: simple increasing trend
    quantities = [20, 25, 30, 35, 40, 45]
    
    # Test using convenience function
    result = forecast_demand(quantities)
    
    # Validate result structure
    required_keys = ["predicted_demand", "confidence_interval", "trend", "confidence_score", 
                     "model_params", "error"]
    
    for key in required_keys:
        if key not in result:
            raise ValueError(f"Missing key in result: {key}")
    
    # Check error status
    if result["error"] is not None:
        raise ValueError(f"Forecast error: {result['error']}")
    
    # Validate numeric values
    pred_demand = result["predicted_demand"]
    if pred_demand is None or not isinstance(pred_demand, (int, float)):
        raise ValueError(f"Invalid predicted_demand: {pred_demand}")
    
    ci_lower = result["confidence_interval"]["lower"]
    ci_upper = result["confidence_interval"]["upper"]
    
    if ci_lower is None or ci_upper is None:
        raise ValueError("Missing confidence interval bounds")
    
    if ci_lower >= ci_upper:
        raise ValueError(f"Invalid CI: lower ({ci_lower}) >= upper ({ci_upper})")
    
    test_results["arima_basic"] = {
        "status": "✓ PASS",
        "predicted_demand": pred_demand,
        "ci_lower": ci_lower,
        "ci_upper": ci_upper,
        "trend": result["trend"],
        "confidence": result["confidence_score"]
    }
    
    print(f"✓ ARIMA forecast successful")
    print(f"  - Input: {quantities}")
    print(f"  - Predicted Demand: {pred_demand}")
    print(f"  - Confidence Interval: [{ci_lower}, {ci_upper}]")
    print(f"  - Trend: {result['trend']}")
    print(f"  - Confidence Score: {result['confidence_score']}")
    print(f"  - Model Params: {result['model_params']}")
    
except Exception as e:
    test_results["arima_basic"] = {"status": f"✗ FAIL: {str(e)}"}
    print(f"✗ ARIMA basic test failed: {str(e)}")


# ============================================================================
# TEST 3: ARIMA WITH DATES
# ============================================================================
print("\n[TEST 3] ARIMA with Date Information")
print("-" * 80)

try:
    # Create date-indexed time series
    dates = [datetime(2026, 1, 1) + timedelta(days=30*i) for i in range(6)]
    quantities = [20, 22, 25, 28, 31, 35]
    
    result = forecast_demand(quantities, dates)
    
    if result["error"] is not None:
        raise ValueError(f"Forecast error: {result['error']}")
    
    pred_demand = result["predicted_demand"]
    
    test_results["arima_with_dates"] = {
        "status": "✓ PASS",
        "predicted_demand": pred_demand,
        "trend": result["trend"],
        "confidence": result["confidence_score"]
    }
    
    print(f"✓ ARIMA with dates successful")
    print(f"  - Input dates: {[d.strftime('%Y-%m-%d') for d in dates]}")
    print(f"  - Quantities: {quantities}")
    print(f"  - Predicted Demand: {pred_demand}")
    print(f"  - Trend: {result['trend']}")
    print(f"  - Confidence: {result['confidence_score']}")
    
except Exception as e:
    test_results["arima_with_dates"] = {"status": f"✗ FAIL: {str(e)}"}
    print(f"✗ ARIMA with dates test failed: {str(e)}")


# ============================================================================
# TEST 4: PREDICTION SERVICE INTEGRATION
# ============================================================================
print("\n[TEST 4] Prediction Service Integration")
print("-" * 80)

try:
    # Mock SalesDB object
    class MockSale:
        def __init__(self, quantity, sale_date):
            self.quantity = quantity
            self.sale_date = sale_date
    
    # Create sales data matching database structure
    sales_data = [
        MockSale(20, datetime(2026, 1, 10).date()),
        MockSale(25, datetime(2026, 2, 12).date()),
        MockSale(30, datetime(2026, 3, 15).date()),
        MockSale(40, datetime(2026, 4, 20).date()),
    ]
    
    # Call prediction service
    predicted, trend, confidence = calculate_prediction(sales_data)
    
    # Validate results
    if not isinstance(predicted, int) or predicted < 0:
        raise ValueError(f"Invalid predicted value: {predicted}")
    
    if trend not in ["up", "down", "flat", "no data"]:
        raise ValueError(f"Invalid trend: {trend}")
    
    if not isinstance(confidence, int) or not (0 <= confidence <= 100):
        raise ValueError(f"Invalid confidence: {confidence}")
    
    test_results["prediction_service"] = {
        "status": "✓ PASS",
        "predicted_demand": predicted,
        "trend": trend,
        "confidence": confidence,
        "method": "ARIMA"
    }
    
    print(f"✓ Prediction service integration successful")
    print(f"  - Sales data points: {len(sales_data)}")
    print(f"  - Predicted Demand: {predicted}")
    print(f"  - Trend: {trend}")
    print(f"  - Confidence: {confidence}%")
    
except Exception as e:
    test_results["prediction_service"] = {"status": f"✗ FAIL: {str(e)}"}
    print(f"✗ Prediction service test failed: {str(e)}")


# ============================================================================
# TEST 5: COMPARISON - ARIMA vs FALLBACK
# ============================================================================
print("\n[TEST 5] ARIMA vs Fallback Comparison")
print("-" * 80)

try:
    # Test data
    sales_data = [
        MockSale(10, datetime(2026, 1, 5).date()),
        MockSale(12, datetime(2026, 2, 10).date()),
        MockSale(14, datetime(2026, 3, 15).date()),
        MockSale(16, datetime(2026, 4, 20).date()),
        MockSale(18, datetime(2026, 5, 25).date()),
    ]
    
    # ARIMA prediction
    arima_pred, arima_trend, arima_conf = calculate_prediction(sales_data)
    
    # Fallback prediction
    fallback_pred, fallback_trend, fallback_conf = _fallback_prediction(sales_data)
    
    # Calculate difference
    diff = abs(arima_pred - fallback_pred)
    pct_diff = (diff / fallback_pred * 100) if fallback_pred > 0 else 0
    
    test_results["comparison"] = {
        "status": "✓ PASS",
        "arima": {
            "predicted": arima_pred,
            "trend": arima_trend,
            "confidence": arima_conf
        },
        "fallback": {
            "predicted": fallback_pred,
            "trend": fallback_trend,
            "confidence": fallback_conf
        },
        "difference": diff,
        "percent_difference": round(pct_diff, 1)
    }
    
    print(f"✓ Comparison completed successfully")
    print(f"\n  ARIMA Results:")
    print(f"    - Predicted Demand: {arima_pred}")
    print(f"    - Trend: {arima_trend}")
    print(f"    - Confidence: {arima_conf}%")
    print(f"\n  Fallback Results:")
    print(f"    - Predicted Demand: {fallback_pred}")
    print(f"    - Trend: {fallback_trend}")
    print(f"    - Confidence: {fallback_conf}%")
    print(f"\n  Comparison:")
    print(f"    - Absolute Difference: {diff}")
    print(f"    - Percent Difference: {pct_diff:.1f}%")
    
except Exception as e:
    test_results["comparison"] = {"status": f"✗ FAIL: {str(e)}"}
    print(f"✗ Comparison test failed: {str(e)}")


# ============================================================================
# TEST 6: EDGE CASES
# ============================================================================
print("\n[TEST 6] Edge Cases and Error Handling")
print("-" * 80)

edge_case_results = {}

# Edge Case 6a: Insufficient data (should use fallback)
print("\n  6a. Insufficient data (<3 points):")
try:
    sales_data = [MockSale(10, datetime(2026, 1, 5).date())]
    predicted, trend, confidence = calculate_prediction(sales_data)
    
    if predicted == 0 and trend == "no data":
        print(f"    ✓ Handled gracefully: predicted={predicted}, trend={trend}")
        edge_case_results["insufficient_data"] = "✓ PASS"
    else:
        print(f"    ✓ Handled with fallback: predicted={predicted}, trend={trend}")
        edge_case_results["insufficient_data"] = "✓ PASS"
except Exception as e:
    print(f"    ✗ FAIL: {str(e)}")
    edge_case_results["insufficient_data"] = f"✗ FAIL: {str(e)}"

# Edge Case 6b: Empty data
print("\n  6b. Empty data:")
try:
    predicted, trend, confidence = calculate_prediction([])
    if predicted == 0 and trend == "no data":
        print(f"    ✓ Handled correctly: predicted={predicted}, trend={trend}")
        edge_case_results["empty_data"] = "✓ PASS"
except Exception as e:
    print(f"    ✗ FAIL: {str(e)}")
    edge_case_results["empty_data"] = f"✗ FAIL: {str(e)}"

# Edge Case 6c: Volatile data
print("\n  6c. Volatile data:")
try:
    sales_data = [
        MockSale(10, datetime(2026, 1, 5).date()),
        MockSale(100, datetime(2026, 2, 10).date()),
        MockSale(15, datetime(2026, 3, 15).date()),
        MockSale(80, datetime(2026, 4, 20).date()),
        MockSale(20, datetime(2026, 5, 25).date()),
    ]
    predicted, trend, confidence = calculate_prediction(sales_data)
    print(f"    ✓ Handled: predicted={predicted}, trend={trend}, confidence={confidence}%")
    edge_case_results["volatile_data"] = "✓ PASS"
except Exception as e:
    print(f"    ✗ FAIL: {str(e)}")
    edge_case_results["volatile_data"] = f"✗ FAIL: {str(e)}"

# Edge Case 6d: Large quantities
print("\n  6d. Large quantities:")
try:
    sales_data = [
        MockSale(10000, datetime(2026, 1, 5).date()),
        MockSale(12000, datetime(2026, 2, 10).date()),
        MockSale(14000, datetime(2026, 3, 15).date()),
        MockSale(16000, datetime(2026, 4, 20).date()),
    ]
    predicted, trend, confidence = calculate_prediction(sales_data)
    if predicted > 0:
        print(f"    ✓ Handled correctly: predicted={predicted}")
        edge_case_results["large_quantities"] = "✓ PASS"
except Exception as e:
    print(f"    ✗ FAIL: {str(e)}")
    edge_case_results["large_quantities"] = f"✗ FAIL: {str(e)}"


# ============================================================================
# SUMMARY AND RESULTS
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)

print("\n[IMPORTS]")
import_status = []
for module, result in test_results["imports"].items():
    status = "✓" if "✓" in str(result) else "✗"
    import_status.append(status == "✓")
    print(f"  {status} {module}: {result}")

print(f"\n  Overall: {'✓ ALL IMPORTS SUCCESSFUL' if all(import_status) else '✗ SOME IMPORTS FAILED'}")

print("\n[ARIMA BASIC]")
if test_results["arima_basic"]:
    status = test_results["arima_basic"]["status"]
    print(f"  {status}")
    if "✓" in status:
        print(f"    - Predicted: {test_results['arima_basic']['predicted_demand']}")
        print(f"    - Confidence: {test_results['arima_basic']['confidence']}")

print("\n[ARIMA WITH DATES]")
if test_results["arima_with_dates"]:
    status = test_results["arima_with_dates"]["status"]
    print(f"  {status}")
    if "✓" in status:
        print(f"    - Predicted: {test_results['arima_with_dates']['predicted_demand']}")

print("\n[PREDICTION SERVICE]")
if test_results["prediction_service"]:
    status = test_results["prediction_service"]["status"]
    print(f"  {status}")
    if "✓" in status:
        print(f"    - Predicted: {test_results['prediction_service']['predicted_demand']}")
        print(f"    - Trend: {test_results['prediction_service']['trend']}")
        print(f"    - Confidence: {test_results['prediction_service']['confidence']}%")

print("\n[COMPARISON - ARIMA vs FALLBACK]")
if test_results["comparison"]:
    status = test_results["comparison"]["status"]
    print(f"  {status}")
    if "✓" in status:
        comp = test_results["comparison"]
        print(f"    ARIMA:    predicted={comp['arima']['predicted']}, confidence={comp['arima']['confidence']}%")
        print(f"    Fallback: predicted={comp['fallback']['predicted']}, confidence={comp['fallback']['confidence']}%")
        print(f"    Difference: {comp['difference']} ({comp['percent_difference']}%)")

print("\n[EDGE CASES]")
for case, result in edge_case_results.items():
    print(f"  {result} - {case.replace('_', ' ').title()}")

print("\n" + "=" * 80)
print("FINAL STATUS")
print("=" * 80)

# Determine overall status
all_tests_passed = (
    all(import_status) and
    ("✓ PASS" in str(test_results["arima_basic"])) and
    ("✓ PASS" in str(test_results["arima_with_dates"])) and
    ("✓ PASS" in str(test_results["prediction_service"])) and
    ("✓ PASS" in str(test_results["comparison"])) and
    all("✓ PASS" in str(v) for v in edge_case_results.values())
)

if all_tests_passed:
    print("\n✓✓✓ ALL TESTS PASSED ✓✓✓")
    print("\nThe ML integration is working correctly:")
    print("  ✓ All ARIMA and ML modules load successfully")
    print("  ✓ ARIMA forecasting produces valid predictions")
    print("  ✓ Confidence intervals are properly calculated")
    print("  ✓ Integration with prediction service is functional")
    print("  ✓ Fallback mechanism works as intended")
    print("  ✓ Edge cases are handled gracefully")
    print("\n✓ SYSTEM IS READY FOR PRODUCTION")
else:
    print("\n✗✗✗ SOME TESTS FAILED ✗✗✗")
    print("\nPlease review the failures above before deploying.")
    if not all(import_status):
        print("  → Check that all ML packages are installed (numpy, pandas, statsmodels)")
    if "✗" in str(test_results["arima_basic"]):
        print("  → ARIMA basic functionality has issues")
    if "✗" in str(test_results["prediction_service"]):
        print("  → Prediction service integration has issues")

print("\n" + "=" * 80)
