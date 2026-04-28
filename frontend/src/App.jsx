import React, { useEffect, useState } from 'react'
import AppRoutes from './routes/index.jsx'
import { initializeGlobalErrorHandlers } from './services/errorHandling.js'
import { supabase } from './services/supabaseClient'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // existing
    initializeGlobalErrorHandlers()

    // 🔥 get current user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // 🔥 listen to login/logout
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return <AppRoutes />
}