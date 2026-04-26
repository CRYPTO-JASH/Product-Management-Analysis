from fastapi import APIRouter
from services.trending_service import get_trending

router = APIRouter()

@router.get("/")
def fetch_trending():
    return get_trending()