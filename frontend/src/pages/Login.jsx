import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import logo from '../assets/logo.png'

const PALETTE = ['#C65A3A','#8AA89F','#D4B483','#9E9189','#2E2E2E','#C99A3B','#3D6B4F','#D4A090']

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // 🔥 EMAIL LOGIN
  const handleEmailLogin = async () => {
    setLoading(true)
    setErrorMsg('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      setErrorMsg(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  // 🔥 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (error) console.log(error.message)
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--ivory)' }}>
      
      {/* LEFT PANEL */}
      <div style={{
        width:'45%',
        background:'linear-gradient(145deg,#EDE3D0 0%,#F4ECDD 60%,#FAEEE5 100%)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        padding:'48px'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <img src={logo} alt="Pigment" style={{ width:'50px' }} />
          <div>
            <div style={{ fontSize:'22px', fontWeight:600 }}>Pigment</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px' }}>
              Demand Studio
            </div>
          </div>
        </div>

        <h1 style={{ fontSize:'42px', fontFamily:'Playfair Display' }}>
          Predict the next shade before the market does.
        </h1>

        <div style={{ display:'flex', gap:'10px' }}>
          {PALETTE.map(c => (
            <div key={c} style={{
              width:'50px',
              height:'50px',
              background:c,
              borderRadius:'10px'
            }} />
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'400px' }}>

          <h2 style={{ fontSize:'36px' }}>Sign in</h2>
          <p style={{ marginBottom:'20px' }}>
            Welcome back. Your forecasts are waiting.
          </p>

          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />

          {/* PASSWORD INPUT */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />

          {/* ERROR */}
          {errorMsg && (
            <p style={{ color:'red', fontSize:'13px' }}>
              {errorMsg}
            </p>
          )}

          {/* EMAIL LOGIN BUTTON */}
          <button
            onClick={handleEmailLogin}
            disabled={loading}
            style={btnPrimary}
          >
            {loading ? "Signing in..." : "Sign in"}
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
  marginBottom:'12px',
  borderRadius:'10px',
  border:'1px solid #ccc'
}

const btnPrimary = {
  width:'100%',
  padding:'14px',
  borderRadius:'50px',
  background:'var(--terracotta)',
  color:'#fff',
  border:'none',
  cursor:'pointer',
  marginTop:'10px'
}

const googleBtn = {
  width:'100%',
  padding:'14px',
  borderRadius:'50px',
  border:'1px solid #ddd',
  background:'#fff',
  cursor:'pointer',
  fontWeight:500
}