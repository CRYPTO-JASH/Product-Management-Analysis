from services.product_service import get_products
from services.prediction_service import get_all_predictions


def get_inventory_risk(db):
    products = get_products(db)
    predictions = get_all_predictions(db)

    pred_map = {p["product"]: p for p in predictions}

    risk_items = []

    for product in products:
        name = product["name"]
        stock = product["stock"]

        pred = pred_map.get(name)

        if not pred:
            continue

        predicted = pred["predicted_demand"]

        # correct logic
        if stock < 0.7 * predicted:
            risk_level = "high"
        elif stock < predicted:
            risk_level = "medium"
        else:
            risk_level = "safe"

        shortage = max(predicted - stock, 0)

        risk_items.append({
            "name": name,
            "color_hex": product["color_hex"],
            "stock": stock,
            "predicted_demand": predicted,
            "shortage": shortage,
            "risk_level": risk_level
        })

    risk_items.sort(key=lambda x: x["shortage"], reverse=True)

    return risk_items