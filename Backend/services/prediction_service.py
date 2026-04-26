from ml.predict import predict_demand
from services.product_service import get_products


def get_prediction(product_id: int):
    result = predict_demand(product_id)

    predicted = result["predicted_demand"]

    return {
        "product_id": product_id,
        "predicted_demand": predicted,
        "average_sales": result["average_sales"],
        "trend": result["trend"],
        "confidence": 80,
        "suggested_stock": int(predicted * 1.25)
    }


def get_all_predictions():
    products = get_products()

    result = []

    for p in products:
        pred = get_prediction(p["id"])

        result.append({
            "product": {
                "name": p["name"],
                "sku": p["sku"]
            },
            "predicted_demand": pred["predicted_demand"],
            "confidence": pred["confidence"],
            "suggested_stock": pred["suggested_stock"],
            "trend": pred["trend"]
        })

    return result