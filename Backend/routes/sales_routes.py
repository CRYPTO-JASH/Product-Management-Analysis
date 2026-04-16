from fastapi import APIRouter
from services.sales_service import add_sale, get_sales
from models.sales_model import SalesData

router = APIRouter()

@router.post("/")
def create_sale(sale: SalesData):
    return add_sale(sale)

@router.get("/")
def fetch_sales():
    return get_sales()

