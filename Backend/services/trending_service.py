from services.product_service import get_products
from ml.predict import predict_demand

def get_trending_products(db):

    products = get_products(db)

    result = []

    for p in products:

        # ✅ p is dict now
        product_id = p["id"]

        pred = predict_demand(product_id, db)

        growth = 1.2 if pred["trend"] == "up" else 0.9

        score = pred["predicted_demand"] * growth

        result.append({
            "name": p["name"],
            "color_hex": p["color_hex"],
            "category": p["category"],
            "predicted_demand": pred["predicted_demand"],
            "trend": pred["trend"],
            "score": score
        })

    result.sort(key=lambda x: x["score"], reverse=True)

    return result[:5]