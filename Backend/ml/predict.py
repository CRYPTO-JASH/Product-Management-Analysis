from services.sales_service import get_sales

def predict_demand(product_id: int):
    sales = get_sales()

    # filter sales for this product
    product_sales = [s for s in sales if s.product_id == product_id]

    if not product_sales:
        return {
            "predicted_demand": 0,
            "average_sales": 0
        }

    total = sum(s.quantity for s in product_sales)
    avg = total / len(product_sales)

    return {
        "predicted_demand": avg,
        "average_sales": avg
    }