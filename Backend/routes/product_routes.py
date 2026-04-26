from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from services.product_service import create_product, get_products

router = APIRouter(prefix="/api/products", tags=["Products"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_product(product, db: Session = Depends(get_db)):
    return create_product(product, db)


@router.get("/")
def all_products(db: Session = Depends(get_db)):
    return get_products(db)