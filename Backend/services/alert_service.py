def generate_alert(predicted_demand, current_stock):

    if predicted_demand > current_stock:
        return {
            "alert": "⚠️ High demand expected! Stock may run out.",
            "recommended_action": "Reorder stock"
        }

    return {
        "alert": "Stock level is sufficient",
        "recommended_action": "No action needed"
    }