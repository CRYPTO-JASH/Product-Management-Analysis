from models.sales_model import SalesDB
from services.product_service import get_products
from sqlalchemy import extract
from datetime import datetime


def get_product_sales(db, product_id):
    return (
        db.query(SalesDB)
        .filter(SalesDB.product_id == product_id)
        .all()
    )


def calculate_prediction(sales):

    if not sales:
        return 0, "no data", 50

    # split recent vs older
    recent = []
    older = []

    current_month = datetime.now().month

    for s in sales:
        if abs(current_month - s.sale_date.month) <= 2:
            recent.append(s.quantity)
        else:
            older.append(s.quantity)

    recent_avg = sum(recent) / len(recent) if recent else 0
    older_avg = sum(older) / len(older) if older else 0

    # prediction = weighted average
    predicted = (0.7 * recent_avg) + (0.3 * older_avg)

    # trend detection
    if recent_avg > older_avg:
        trend = "up"
    elif recent_avg < older_avg:
        trend = "down"
    else:
        trend = "flat"

    # confidence
    total_points = len(sales)

    if total_points > 10:
        confidence = 90
    elif total_points > 5:
        confidence = 75
    else:
        confidence = 60

    return int(predicted), trend, confidence


def get_all_predictions(db):
    products = get_products(db)

    result = []

    for p in products:
        sales = get_product_sales(db, p["id"])

        predicted, trend, confidence = calculate_prediction(sales)

        suggested_stock = int(predicted * 1.2)

        result.append({
            "product": p["name"],
            "predicted_demand": predicted,
            "confidence": confidence,
            "suggested_stock": suggested_stock,
            "trend": trend
        })

    return result