from services.sales_service import get_sales

def predict_demand(product_id: int):
    sales = get_sales()

    product_sales = [s for s in sales if s.product_id == product_id]

    if not product_sales:
        return {
            "predicted_demand": 0,
            "average_sales": 0,
            "trend": "no data"
        }

    quantities = [s.quantity for s in product_sales]

    # Normal average
    avg = sum(quantities) / len(quantities)

    # Weighted average (recent data more important)
    weights = list(range(1, len(quantities) + 1))
    weighted_avg = sum(q * w for q, w in zip(quantities, weights)) / sum(weights)

    # Trend detection
    if len(quantities) >= 2:
        if quantities[-1] > quantities[0]:
            trend = "increasing 📈"
        elif quantities[-1] < quantities[0]:
            trend = "decreasing 📉"
        else:
            trend = "stable"
    else:
        trend = "insufficient data"

    return {
        "predicted_demand": round(weighted_avg, 2),
        "average_sales": round(avg, 2),
        "trend": trend
    }