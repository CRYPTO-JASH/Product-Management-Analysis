from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.seasonal_service import get_seasonal_heatmap

router = APIRouter(prefix="/api/seasonal", tags=["Seasonal"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/heatmap")
def heatmap(db: Session = Depends(get_db)):
    return get_seasonal_heatmap(db)