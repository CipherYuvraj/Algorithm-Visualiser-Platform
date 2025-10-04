import React from 'react';
import { config } from '../utils/config';

const EnvCheck = () => {
  // Only show in development
  if (!config.isDevelopment) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg shadow-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-1">Development Environment</div>
      <div className="space-y-1">
        <div><span className="font-medium">API:</span> {config.apiBaseUrl}</div>
        <div><span className="font-medium">Analytics:</span> {config.analyticsEnabled ? 'ENABLED' : 'DISABLED'}</div>
        <div><span className="font-medium">Mode:</span> {config.isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}</div>
      </div>
    </div>
  );
};

export default EnvCheck;
