from pydantic import BaseModel

class Forecast(BaseModel):
    product_id: int
    predicted_demand: float
    average_sales: float