from models.product_db import ProductDB

def create_product(product, db):

    db_product = ProductDB(
        name=product.name,
        category=product.category,
        price=product.price,
        sku=product.sku,
        stock=product.stock,
        color_hex=product.color_hex
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return {
        "id": db_product.id,
        "name": db_product.name,
        "category": db_product.category,
        "price": db_product.price,
        "sku": db_product.sku,
        "stock": db_product.stock,
        "color_hex": db_product.color_hex
    }

def get_products(db):

    products = db.query(ProductDB).all()

    result = []

    for p in products:
        result.append({
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "price": p.price,
            "sku": p.sku,
            "stock": p.stock,
            "color_hex": p.color_hex
        })

    return result