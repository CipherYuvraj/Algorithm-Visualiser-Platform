import React, { createContext, useContext, useEffect, useState } from 'react';
import { analytics } from '../utils/analytics';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [consentGiven, setConsentGiven] = useState(analytics.getConsent());
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  useEffect(() => {
    // Check if consent was ever given
    const consentStatus = localStorage.getItem('analytics_consent');
    if (!consentStatus) {
      setShowConsentBanner(true);
    }

    // Log session start
    analytics.logSessionStart();

    // Log session end on page unload
    const handleBeforeUnload = () => {
      analytics.logSessionEnd();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      analytics.logSessionEnd();
    };
  }, []);

  const giveConsent = (analyticsConsent, feedbackConsent) => {
    analytics.setConsent(analyticsConsent, feedbackConsent);
    setConsentGiven({ analytics: analyticsConsent, feedback: feedbackConsent });
    setShowConsentBanner(false);
  };

  const withdrawConsent = () => {
    analytics.setConsent(false, false);
    setConsentGiven({ analytics: false, feedback: false });
  };

  const deleteMyData = async () => {
    const success = await analytics.deleteMyData();
    if (success) {
      setConsentGiven({ analytics: false, feedback: false });
      window.location.reload(); // Refresh to get new session
    }
    return success;
  };

  const value = {
    consentGiven,
    showConsentBanner,
    giveConsent,
    withdrawConsent,
    deleteMyData,
    analytics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
