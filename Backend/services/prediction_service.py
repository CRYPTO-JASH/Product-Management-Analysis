from models.sales_model import SalesDB
from services.product_service import get_products
from models.arima_model import forecast_demand
from sqlalchemy import extract
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def get_product_sales(db, product_id):
    return (
        db.query(SalesDB)
        .filter(SalesDB.product_id == product_id)
        .all()
    )


def _fallback_prediction(sales):
    """Fallback to weighted average logic when ARIMA fails."""
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


def calculate_prediction(sales):
    """
    Calculate demand prediction using ARIMA model with fallback logic.
    
    Args:
        sales: List of SalesDB objects with quantity and sale_date attributes
    
    Returns:
        Tuple of (predicted_demand: int, trend: str, confidence: int)
    """
    if not sales:
        return 0, "no data", 50

    # Minimum 3 data points for ARIMA
    if len(sales) < 3:
        logger.warning(f"Insufficient data for ARIMA ({len(sales)} points). Using fallback.")
        return _fallback_prediction(sales)

    try:
        # Extract quantities and dates from sales objects
        quantities = [s.quantity for s in sales]
        dates = [s.sale_date for s in sales]

        # Call ARIMA forecast
        result = forecast_demand(quantities, dates)

        # Check if forecast was successful
        if result.get("error"):
            logger.warning(f"ARIMA forecast failed: {result['error']}. Using fallback.")
            return _fallback_prediction(sales)

        # Extract and format results
        predicted_demand = result.get("predicted_demand")
        if predicted_demand is None:
            logger.warning("ARIMA returned None for predicted_demand. Using fallback.")
            return _fallback_prediction(sales)

        # Map ARIMA trend to UI format
        arima_trend = result.get("trend", "stable")
        if arima_trend == "positive":
            trend = "up"
        elif arima_trend == "negative":
            trend = "down"
        else:
            trend = "flat"

        # Use confidence score from ARIMA (0-100 scale)
        confidence = int(result.get("confidence_score", 60))

        return int(predicted_demand), trend, confidence

    except Exception as e:
        logger.error(f"Exception in ARIMA forecast: {str(e)}. Using fallback.")
        return _fallback_prediction(sales)


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