import React from 'react';

class AnalyticsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Analytics error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Silently fail and render children without analytics
      return this.props.children;
    }

    return this.props.children;
  }
}

export default AnalyticsErrorBoundary;
