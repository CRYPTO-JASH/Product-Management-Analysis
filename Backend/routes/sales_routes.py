from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from models.database import SessionLocal
from models.sales_model import SalesDB
import csv
from io import StringIO
from datetime import datetime

router = APIRouter(prefix="/api/sales", tags=["Sales"])


# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Upload CSV
@router.post("/")
async def upload_sales(file: UploadFile = File(...), db: Session = Depends(get_db)):

    contents = await file.read()

    decoded = contents.decode("utf-8")
    csv_reader = csv.DictReader(StringIO(decoded))

    count = 0

    for row in csv_reader:
        sale = SalesDB(
            product_id=int(row["product_id"]),
            quantity=int(row["quantity"]),
            sale_date=datetime.strptime(row["sale_date"], "%Y-%m-%d"),
            discount=float(row.get("discount", 0))
        )
        db.add(sale)
        count += 1

    db.commit()

    return {
        "message": f"Uploaded {count} sales records"
    }


# ✅ Get all sales
@router.get("/")
def get_sales(db: Session = Depends(get_db)):
    return db.query(SalesDB).all()