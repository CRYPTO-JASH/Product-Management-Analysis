import React from 'react'

/**
 * Error Boundary Component
 * Catches errors in child component tree, logs error info, and displays fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error Boundary caught an error:', error)
    console.error('Error Info:', errorInfo)

    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }))

    // Optional: Send error to external logging service
    this.logErrorToService(error, errorInfo)
  }

  logErrorToService = (error, errorInfo) => {
    // This could send to Sentry, LogRocket, Bugsnag, etc.
    // For now, we'll just log to console
    try {
      const errorData = {
        message: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }
      console.log('Error logged:', errorData)
      // Example: fetch('/api/logs/errors', { method: 'POST', body: JSON.stringify(errorData) })
    } catch (e) {
      console.error('Failed to log error:', e)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            border: '2px solid #f5222d',
            borderRadius: '4px',
            backgroundColor: '#fff2f0',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h2 style={{ color: '#f5222d', marginTop: 0 }}>
            ⚠️ Something went wrong
          </h2>
          <details
            style={{
              whiteSpace: 'pre-wrap',
              marginBottom: '15px',
              padding: '10px',
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              cursor: 'pointer',
            }}
          >
            <summary style={{ fontWeight: 'bold', cursor: 'pointer' }}>
              Error Details (Click to expand)
            </summary>
            <div style={{ marginTop: '10px', fontSize: '12px' }}>
              {this.state.error && (
                <>
                  <div>
                    <strong>Error Message:</strong>
                    <div style={{ color: '#ff4d4f' }}>
                      {this.state.error.toString()}
                    </div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>Stack Trace:</strong>
                    <div
                      style={{
                        color: '#666',
                        fontFamily: 'monospace',
                        maxHeight: '200px',
                        overflow: 'auto',
                      }}
                    >
                      {this.state.error.stack}
                    </div>
                  </div>
                </>
              )}
              {this.state.errorInfo && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Component Stack:</strong>
                  <div
                    style={{
                      color: '#666',
                      fontFamily: 'monospace',
                      maxHeight: '200px',
                      overflow: 'auto',
                    }}
                  >
                    {this.state.errorInfo.componentStack}
                  </div>
                </div>
              )}
            </div>
          </details>
          <p style={{ marginBottom: '15px', color: '#333' }}>
            The application encountered an unexpected error. Please try to
            recover by clicking the button below.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#d9d9d9',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Go Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
