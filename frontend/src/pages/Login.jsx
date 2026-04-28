import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from '../services/supabaseClient'
import logo from '../assets/logo.png'

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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/dashboard',
      },
    })
    if (error) console.log(error.message)
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--ivory)' }}>
      
      {/* LEFT PANEL */}
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

        {/* 🔥 LOGO (FIXED) */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <img
            src={logo}
            alt="Pigment"
            style={{
              width:'50px',
              height:'50px',
              objectFit:'contain'
            }}
          />
          <div>
            <div style={{ fontSize:'22px', fontWeight:600 }}>Pigment</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px' }}>
              Demand Studio
            </div>
          </div>
        </div>

        <div>
          <h1 style={{
            fontFamily:'Playfair Display,serif',
            fontSize:'42px',
            lineHeight:1.2
          }}>
            Predict the next shade before the market does.
          </h1>
        </div>

        <div>
          <div style={{ display:'flex', gap:'10px' }}>
            {PALETTE.map(c => (
              <div key={c} style={{
                width:'52px',
                height:'52px',
                background:c,
                borderRadius:'10px'
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'100%', maxWidth:'440px' }}>

          <h2 style={{
            fontFamily:'Playfair Display,serif',
            fontSize:'36px',
            marginBottom:'10px'
          }}>
            Sign in
          </h2>

          <p style={{ color:'var(--text-secondary)', marginBottom:'30px' }}>
            Welcome back. Your forecasts are waiting.
          </p>

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Password"
          />

          <button onClick={handleRetailer} style={btnPrimary}>
            Sign in as Retailer
          </button>

          <button onClick={handleCustomer} style={btnSecondary}>
            Continue as Customer
          </button>

          {/* DIVIDER */}
          <div style={{
            textAlign:'center',
            margin:'20px 0',
            color:'#999',
            fontSize:'14px'
          }}>
            — or —
          </div>

          {/* GOOGLE LOGIN */}
          <button onClick={handleGoogleLogin} style={googleBtn}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              style={{ width:'20px', marginRight:'10px' }}
            />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width:'100%',
  padding:'14px',
  marginBottom:'15px',
  borderRadius:'10px',
  border:'1px solid #ccc'
}

const btnPrimary = {
  width:'100%',
  padding:'14px',
  marginBottom:'10px',
  borderRadius:'50px',
  background:'var(--terracotta)',
  color:'#fff',
  border:'none',
  cursor:'pointer'
}

const btnSecondary = {
  width:'100%',
  padding:'14px',
  borderRadius:'50px',
  border:'1px solid #ccc',
  background:'transparent',
  cursor:'pointer'
}

const googleBtn = {
  width:'100%',
  padding:'14px',
  borderRadius:'50px',
  border:'1px solid #ddd',
  background:'#fff',
  cursor:'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontWeight:500
}