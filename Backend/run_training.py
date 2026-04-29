"""
Production training script for ARIMA models
Run this to train and persist models for all products
"""

import logging
import sys
from models.database import SessionLocal
from models.train_model import train_all_models

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """Main training function"""
    logger.info("Starting ARIMA model training...")
    
    db = SessionLocal()
    
    try:
        results = train_all_models(db)
        
        print("\n" + "=" * 70)
        print("TRAINING COMPLETE")
        print("=" * 70)
        print(f"Successfully trained: {results['summary']['successfully_trained']}")
        print(f"Failed: {results['summary']['failed_training']}")
        print(f"Insufficient data: {results['summary']['insufficient_data']}")
        print("=" * 70 + "\n")
        
        if results['summary'].get('error'):
            logger.error(f"Training error: {results['summary']['error']}")
            return 1
        
        if results['successful']:
            logger.info(f"Successfully trained products: {results['successful']}")
        
        if results['failed']:
            logger.warning(f"Failed to train products: {results['failed']}")
        
        if results['insufficient_data']:
            logger.warning(f"Insufficient data for products: {results['insufficient_data']}")
        
        return 0
        
    except Exception as e:
        logger.error(f"Fatal error during training: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1
    finally:
        db.close()

if __name__ == "__main__":
    sys.exit(main())
