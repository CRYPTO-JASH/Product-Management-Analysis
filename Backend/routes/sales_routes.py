from fastapi import APIRouter, UploadFile, File
import pandas as pd
import io
from services.sales_service import add_sale, get_sales
from models.sales_model import SalesData

router = APIRouter()

@router.post("/")
def upload_sales(file: UploadFile = File(...)):
    
    contents = file.file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    data = df.to_dict(orient="records")

    for row in data:
        sale = SalesData(**row)   # convert dict → model
        add_sale(sale)

    return {
        "message": f"Successfully uploaded {len(data)} sales records.",
        "rows": len(data),
        "preview": data[:5]
    }


@router.get("/")
def fetch_sales():
    return get_sales()