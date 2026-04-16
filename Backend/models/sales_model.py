from pydantic import BaseModel
from datetime import date

class SalesData(BaseModel):
    id : int
    product_id : int
    quantity : int
    sale_date : date
    discount  : float