import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../contexts/AnalyticsContext';

export const usePageTracking = () => {
  const location = useLocation();
  const { analytics } = useAnalytics();

  useEffect(() => {
    // Log page view when the pathname changes
    if (location.pathname) {
      analytics.logPageView(location.pathname);
    }
  }, [location.pathname, analytics]);
};
