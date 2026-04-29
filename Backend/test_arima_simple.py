#!/usr/bin/env python
"""Simple test to verify ARIMA model works."""

import sys
sys.path.insert(0, '.')

try:
    from models.arima_model import forecast_demand, ARIMAForecastModel
    print("✓ Successfully imported ARIMA model")
    
    # Test basic functionality
    quantities = [20, 25, 30, 40, 35, 45]
    result = forecast_demand(quantities)
    
    print(f"✓ Forecast generated successfully")
    print(f"  Predicted: {result['predicted_demand']}")
    print(f"  CI: [{result['confidence_interval']['lower']}, {result['confidence_interval']['upper']}]")
    print(f"  Trend: {result['trend']}")
    print(f"  Score: {result['confidence_score']}")
    
    # Test class usage
    model = ARIMAForecastModel()
    model.fit([10, 15, 20, 25, 30])
    forecast = model.forecast()
    print(f"✓ Direct class usage works")
    print(f"  Model params: {forecast['model_params']}")
    
    print("\n✓✓✓ All tests passed!")
    
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
