from fastapi import FastAPI
from routes.prediction_routes import router as prediction_router
from routes.product_routes import router as product_router
from routes.sales_routes import router as sales_router
from models.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title = "Product Management Analysis")

@app.get("/")
def home():
    
    return {"message": "Welcome to the Product Management Analysis API!"}

app.include_router(prediction_router, prefix="/api/predictions", tags=["predictions"])
app.include_router(product_router, prefix="/api/products", tags=["products"])
app.include_router(sales_router , prefix="/api/sales", tags=["sales"])