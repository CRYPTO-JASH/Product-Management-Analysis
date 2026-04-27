from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from models.product_schema import ProductCreate
from services.product_service import create_product, get_products

router = APIRouter(prefix="/api/products", tags=["Products"])


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE PRODUCT
@router.post("/")
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    return create_product(product, db)


# GET ALL PRODUCTS
@router.get("/")
def all_products(db: Session = Depends(get_db)):
    return get_products(db)