from fastapi import APIRouter, Depends
from fastapi import APIRouter

from models.database import SessionLocal
from services.inventory_service import get_inventory_risk
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/inventory", tags=["Inventory"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/risk")
def inventory_risk(db: Session = Depends(get_db)):
    return get_inventory_risk(db)