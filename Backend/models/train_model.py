"""
Model training and persistence module for ARIMA models.

This module handles training ARIMA models for each product, persisting them to disk,
and loading them for use in prediction services. Models are trained on historical
sales data and saved with metadata for tracking.
"""

import os
import pickle
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List

import pandas as pd
from sqlalchemy.orm import Session

from models.arima_model import ARIMAForecastModel
from models.sales_model import SalesDB

logger = logging.getLogger(__name__)

MODELS_DIR = Path(__file__).parent / "trained_models"
ARIMA_ORDER = (1, 1, 1)


def ensure_models_directory():
    """Ensure the trained_models directory exists."""
    MODELS_DIR.mkdir(exist_ok=True, parents=True)


def _get_model_path(product_id: int) -> Path:
    """Get the file path for a trained model."""
    return MODELS_DIR / f"{product_id}.pkl"


def _get_metadata_path(product_id: int) -> Path:
    """Get the file path for model metadata."""
    return MODELS_DIR / f"{product_id}_metadata.json"


def model_exists(product_id: int) -> bool:
    """
    Check if a trained model exists for a product.
    
    Args:
        product_id: The product ID to check
        
    Returns:
        bool: True if model file exists, False otherwise
    """
    return _get_model_path(product_id).exists()


def load_model(product_id: int) -> Optional[ARIMAForecastModel]:
    """
    Load a trained model from disk.
    
    Args:
        product_id: The product ID of the model to load
        
    Returns:
        ARIMAForecastModel: The loaded model, or None if not found
    """
    model_path = _get_model_path(product_id)
    
    if not model_path.exists():
        logger.warning(f"Model file not found for product {product_id}")
        return None
    
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        logger.info(f"Successfully loaded model for product {product_id}")
        return model
    except Exception as e:
        logger.error(f"Error loading model for product {product_id}: {str(e)}")
        return None


def _save_model(product_id: int, model: ARIMAForecastModel, product_info: Dict) -> bool:
    """
    Save a trained model to disk with metadata.
    
    Args:
        product_id: The product ID
        model: The fitted ARIMA model
        product_info: Dictionary with product information
        
    Returns:
        bool: True if save successful, False otherwise
    """
    try:
        model_path = _get_model_path(product_id)
        
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        
        metadata = {
            "product_id": product_id,
            "product_name": product_info.get("name", "Unknown"),
            "product_category": product_info.get("category", "Unknown"),
            "trained_at": datetime.utcnow().isoformat(),
            "arima_order": ARIMA_ORDER,
            "data_quality_score": round(model.data_quality_score, 1),
            "num_data_points": len(model.ts_data) if model.ts_data is not None else 0,
            "model_params": {
                "aic": round(model.fitted_model.aic, 2) if model.fitted_model else None,
                "bic": round(model.fitted_model.bic, 2) if model.fitted_model else None,
            } if model.fitted_model else None
        }
        
        metadata_path = _get_metadata_path(product_id)
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        logger.info(f"Successfully saved model for product {product_id}")
        return True
    except Exception as e:
        logger.error(f"Error saving model for product {product_id}: {str(e)}")
        return False


def train_all_models(db: Session) -> Dict:
    """
    Train ARIMA models for all products with sufficient sales data.
    
    This function:
    1. Retrieves all products from the database
    2. Gets sales history for each product
    3. Trains an ARIMA(1,1,1) model if sufficient data exists
    4. Saves models and metadata to disk
    5. Logs training results
    
    Args:
        db: SQLAlchemy database session
        
    Returns:
        Dict with training results containing:
            - successful: List of product IDs with successfully trained models
            - failed: List of product IDs that failed to train
            - insufficient_data: List of product IDs with insufficient data
            - summary: Summary statistics
    """
    ensure_models_directory()
    
    from models.product_db import ProductDB
    
    results = {
        "successful": [],
        "failed": [],
        "insufficient_data": [],
        "summary": {}
    }
    
    try:
        products = db.query(ProductDB).all()
        
        if not products:
            logger.warning("No products found in database")
            results["summary"]["message"] = "No products found"
            return results
        
        logger.info(f"Starting training for {len(products)} products")
        
        for product in products:
            product_id = product.id
            
            sales = db.query(SalesDB).filter(SalesDB.product_id == product_id).all()
            
            if not sales:
                logger.warning(f"No sales data for product {product_id}")
                results["insufficient_data"].append(product_id)
                continue
            
            if len(sales) < ARIMAForecastModel.MIN_DATA_POINTS:
                logger.warning(
                    f"Insufficient data for product {product_id}: "
                    f"{len(sales)} points < {ARIMAForecastModel.MIN_DATA_POINTS} required"
                )
                results["insufficient_data"].append(product_id)
                continue
            
            quantities = sorted(sales, key=lambda s: s.sale_date)
            quantities_list = [s.quantity for s in quantities]
            dates_list = [s.sale_date for s in quantities]
            
            model = ARIMAForecastModel(arima_order=ARIMA_ORDER)
            
            if not model.fit(quantities_list, dates_list):
                logger.error(f"Failed to fit ARIMA model for product {product_id}")
                results["failed"].append(product_id)
                continue
            
            product_info = {
                "id": product.id,
                "name": product.name,
                "category": product.category,
                "sku": product.sku
            }
            
            if _save_model(product_id, model, product_info):
                results["successful"].append(product_id)
                logger.info(f"Product {product_id} ({product.name}): Model trained successfully")
            else:
                results["failed"].append(product_id)
                logger.error(f"Failed to save model for product {product_id}")
        
        results["summary"] = {
            "total_products": len(products),
            "successfully_trained": len(results["successful"]),
            "failed_training": len(results["failed"]),
            "insufficient_data": len(results["insufficient_data"]),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        logger.info(f"Training complete: {results['summary']}")
        
        return results
        
    except Exception as e:
        logger.error(f"Fatal error during training: {str(e)}")
        results["summary"]["error"] = str(e)
        return results


def get_model_metadata(product_id: int) -> Optional[Dict]:
    """
    Get metadata for a trained model.
    
    Args:
        product_id: The product ID
        
    Returns:
        Dict with model metadata, or None if not found
    """
    metadata_path = _get_metadata_path(product_id)
    
    if not metadata_path.exists():
        return None
    
    try:
        with open(metadata_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading metadata for product {product_id}: {str(e)}")
        return None


def delete_model(product_id: int) -> bool:
    """
    Delete a trained model and its metadata.
    
    Args:
        product_id: The product ID
        
    Returns:
        bool: True if deletion successful
    """
    try:
        model_path = _get_model_path(product_id)
        metadata_path = _get_metadata_path(product_id)
        
        if model_path.exists():
            model_path.unlink()
        
        if metadata_path.exists():
            metadata_path.unlink()
        
        logger.info(f"Deleted model for product {product_id}")
        return True
    except Exception as e:
        logger.error(f"Error deleting model for product {product_id}: {str(e)}")
        return False


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    print("Model training module loaded successfully")
