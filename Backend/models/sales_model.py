from pydantic import BaseModel, Field
from datetime import date
from sqlalchemy import Column, Integer, Date, Float
from models.database import Base

# Pydantic schema
class SalesData(BaseModel):
    id: int
    product_id: int
    quantity: int = Field(gt=0)
    sale_date: date
    discount: float = Field(default=0, ge=0, le=100)

# SQLAlchemy model
class SalesDB(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer)
    quantity = Column(Integer)
    sale_date = Column(Date)
    discount = Column(Float)