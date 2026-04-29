from fastapi import APIRouter
from fastapi.responses import FileResponse
import pandas as pd
import requests
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os

router = APIRouter(prefix="/api")

# 🔥 GET DATA FROM EXISTING PREDICTIONS API
def get_prediction_data():
    res = requests.get("http://127.0.0.1:8000/api/predictions")
    return res.json()


# =========================
# 📊 EXCEL REPORT
# =========================
@router.get("/report/pdf")
def generate_pdf():
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas
    import requests

    data = requests.get("http://127.0.0.1:8000/api/predictions").json()

    file_path = "report.pdf"
    c = canvas.Canvas(file_path, pagesize=letter)

    y = 750

    # 🔥 TITLE
    c.setFont("Helvetica-Bold", 14)
    c.drawString(180, 780, "Demand Prediction Report")

    c.setFont("Helvetica", 10)

    for item in data:
        product = item.get("product")

        if isinstance(product, dict):
            name = product.get("name", "Unknown")
        else:
            name = product or item.get("product_name") or item.get("name") or "Unknown"

        demand = str(item.get("predicted_demand", 0))
        trend = str(item.get("trend", "N/A"))

        text = f"{name} | Demand: {demand} | Trend: {trend}"

        c.drawString(50, y, text)
        y -= 18

        if y < 50:
            c.showPage()
            c.setFont("Helvetica", 10)
            y = 750

    c.save()

    return FileResponse(file_path, filename="demand_report.pdf")