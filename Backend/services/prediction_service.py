from ml.predict import predict_demand
from services.product_service import get_products

def get_prediction(product_id: int, db):

    result = predict_demand(product_id, db)

    return {
        "product_id": product_id,
        "predicted_demand": result["predicted_demand"],
        "average_sales": result["average_sales"],
        "trend": result["trend"]
    }


def get_all_predictions(db):
    products = get_products(db)

    result = []

    for p in products:
        # dummy prediction (replace later)
        predicted = p["stock"] * 0.8 + 20

        result.append({
            "product": p["name"],
            "predicted_demand": predicted,
            "confidence": 80,
            "suggested_stock": int(predicted * 1.2),
            "trend": "up"
        })

    return result