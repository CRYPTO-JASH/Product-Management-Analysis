from fastapi import APIRouter
from services.prediction_service import get_prediction, get_all_predictions

router = APIRouter()


@router.get("/{product_id}")
def predict_single(product_id: int):
    return get_prediction(product_id)


@router.get("/")
def predict_all():
    return get_all_predictions()