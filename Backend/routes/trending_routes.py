from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.trending_service import get_trending_products

router = APIRouter(prefix="/api/trending", tags=["Trending"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def trending(db: Session = Depends(get_db)):
    return get_trending_products(db)