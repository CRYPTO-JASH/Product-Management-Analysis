from fastapi import FastAPI
from routes.prediction_routes import router as prediction_router
from routes.product_routes import router as product_router
from routes.sales_routes import router as sales_router
from routes.color_routes import router as color_router  
from routes.trending_routes import router as trending_router
from models.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title = "Product Management Analysis")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    
    return {"message": "Welcome to the Product Management Analysis API!"}

app.include_router(prediction_router, prefix="/api/predictions", tags=["predictions"])
app.include_router(product_router)
app.include_router(sales_router)
app.include_router(color_router, prefix="/api/colors", tags=["colors"])
app.include_router(trending_router)