from fastapi import APIRouter
from services.color_service import get_colors

router = APIRouter()

@router.get("/")
def fetch_colors():
    return get_colors()