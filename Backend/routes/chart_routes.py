from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.chart_service import get_monthly_demand

router = APIRouter(prefix="/api/charts", tags=["Charts"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/monthly-demand")
def monthly_demand(db: Session = Depends(get_db)):
    return get_monthly_demand(db)