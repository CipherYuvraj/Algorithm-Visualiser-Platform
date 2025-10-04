from pymongo import MongoClient, IndexModel, ASCENDING
from datetime import datetime, timedelta
import os

class AnalyticsDB:
    def __init__(self, db):
        self.db = db
        self.analytics_collection = db.analytics_events
        self.feedback_collection = db.user_feedback
        self.consent_collection = db.user_consent
        self.setup_indexes()
    
    def setup_indexes(self):
        # Create indexes for better query performance
        analytics_indexes = [
            IndexModel([("timestamp", ASCENDING)]),
            IndexModel([("event_type", ASCENDING)]),
            IndexModel([("user_session", ASCENDING)]),
            IndexModel([("algorithm", ASCENDING)]),
        ]
        
        feedback_indexes = [
            IndexModel([("timestamp", ASCENDING)]),
            IndexModel([("user_session", ASCENDING)]),
            IndexModel([("algorithm", ASCENDING)]),
        ]
        
        consent_indexes = [
            IndexModel([("user_session", ASCENDING)]),
            IndexModel([("timestamp", ASCENDING)]),
        ]
        
        self.analytics_collection.create_indexes(analytics_indexes)
        self.feedback_collection.create_indexes(feedback_indexes)
        self.consent_collection.create_indexes(consent_indexes)
    
    def clean_old_data(self, days_to_keep=90):
        """Remove data older than specified days for GDPR compliance"""
        cutoff_date = datetime.utcnow() - timedelta(days=days_to_keep)
        
        self.analytics_collection.delete_many({
            "timestamp": {"$lt": cutoff_date}
        })
        
        self.feedback_collection.delete_many({
            "timestamp": {"$lt": cutoff_date}
        })
