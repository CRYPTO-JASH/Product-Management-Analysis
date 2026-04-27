import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration class with common settings"""
    
    # Database Configuration
    DATABASE_URL = os.getenv(
        'DATABASE_URL',
        'sqlite:///test.db'
    )
    
    # API Configuration
    API_KEY = os.getenv('API_KEY', None)
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    
    # Debug Settings
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 't')
    TESTING = os.getenv('TESTING', 'False').lower() in ('true', '1', 't')
    
    # Application Settings
    APP_NAME = os.getenv('APP_NAME', 'Product Management API')
    APP_ENV = os.getenv('APP_ENV', 'development')
    
    # Server Configuration
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    # Logging Configuration
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    LOG_FORMAT = os.getenv('LOG_FORMAT', '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    # Security Settings
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))  # 16MB


class DevelopmentConfig(Config):
    """Development environment configuration"""
    DEBUG = True
    TESTING = False
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///test.db')
    LOG_LEVEL = 'DEBUG'


class TestingConfig(Config):
    """Testing environment configuration"""
    DEBUG = True
    TESTING = True
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///:memory:')
    LOG_LEVEL = 'DEBUG'


class ProductionConfig(Config):
    """Production environment configuration"""
    DEBUG = False
    TESTING = False
    DATABASE_URL = os.getenv('DATABASE_URL')
    
    # Ensure critical settings are set in production
    if not DATABASE_URL:
        raise ValueError('DATABASE_URL environment variable must be set in production')
    
    if not API_KEY:
        raise ValueError('API_KEY environment variable must be set in production')
    
    LOG_LEVEL = 'WARNING'


# Configuration dictionary for easy access
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}


def get_config(env=None):
    """
    Get configuration object based on environment.
    
    Args:
        env (str): Environment name ('development', 'testing', 'production').
                   If None, uses APP_ENV environment variable or defaults to 'development'.
    
    Returns:
        Config: Configuration class for the specified environment
    """
    if env is None:
        env = os.getenv('APP_ENV', 'development').lower()
    
    return config.get(env, config['default'])
