/**
 * Global Error Handlers
 * Setup global error handlers for unhandled promise rejections and errors
 */

/**
 * Initialize global error handlers
 * Call this early in your app initialization
 */
export const initializeGlobalErrorHandlers = () => {
  // Handle uncaught errors
  window.addEventListener('error', event => {
    console.error('Global error caught:', event.error)
    // You can send this to a logging service
    logErrorToService({
      type: 'uncaught_error',
      message: event.message,
      stack: event.error?.stack,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      timestamp: new Date().toISOString(),
    })
  })

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason)
    // You can send this to a logging service
    logErrorToService({
      type: 'unhandled_rejection',
      reason: event.reason?.message || String(event.reason),
      stack: event.reason?.stack,
      timestamp: new Date().toISOString(),
    })
    // Prevent the browser from logging the error to console
    event.preventDefault()
  })
}

/**
 * Log errors to external service
 * Replace with your actual logging service (Sentry, LogRocket, etc.)
 */
const logErrorToService = errorData => {
  try {
    // Example: Send to Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureException(new Error(errorData.message))
    // }

    // For now, just log to console
    console.log('Error logged to service:', errorData)

    // Example: Send to custom backend
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(err => console.error('Failed to log error:', err))
  } catch (error) {
    console.error('Failed to log error to service:', error)
  }
}

/**
 * Safely execute async operations with error handling
 */
export const safeAsync = async (asyncFn, fallback = null) => {
  try {
    return await asyncFn()
  } catch (error) {
    console.error('Async operation failed:', error)
    logErrorToService({
      type: 'async_error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    })
    return fallback
  }
}
