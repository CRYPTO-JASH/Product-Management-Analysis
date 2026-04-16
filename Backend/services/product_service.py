products_db = []

def create_product(product):
    products_db.append(product)
    return product

def get_products():
    return products_db  

