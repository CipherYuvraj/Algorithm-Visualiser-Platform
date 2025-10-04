from motor.motor_asyncio import AsyncIOMotorClient
from app.database.analytics_schema import AnalyticsDB
import os

# Get MongoDB connection string from environment or use default
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
DB_NAME = os.getenv("MONGODB_DB_NAME", "algorithm_visualizer")

# Create a global client instance
client = AsyncIOMotorClient(MONGODB_URL)
db = client[DB_NAME]

# Initialize collections
analytics_db = AnalyticsDB(db)

# Dependency to get database instance
async def get_database():
    return db
