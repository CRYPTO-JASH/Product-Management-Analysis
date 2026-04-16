from fastapi import APIRouter
from models.product_model import Product
from services.product_service import create_product, get_products

router = APIRouter()

@router.post("/")
def add_product(product:Product):
    return create_product(product)

@router.get("/")
def fetch_products():
    return get_products()
