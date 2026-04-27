"""
Database seeding script for pre-populating SQLite with sample products and sales data.
This script can be run independently to initialize the database with demo data.

Usage:
    python seed_data.py
"""

import sys
from datetime import datetime, timedelta
from random import randint, uniform, choice
from pathlib import Path

# Add parent directory to path to import models
sys.path.insert(0, str(Path(__file__).parent))

from models.database import engine, SessionLocal
from models.product_db import ProductDB
from models.sales_model import SalesDB
from models.database import Base


# Sample product data
SAMPLE_PRODUCTS = [
    {
        "name": "Wireless Headphones",
        "category": "Electronics",
        "price": 79.99,
        "sku": "WH-001",
        "stock": 150,
        "color_hex": "#1f77b4"
    },
    {
        "name": "USB-C Cable",
        "category": "Electronics",
        "price": 12.99,
        "sku": "UC-002",
        "stock": 500,
        "color_hex": "#ff7f0e"
    },
    {
        "name": "Mechanical Keyboard",
        "category": "Electronics",
        "price": 129.99,
        "sku": "MK-003",
        "stock": 80,
        "color_hex": "#2ca02c"
    },
    {
        "name": "Laptop Stand",
        "category": "Accessories",
        "price": 34.99,
        "sku": "LS-004",
        "stock": 200,
        "color_hex": "#d62728"
    },
    {
        "name": "Desk Lamp",
        "category": "Lighting",
        "price": 49.99,
        "sku": "DL-005",
        "stock": 120,
        "color_hex": "#9467bd"
    },
    {
        "name": "Phone Stand",
        "category": "Accessories",
        "price": 19.99,
        "sku": "PS-006",
        "stock": 300,
        "color_hex": "#8c564b"
    },
    {
        "name": "Wireless Mouse",
        "category": "Electronics",
        "price": 39.99,
        "sku": "WM-007",
        "stock": 250,
        "color_hex": "#e377c2"
    },
    {
        "name": "Screen Protector",
        "category": "Accessories",
        "price": 9.99,
        "sku": "SP-008",
        "stock": 1000,
        "color_hex": "#7f7f7f"
    },
    {
        "name": "Power Bank",
        "category": "Electronics",
        "price": 44.99,
        "sku": "PB-009",
        "stock": 180,
        "color_hex": "#bcbd22"
    },
    {
        "name": "Webcam HD",
        "category": "Electronics",
        "price": 59.99,
        "sku": "WC-010",
        "stock": 100,
        "color_hex": "#17becf"
    }
]


def create_sample_sales(session, product_ids, num_sales=100):
    """
    Generate random sales records for the past 6 months.
    
    Args:
        session: SQLAlchemy session
        product_ids: List of valid product IDs
        num_sales: Number of sales records to create
    """
    sales_records = []
    start_date = datetime.now() - timedelta(days=180)
    
    for _ in range(num_sales):
        # Random date within last 180 days
        random_days = randint(0, 180)
        sale_date = start_date + timedelta(days=random_days)
        
        sale = SalesDB(
            product_id=choice(product_ids),
            quantity=randint(1, 50),
            sale_date=sale_date.date(),
            discount=round(uniform(0, 30), 2)  # 0-30% discount
        )
        sales_records.append(sale)
    
    session.add_all(sales_records)
    session.commit()


def seed_database():
    """
    Create tables and populate database with sample data.
    """
    try:
        # Create all tables
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        
        session = SessionLocal()
        
        # Check if data already exists
        existing_products = session.query(ProductDB).count()
        if existing_products > 0:
            print(f"Database already contains {existing_products} products.")
            response = input("Do you want to clear and reseed? (yes/no): ").strip().lower()
            if response != "yes":
                print("Seeding cancelled.")
                session.close()
                return
            
            # Clear existing data
            print("Clearing existing data...")
            session.query(SalesDB).delete()
            session.query(ProductDB).delete()
            session.commit()
        
        # Insert sample products
        print(f"Inserting {len(SAMPLE_PRODUCTS)} sample products...")
        products = []
        for product_data in SAMPLE_PRODUCTS:
            product = ProductDB(**product_data)
            session.add(product)
            products.append(product)
        
        session.commit()
        
        # Get product IDs
        product_ids = [p.id for p in session.query(ProductDB).all()]
        print(f"Successfully created {len(product_ids)} products with IDs: {product_ids}")
        
        # Insert sample sales
        print("Inserting 100 sample sales records...")
        create_sample_sales(session, product_ids, num_sales=100)
        
        total_sales = session.query(SalesDB).count()
        print(f"Successfully created {total_sales} sales records")
        
        session.close()
        
        print("\n✓ Database seeding completed successfully!")
        print(f"  - Products: {len(SAMPLE_PRODUCTS)}")
        print(f"  - Sales Records: {total_sales}")
        print(f"  - Database: test.db")
        
    except Exception as e:
        print(f"✗ Error during database seeding: {e}")
        raise


if __name__ == "__main__":
    print("=" * 60)
    print("SQLite Database Seeding Script")
    print("=" * 60)
    seed_database()
