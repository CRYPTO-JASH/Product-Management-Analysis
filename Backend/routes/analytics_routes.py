from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.analytics_service import get_dashboard_summary

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/summary")
def summary(db: Session = Depends(get_db)):
    return get_dashboard_summary(db)