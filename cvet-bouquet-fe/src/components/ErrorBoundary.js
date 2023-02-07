import React from 'react';
import Custom404 from '../../pages/404';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    fetch('api/sendError', {
      method: 'POST',
      body: JSON.stringify({ error, errorInfo }),
      headers: {
        Accept: 'application/json',
      },
    }).catch((error) => {
      console.log('error', error);
    });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Custom404></Custom404>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
