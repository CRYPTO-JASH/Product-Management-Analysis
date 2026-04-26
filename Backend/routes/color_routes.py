from fastapi import APIRouter, Query
from services.color_service import get_colors

router = APIRouter()

@router.get("/")
def fetch_colors(type: str = Query(None)):
    colors = get_colors()
    
    if type:
        colors = [c for c in colors if c["type"].lower() == type.lower()]
    
    return colors