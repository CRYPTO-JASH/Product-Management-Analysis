from models.database import SessionLocal
from models.sales_model import SalesDB

def add_sale(sale):
    db = SessionLocal()

    db_sale = SalesDB(
        id=sale.id,
        product_id=sale.product_id,
        quantity=sale.quantity,
        sale_date=sale.sale_date,
        discount=sale.discount
    )

    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)

    db.close()

    return db_sale


def get_sales():
    db = SessionLocal()
    sales = db.query(SalesDB).all()
    db.close()
    return sales