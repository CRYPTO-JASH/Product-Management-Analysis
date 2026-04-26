from sqlalchemy import Column, Integer, String, Float
from models.database import Base

class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    category = Column(String)
    price = Column(Float)
    sku = Column(String)
    stock = Column(Integer)
    color_hex = Column(String)