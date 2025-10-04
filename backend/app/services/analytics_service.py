from app.models.analytics import AnalyticsEvent, UserFeedback, ConsentSettings
from app.database.analytics_schema import AnalyticsDB
from datetime import datetime, timedelta
from typing import List, Dict, Any
import hashlib
import json

class AnalyticsService:
    def __init__(self, db):
        self.analytics_db = AnalyticsDB(db)
    
    async def log_event(self, event: AnalyticsEvent) -> bool:
        """Log analytics event if user has consented"""
        try:
            # Check user consent first
            consent = await self.analytics_db.consent_collection.find_one({
                "user_session": event.user_session
            })
            
            if not consent or not consent.get("analytics_consent", False):
                return False
            
            # Convert to dict and store
            event_dict = event.dict()
            event_dict["timestamp"] = event_dict["timestamp"].isoformat()
            
            await self.analytics_db.analytics_collection.insert_one(event_dict)
            return True
        except Exception as e:
            print(f"Analytics logging error: {e}")
            return False
    
    async def submit_feedback(self, feedback: UserFeedback) -> bool:
        """Submit user feedback if consented"""
        try:
            # Check consent
            consent = await self.analytics_db.consent_collection.find_one({
                "user_session": feedback.user_session
            })
            
            if not consent or not consent.get("feedback_consent", False):
                return False
            
            feedback_dict = feedback.dict()
            feedback_dict["timestamp"] = feedback_dict["timestamp"].isoformat()
            
            await self.analytics_db.feedback_collection.insert_one(feedback_dict)
            return True
        except Exception as e:
            print(f"Feedback submission error: {e}")
            return False
    
    async def update_consent(self, consent: ConsentSettings) -> bool:
        """Update or create user consent settings"""
        try:
            consent_dict = consent.dict()
            consent_dict["timestamp"] = consent_dict["timestamp"].isoformat()
            
            await self.analytics_db.consent_collection.update_one(
                {"user_session": consent.user_session},
                {"$set": consent_dict},
                upsert=True
            )
            return True
        except Exception as e:
            print(f"Consent update error: {e}")
            return False
    
    async def get_analytics_summary(self, days: int = 30) -> Dict[str, Any]:
        """Get analytics summary for dashboard"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        pipeline = [
            {"$match": {"timestamp": {"$gte": start_date.isoformat()}}},
            {"$group": {
                "_id": "$event_type",
                "count": {"$sum": 1}
            }}
        ]
        
        event_counts = await self.analytics_db.analytics_collection.aggregate(pipeline).to_list(None)
        
        # Algorithm popularity
        algorithm_pipeline = [
            {"$match": {
                "event_type": "algorithm_execution",
                "timestamp": {"$gte": start_date.isoformat()}
            }},
            {"$group": {
                "_id": "$algorithm",
                "executions": {"$sum": 1},
                "avg_execution_time": {"$avg": "$execution_time"},
                "avg_input_size": {"$avg": "$input_size"}
            }},
            {"$sort": {"executions": -1}},
            {"$limit": 10}
        ]
        
        popular_algorithms = await self.analytics_db.analytics_collection.aggregate(algorithm_pipeline).to_list(None)
        
        # Page views
        page_pipeline = [
            {"$match": {
                "event_type": "page_view",
                "timestamp": {"$gte": start_date.isoformat()}
            }},
            {"$group": {
                "_id": "$page_url",
                "views": {"$sum": 1}
            }},
            {"$sort": {"views": -1}}
        ]
        
        page_views = await self.analytics_db.analytics_collection.aggregate(page_pipeline).to_list(None)
        
        # User sessions
        total_sessions = await self.analytics_db.analytics_collection.distinct("user_session", {
            "timestamp": {"$gte": start_date.isoformat()}
        })
        
        return {
            "event_summary": event_counts,
            "popular_algorithms": popular_algorithms,
            "page_views": page_views,
            "total_unique_sessions": len(total_sessions),
            "period_days": days
        }
