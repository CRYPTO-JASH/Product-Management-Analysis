from pydantic import BaseModel, Field
from datetime import date

class SalesData(BaseModel):
    id: int
    product_id: int
    quantity: int = Field(gt=0)
    sale_date: date
    discount: float = Field(default=0, ge=0, le=100)