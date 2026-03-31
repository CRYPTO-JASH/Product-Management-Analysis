from fastapi import FastAPI
from routes.prediction_routes import router as prediction_router

app = FastAPI(title = "Product Management Analysis")

@app.get("/")
def home():
    
    return {"message": "Welcome to the Product Management Analysis API!"}

app.include_router(prediction_router, prefix="/api/predictions", tags=["predictions"])