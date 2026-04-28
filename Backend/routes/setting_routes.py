from fastapi import APIRouter
from services.settings_service import get_settings, save_settings

router = APIRouter()

@router.get("/settings")
def fetch_settings():
    return get_settings()

@router.post("/settings")
def update_settings(data: dict):
    save_settings(data)
    return {"message": "Settings saved successfully"}   