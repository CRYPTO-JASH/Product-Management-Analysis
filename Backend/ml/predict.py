from models.sales_model import SalesDB

def predict_demand(product_id: int, db):

    sales = db.query(SalesDB).filter(
        SalesDB.product_id == product_id
    ).all()

    if not sales:
        return {
            "predicted_demand": 0,
            "average_sales": 0,
            "trend": "no data"
        }

    quantities = [s.quantity for s in sales]

    avg = sum(quantities) / len(quantities)

    # Simple trend logic
    trend = "up" if quantities[-1] > quantities[0] else "down"

    predicted = int(avg * 1.1)

    return {
        "predicted_demand": predicted,
        "average_sales": avg,
        "trend": trend
    }