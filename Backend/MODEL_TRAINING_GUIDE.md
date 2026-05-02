# ARIMA Model Training and Persistence

## Overview

The `train_model.py` module provides functionality to train ARIMA time-series forecasting models for each product and persist them to disk for quick loading in prediction services.

## Features

- **Batch Training**: Trains ARIMA models for all products with sufficient sales data
- **Model Persistence**: Saves trained models using pickle format
- **Metadata Tracking**: Stores training metadata including timestamp, data quality score, and model parameters
- **Edge Case Handling**: Gracefully handles products with insufficient data, no sales history, or fitting errors
- **Model Loading**: Quick retrieval of pre-trained models from disk
- **Quality Metrics**: Calculates and stores data quality scores with each model

## Module Structure

### Main Functions

#### `train_all_models(db: Session) -> Dict`

Trains ARIMA models for all products with sufficient sales data.

**Parameters:**
- `db`: SQLAlchemy database session

**Returns:**
```python
{
    "successful": [1, 3, 5],  # Product IDs with trained models
    "failed": [4],             # Product IDs that failed to train
    "insufficient_data": [2],  # Product IDs without enough data
    "summary": {
        "total_products": 4,
        "successfully_trained": 3,
        "failed_training": 1,
        "insufficient_data": 1,
        "timestamp": "2026-01-15T10:30:00.123456"
    }
}
```

**Model Specifications:**
- ARIMA Order: (1, 1, 1)
- Minimum Data Points: 3
- Data Quality Score: 0-100 (based on data volume, variance, outliers)

#### `load_model(product_id: int) -> Optional[ARIMAForecastModel]`

Loads a pre-trained model from disk.

**Parameters:**
- `product_id`: The product ID to load

**Returns:**
- Loaded `ARIMAForecastModel` instance, or `None` if not found

**Example:**
```python
model = load_model(1)
if model:
    forecast = model.forecast(periods=1)
    print(f"Predicted demand: {forecast['predicted_demand']}")
```

#### `model_exists(product_id: int) -> bool`

Checks if a trained model exists for a product.

**Parameters:**
- `product_id`: The product ID to check

**Returns:**
- `True` if model file exists, `False` otherwise

#### `get_model_metadata(product_id: int) -> Optional[Dict]`

Retrieves metadata for a trained model.

**Returns:**
```python
{
    "product_id": 1,
    "product_name": "Product A",
    "product_category": "Category",
    "trained_at": "2026-01-15T10:30:00.123456",
    "arima_order": [1, 1, 1],
    "data_quality_score": 75.5,
    "num_data_points": 12,
    "model_params": {
        "aic": 42.56,
        "bic": 45.78
    }
}
```

#### `delete_model(product_id: int) -> bool`

Deletes a trained model and its metadata.

**Returns:**
- `True` if successful, `False` otherwise

### Helper Functions

#### `model_exists(product_id: int) -> bool`

Check if a model file exists for a product.

#### `ensure_models_directory()`

Creates the `trained_models/` directory if it doesn't exist.

## Storage Structure

Models are stored in the `Backend/models/trained_models/` directory:

```
trained_models/
├── 1.pkl                    # Pickled model for product 1
├── 1_metadata.json          # Metadata for product 1
├── 2.pkl                    # Pickled model for product 2
├── 2_metadata.json          # Metadata for product 2
└── ...
```

## Usage

### Training All Models

```python
from models.database import SessionLocal
from models.train_model import train_all_models

db = SessionLocal()
results = train_all_models(db)
print(f"Trained {results['summary']['successfully_trained']} models")
db.close()
```

### Running the Training Script

```bash
python run_training.py
```

### Testing the Training Module

```bash
python test_train_model.py
```

### Integration with Prediction Service

In `prediction_service.py`:

```python
from models.train_model import load_model, model_exists

def predict_with_trained_model(product_id):
    if model_exists(product_id):
        model = load_model(product_id)
        forecast = model.forecast(periods=1)
        return forecast['predicted_demand']
    else:
        # Fallback to simpler prediction method
        return None
```

## Error Handling

The module gracefully handles several error scenarios:

1. **No Sales Data**: Products without any sales records are skipped
2. **Insufficient Data**: Products with < 3 data points are marked as `insufficient_data`
3. **Model Fitting Errors**: Errors during ARIMA fitting are logged and the product is marked as `failed`
4. **File I/O Errors**: Issues saving/loading models are logged and reported
5. **Database Errors**: Connection issues are caught and reported

## Logging

The module uses Python's logging module. All operations are logged at appropriate levels:

- **INFO**: Successful model training and loading
- **WARNING**: Missing data, insufficient data points
- **ERROR**: Fitting failures, save/load errors

To enable detailed logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Performance Considerations

- **Training Time**: Depends on number of products and data points per product
  - Typically <100ms per product with 6-12 data points
  - Total training for 10 products: ~1-2 seconds
  
- **Storage Size**: ~5-10 KB per model (pickle + metadata)
  - 100 products: ~1 MB total

- **Loading Time**: ~1-5ms per model load

## Data Requirements

For a product to have a trained model:

1. Minimum 3 sales data points in the database
2. Sales data sorted by date for proper time-series analysis
3. Quantity values > 0

## Edge Cases Handled

- **Sparse Data**: Works with as few as 3 data points
- **Volatile Demand**: Assigns lower confidence scores to highly variable data
- **Single Data Point Repeated**: Can fit models to constant demand patterns
- **Outliers**: Model and metadata quality score reflects outlier presence
- **Missing Products**: Skips products with no sales history

## Quality Scores

Data quality scores (0-100) are calculated based on:

- **Data Volume** (0-25 points)
  - 3+ points: 5 points
  - 6+ points: 15 points
  - 12+ points: 25 points

- **Variance Stability** (0-15 points)
  - CV < 0.5: 15 points
  - CV < 1.0: 8 points
  - CV < 2.0: 2 points

- **Outlier Absence** (0-10 points)
  - No outliers: 10 points

- **Baseline**: 50 points

## Integration Points

The training module is designed to integrate with:

1. **Prediction Service** (`services/prediction_service.py`)
   - Load trained models for faster predictions
   - Fall back to simpler methods if trained model unavailable

2. **API Routes** (`routes/prediction_routes.py`)
   - Expose endpoints to trigger training
   - Return training results and status

3. **Admin Dashboard** (Frontend)
   - Display training status and results
   - Show model metadata and quality scores

## Future Enhancements

Potential improvements for future versions:

1. **Model Versioning**: Keep multiple versions of trained models
2. **Auto-Retraining**: Scheduled retraining when new sales data arrives
3. **Hyperparameter Tuning**: Automatically determine best ARIMA order
4. **Performance Metrics**: Track forecast accuracy against actual sales
5. **Model Comparison**: Compare ARIMA with other forecasting methods
6. **Async Training**: Background training job queue
