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
        pred = get_prediction(p.id, db)

        result.append({
            "product": {
                "name": p.name,
                "sku": p.sku
            },
            "predicted_demand": pred["predicted_demand"],
            "confidence": 80,
            "suggested_stock": int(pred["predicted_demand"] * 1.25),
            "trend": pred["trend"]
        })

    return result