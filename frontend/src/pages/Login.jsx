import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../services/supabaseClient'

const PALETTE = ['#C65A3A','#8AA89F','#F4ECDD','#9E9189','#2E2E2E','#C99A3B','#3D6B4F','#D4A090']

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('manager@pigment.studio')
  const [password, setPassword] = useState('••••••••')

  function handleRetailer() {
    login('RETAILER')
    navigate('/dashboard')
  }

  function handleCustomer() {
    login('CUSTOMER')
    navigate('/customer/shades')
  }

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard', // change later for production
      },
    })

    if (error) console.log(error.message)
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--ivory)' }}>
      
      {/* LEFT PANEL (unchanged) */}
      <div style={{
        width:'45%', minHeight:'100vh',
        background:'linear-gradient(145deg,#EDE3D0 0%,#F4ECDD 60%,#FAEEE5 100%)',
        display:'flex', flexDirection:'column',
        justifyContent:'space-between', padding:'48px',
        position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', top:'-80px', right:'-80px',
          width:'320px', height:'320px',
          background:'radial-gradient(circle,rgba(198,90,58,0.12) 0%,transparent 70%)',
          borderRadius:'50%' }} />

        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{
            width:'48px', height:'48px', borderRadius:'50%',
            background:'var(--terracotta)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontWeight:700
          }}>P</div>
          <div>
            <div style={{ fontSize:'22px', fontWeight:600 }}>Pigment</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px' }}>Demand Studio</div>
          </div>
        </div>

        <div>
          <h1>Predict the next shade before the market does.</h1>
        </div>

        <div>
          <div style={{ display:'flex', gap:'10px' }}>
            {PALETTE.map(c => (
              <div key={c} style={{ width:'52px', height:'52px', background:c }} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'100%', maxWidth:'440px' }}>

          <h2>Sign in</h2>

          <input value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button onClick={handleRetailer}>
            Sign in as Retailer
          </button>

          <button onClick={handleCustomer}>
            Continue as Customer
          </button>

          {/* 🔥 NEW GOOGLE BUTTON */}
          <button 
            onClick={handleGoogleLogin}
            style={{
              marginTop:'20px',
              padding:'14px',
              width:'100%',
              borderRadius:'50px',
              border:'1px solid #ccc',
              background:'#fff',
              cursor:'pointer'
            }}
          >
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  )
}