import React from 'react'

/**
 * AsyncErrorBoundary Component
 * Specialized error boundary for handling async errors and promise rejections
 * Works in conjunction with useAsyncError hook
 */
class AsyncErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('AsyncErrorBoundary caught an error:', error)
    console.error('Error Info:', errorInfo)
    this.setState({ error })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '16px',
            margin: '16px',
            border: '1px solid #ff7875',
            borderRadius: '4px',
            backgroundColor: '#fff1f0',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#ff4d4f', marginTop: 0 }}>
            Failed to load content
          </h3>
          <p style={{ color: '#666', marginBottom: '12px' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '6px 12px',
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default AsyncErrorBoundary
