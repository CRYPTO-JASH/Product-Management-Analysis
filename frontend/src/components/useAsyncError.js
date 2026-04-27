import { useState, useCallback } from 'react'

/**
 * useAsyncError Hook
 * Throws errors so they can be caught by Error Boundary
 * Useful for async operations in functional components
 */
export const useAsyncError = () => {
  const [, setError] = useState()

  return useCallback(
    error => {
      setError(() => {
        throw error
      })
    },
    [setError]
  )
}

/**
 * useErrorHandler Hook
 * Provides a way to catch and handle errors in async operations
 */
export const useErrorHandler = () => {
  const throwError = useAsyncError()

  return {
    handleError: error => {
      console.error('Error handled:', error)
      throwError(error)
    },
    handlePromiseError: promise => {
      return promise
        .catch(error => {
          console.error('Promise error:', error)
          throwError(error)
        })
    },
  }
}
