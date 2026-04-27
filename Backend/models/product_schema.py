from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    sku: str
    stock: int
    color_hex: str