from ml.predict import predict_demand

def get_prediction(product_id: int):
    result = predict_demand(product_id)
    
    return {
        
        "product_id" : product_id,
        "predict_demand" : result,
        "confidence_score" : 0.85
    } 
    