from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.prediction_service import get_all_predictions

router = APIRouter(prefix="/api/predictions", tags=["Predictions"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_predictions(db: Session = Depends(get_db)):
    return get_all_predictions(db)