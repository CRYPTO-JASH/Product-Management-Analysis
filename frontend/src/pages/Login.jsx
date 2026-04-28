import React from 'react'
import { supabase } from '../services/supabaseClient'
import logo from '../assets/logo.png'

const PALETTE = ['#C65A3A','#8AA89F','#F4ECDD','#9E9189','#2E2E2E','#C99A3B','#3D6B4F','#D4A090']

export default function Login() {

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
      
      {/* LEFT */}
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

      {/* RIGHT */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:'400px' }}>

          <h2 style={{ fontSize:'36px' }}>Sign in</h2>
          <p>Welcome back. Your forecasts are waiting.</p>

          <button onClick={handleGoogleLogin} style={{
            width:'100%',
            padding:'14px',
            marginTop:'20px',
            borderRadius:'50px',
            border:'1px solid #ddd',
            background:'#fff',
            cursor:'pointer'
          }}>
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  )
}