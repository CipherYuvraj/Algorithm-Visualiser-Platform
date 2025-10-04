import React, { useState } from 'react';
import { X, Shield, BarChart3, MessageSquare } from 'lucide-react';
import { useAnalytics } from '../contexts/AnalyticsContext';

const ConsentBanner = ({ onDismiss }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [feedbackConsent, setFeedbackConsent] = useState(true);
  const { giveConsent } = useAnalytics();

  const handleAccept = () => {
    giveConsent(analyticsConsent, feedbackConsent);
    if (onDismiss) onDismiss();
  };

  const handleDecline = () => {
    giveConsent(false, false);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Privacy & Analytics
              </h3>
            </div>
            
            {!showDetails ? (
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                We use privacy-respecting analytics to improve the Algorithm Visualizer experience. 
                No personal data is collected - only anonymous usage statistics.
              </p>
            ) : (
              <div className="space-y-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    What we collect:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Algorithm usage statistics (which algorithms you run)</li>
                    <li>• Page views and navigation patterns</li>
                    <li>• Performance metrics (execution times)</li>
                    <li>• Theme preferences and settings</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    What we DON'T collect:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Personal information (name, email, etc.)</li>
                    <li>• IP addresses or location data</li>
                    <li>• Browser fingerprints</li>
                    <li>• Cross-site tracking</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Usage Analytics</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Help us understand which algorithms are most popular
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsConsent}
                        onChange={(e) => setAnalyticsConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">Feedback Collection</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Allow us to collect optional feedback and ratings
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feedbackConsent}
                        onChange={(e) => setFeedbackConsent(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
              
              <button
                onClick={handleAccept}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                {analyticsConsent || feedbackConsent ? 'Accept Selected' : 'Accept Essential Only'}
              </button>
              
              <button
                onClick={handleDecline}
                className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Decline All
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDecline}
            className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
