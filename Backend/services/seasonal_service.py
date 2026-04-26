from models.sales_model import SalesDB
from models.product_db import ProductDB
from sqlalchemy import extract


def get_seasonal_heatmap(db):

    data = (
        db.query(
            ProductDB.category,
            extract("month", SalesDB.sale_date).label("month"),
            SalesDB.quantity
        )
        .join(ProductDB, ProductDB.id == SalesDB.product_id)
        .all()
    )

    result = {}

    # initialize structure
    for row in data:
        category = row.category

        if category not in result:
            result[category] = {i: 0 for i in range(1, 13)}

    # fill values
    for row in data:
        category = row.category
        month = int(row.month)

        result[category][month] += row.quantity

    # convert to list
    final = []

    for category, months in result.items():
        final.append({
            "category": category,
            "data": months
        })

    return final