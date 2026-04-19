from ml.predict import predict_demand

def get_prediction(product_id: int):
    result = predict_demand(product_id)

    return {
        "product_id": product_id,
        "predicted_demand": result["predicted_demand"],
        "average_sales": result["average_sales"]
    }