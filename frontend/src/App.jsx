import React, { useEffect } from 'react'
import AppRoutes from './routes/index.jsx'
import { supabase } from './services/supabaseClient'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { loginWithSupabaseUser, logout } = useAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loginWithSupabaseUser(session.user)
      } else {
        logout()
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loginWithSupabaseUser(session.user)
      } else {
        logout()
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return <AppRoutes />
}