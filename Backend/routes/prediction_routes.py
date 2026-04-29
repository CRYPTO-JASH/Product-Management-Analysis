from fastapi import APIRouter
import requests
from models.arima_model import forecast_demand

router = APIRouter(prefix="/api")

@router.get("/predictions")
def get_predictions():

    # 🔥 GET DATA FROM NODE BACKEND
    res = requests.get("http://localhost:5000/user-shades")
    user_data = res.json()

    results = []

    for item in user_data:
        sales_series = [item["value"]] * 6  # simple time series

        forecast = forecast_demand(sales_series)

        results.append({
            "name": item["name"],
            "predicted_demand": forecast["predicted_demand"],
            "trend": forecast["trend"],
            "confidence": forecast["confidence_score"]
        })

    return results