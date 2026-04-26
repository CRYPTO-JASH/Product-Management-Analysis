from models.sales_model import SalesDB
from sqlalchemy import extract


def get_monthly_demand(db):

    data = (
        db.query(
            extract("month", SalesDB.sale_date).label("month"),
            SalesDB.quantity
        )
        .all()
    )

    # initialize all months
    monthly = {i: 0 for i in range(1, 13)}

    for row in data:
        month = int(row.month)
        monthly[month] += row.quantity

    result = []

    for m in range(1, 13):
        result.append({
            "month": m,
            "total_sales": monthly[m]
        })

    return result