"""
Test script for model training functionality
"""

import sys
import logging
from models.database import SessionLocal, engine, Base
from models.product_db import ProductDB
from models.sales_model import SalesDB
from models.train_model import train_all_models, model_exists, load_model, get_model_metadata

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_training():
    """Test the training functionality"""
    
    print("=" * 70)
    print("ARIMA Model Training Test")
    print("=" * 70)
    
    db = SessionLocal()
    
    try:
        print("\n[Step 1] Checking database...")
        products_count = db.query(ProductDB).count()
        sales_count = db.query(SalesDB).count()
        print(f"  Products in DB: {products_count}")
        print(f"  Sales records in DB: {sales_count}")
        
        if products_count == 0 or sales_count == 0:
            print("  ⚠️  Database appears empty. Seed data first with seed_data.py")
            return False
        
        print("\n[Step 2] Training all models...")
        results = train_all_models(db)
        
        print(f"\n[Step 3] Training Results:")
        print(f"  Successfully trained: {len(results['successful'])} products")
        print(f"  Failed: {len(results['failed'])} products")
        print(f"  Insufficient data: {len(results['insufficient_data'])} products")
        
        if results['successful']:
            print(f"  Product IDs trained: {results['successful']}")
        
        if results['failed']:
            print(f"  Failed product IDs: {results['failed']}")
        
        if results['insufficient_data']:
            print(f"  Insufficient data product IDs: {results['insufficient_data']}")
        
        print(f"\n[Step 4] Summary:")
        for key, value in results['summary'].items():
            print(f"  {key}: {value}")
        
        print("\n[Step 5] Testing model loading...")
        if results['successful']:
            test_product_id = results['successful'][0]
            print(f"  Loading model for product {test_product_id}...")
            
            exists = model_exists(test_product_id)
            print(f"  Model exists: {exists}")
            
            if exists:
                model = load_model(test_product_id)
                if model:
                    print(f"  Model loaded successfully")
                    forecast = model.forecast(periods=1)
                    print(f"  Forecast: {forecast['predicted_demand']} units")
                    print(f"  Confidence: {forecast['confidence_score']}")
                    
                    metadata = get_model_metadata(test_product_id)
                    if metadata:
                        print(f"  Model trained at: {metadata['trained_at']}")
                        print(f"  Data quality score: {metadata['data_quality_score']}")
                else:
                    print("  ❌ Failed to load model")
                    return False
        
        print("\n" + "=" * 70)
        print("✓ Training test completed successfully!")
        print("=" * 70)
        return True
        
    except Exception as e:
        print(f"\n❌ Error during test: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    success = test_training()
    sys.exit(0 if success else 1)
