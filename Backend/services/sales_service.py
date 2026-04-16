sales_db = []

def add_sale(sale):
    
    for s in sales_db:
        if s.id == sale.id:
            return {"error": "Sale with this ID already exists"}
    sales_db.append(sale)
    return sale

def get_sales():
    return sales_db
