from fastapi import APIRouter
import pandas as pd
from models.arima_model import forecast_demand

router = APIRouter(prefix="/api")

@router.get("/predictions")
def get_predictions():

    df = pd.read_csv("sales_data.csv")

    results = []

    colors = df["name"].unique()

    for color in colors:
        color_df = df[df["name"] == color]

        sales_series = color_df["sales"].tolist()

        # use last 12 months
        if len(sales_series) < 6:
            continue

        forecast = forecast_demand(sales_series[-12:])

        results.append({
            "name": color,
            "predicted_demand": float(forecast["predicted_demand"]),
            "trend": forecast["trend"],
            "confidence": float(forecast["confidence_score"])
        })

    return results