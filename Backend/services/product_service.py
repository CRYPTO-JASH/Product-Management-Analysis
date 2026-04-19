from models.database import SessionLocal
from models.product_model import ProductDB

def create_product(product):
    db = SessionLocal()

    db_product = ProductDB(
        id=product.id,
        name=product.name,
        category=product.category,
        price=product.price,
        sku=product.sku
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    db.close()

    return db_product


def get_products():
    db = SessionLocal()
    products = db.query(ProductDB).all()
    db.close()
    return products