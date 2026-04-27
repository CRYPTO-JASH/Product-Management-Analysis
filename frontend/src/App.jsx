import React, { useEffect } from 'react'
import AppRoutes from './routes/index.jsx'
import { initializeGlobalErrorHandlers } from './services/errorHandling.js'

export default function App() {
  useEffect(() => {
    // Initialize global error handlers on app mount
    initializeGlobalErrorHandlers()
  }, [])

  return <AppRoutes />
}
