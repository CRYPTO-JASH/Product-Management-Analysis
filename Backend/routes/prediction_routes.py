from fastapi import APIRouter, HTTPException
from services.prediction_service import get_prediction

router = APIRouter()

@router.get("/")
def predict(product_id : int):
    return get_prediction(product_id)

   