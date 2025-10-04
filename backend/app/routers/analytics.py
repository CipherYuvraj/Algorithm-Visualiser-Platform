from fastapi import APIRouter, Depends, HTTPException, status
from app.models.analytics import AnalyticsEvent, UserFeedback, ConsentSettings
from app.services.analytics_service import AnalyticsService
from app.database import get_database
from typing import Dict, Any

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

async def get_analytics_service(db = Depends(get_database)):
    return AnalyticsService(db)

@router.post("/event", status_code=status.HTTP_201_CREATED)
async def log_analytics_event(
    event: AnalyticsEvent,
    analytics_service: AnalyticsService = Depends(get_analytics_service)
):
    """Log an analytics event"""
    success = await analytics_service.log_event(event)
    if success:
        return {"message": "Event logged successfully"}
    else:
        return {"message": "Event not logged - no consent or error"}

@router.post("/feedback", status_code=status.HTTP_201_CREATED)
async def submit_feedback(
    feedback: UserFeedback,
    analytics_service: AnalyticsService = Depends(get_analytics_service)
):
    """Submit user feedback"""
    success = await analytics_service.submit_feedback(feedback)
    if success:
        return {"message": "Feedback submitted successfully"}
    else:
        return {"message": "Feedback not submitted - no consent or error"}

@router.post("/consent", status_code=status.HTTP_200_OK)
async def update_consent(
    consent: ConsentSettings,
    analytics_service: AnalyticsService = Depends(get_analytics_service)
):
    """Update user consent settings"""
    success = await analytics_service.update_consent(consent)
    if success:
        return {"message": "Consent updated successfully"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update consent"
        )

@router.get("/dashboard", response_model=Dict[str, Any])
async def get_analytics_dashboard(
    days: int = 30,
    analytics_service: AnalyticsService = Depends(get_analytics_service)
):
    """Get analytics dashboard data"""
    try:
        summary = await analytics_service.get_analytics_summary(days)
        return summary
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch analytics data: {str(e)}"
        )

@router.delete("/data/{user_session}")
async def delete_user_data(
    user_session: str,
    analytics_service: AnalyticsService = Depends(get_analytics_service)
):
    """Delete all data for a user session (GDPR compliance)"""
    try:
        # Delete from all collections
        await analytics_service.analytics_db.analytics_collection.delete_many({
            "user_session": user_session
        })
        await analytics_service.analytics_db.feedback_collection.delete_many({
            "user_session": user_session
        })
        await analytics_service.analytics_db.consent_collection.delete_many({
            "user_session": user_session
        })
        
        return {"message": "User data deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete user data: {str(e)}"
        )
