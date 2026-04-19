from ml.predict import predict_demand
from services.alert_service import generate_alert

def get_prediction(product_id: int):
    result = predict_demand(product_id)

    current_stock = 20

    alert = generate_alert(result["predicted_demand"], current_stock)

    return {
        "product_id": product_id,
        "predicted_demand": result["predicted_demand"],
        "average_sales": result["average_sales"],
        "trend": result["trend"],
        "alert": alert
    }