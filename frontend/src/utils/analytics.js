import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { config } from './config';

class AnalyticsManager {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.consentGiven = this.getConsent();
    this.apiBaseUrl = config.apiBaseUrl;
    this.enabled = config.analyticsEnabled;
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('analytics_session_id');
    if (!sessionId) {
      // Create anonymous hash
      const randomString = uuidv4() + Date.now();
      sessionId = CryptoJS.SHA256(randomString).toString(CryptoJS.enc.Hex);
      localStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  getConsent() {
    const consent = localStorage.getItem('analytics_consent');
    return consent ? JSON.parse(consent) : { analytics: false, feedback: false };
  }

  setConsent(analyticsConsent, feedbackConsent) {
    const consent = { analytics: analyticsConsent, feedback: feedbackConsent };
    localStorage.setItem('analytics_consent', JSON.stringify(consent));
    this.consentGiven = consent;

    // Send consent to backend
    this.sendConsentToBackend(consent);
  }

  async sendConsentToBackend(consent) {
    try {
      await fetch(`${this.apiBaseUrl}/api/analytics/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_session: this.sessionId,
          analytics_consent: consent.analytics,
          feedback_consent: consent.feedback,
        }),
      });
    } catch (error) {
      console.error('Failed to send consent:', error);
    }
  }

  async logEvent(eventType, data = {}) {
    if (!this.enabled || !this.consentGiven.analytics) return;

    const event = {
      event_type: eventType,
      user_session: this.sessionId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    try {
      await fetch(`${this.apiBaseUrl}/api/analytics/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Analytics event failed:', error);
    }
  }

  async submitFeedback(rating, feedbackText, algorithm = null) {
    if (!this.consentGiven.feedback) return false;

    const feedback = {
      user_session: this.sessionId,
      rating: rating,
      feedback_text: feedbackText,
      algorithm: algorithm,
    };

    try {
      await fetch(`${this.apiBaseUrl}/api/analytics/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      return true;
    } catch (error) {
      console.error('Feedback submission failed:', error);
      return false;
    }
  }

  // Specific event methods
  logPageView(pageUrl) {
    this.logEvent('page_view', { page_url: pageUrl });
  }

  logAlgorithmExecution(algorithm, inputSize, executionTime) {
    this.logEvent('algorithm_execution', {
      algorithm: algorithm,
      input_size: inputSize,
      execution_time: executionTime,
    });
  }

  logSessionStart() {
    this.logEvent('session_start');
  }

  logSessionEnd() {
    this.logEvent('session_end');
  }

  logThemeChange(theme) {
    this.logEvent('theme_changed', { metadata: { theme: theme } });
  }

  logSpeedChange(speed) {
    this.logEvent('speed_changed', { metadata: { speed: speed } });
  }

  async deleteMyData() {
    try {
      await fetch(`${this.apiBaseUrl}/api/analytics/data/${this.sessionId}`, {
        method: 'DELETE',
      });
      
      // Clear local storage
      localStorage.removeItem('analytics_session_id');
      localStorage.removeItem('analytics_consent');
      
      return true;
    } catch (error) {
      console.error('Failed to delete data:', error);
      return false;
    }
  }
}

export const analytics = new AnalyticsManager();
