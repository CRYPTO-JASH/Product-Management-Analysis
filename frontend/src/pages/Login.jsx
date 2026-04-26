import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

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

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--ivory)' }}>
      {/* Left panel */}
      <div style={{
        width:'45%', minHeight:'100vh', background:'linear-gradient(145deg,#EDE3D0 0%,#F4ECDD 60%,#FAEEE5 100%)',
        display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'48px',
        position:'relative', overflow:'hidden'
      }}>
        {/* Decorative blob */}
        <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'320px', height:'320px',
          background:'radial-gradient(circle,rgba(198,90,58,0.12) 0%,transparent 70%)', borderRadius:'50%' }} />

        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'var(--terracotta)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
            fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'22px' }}>P</div>
          <div>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', fontWeight:600, color:'var(--charcoal)' }}>Pigment</div>
            <div style={{ fontSize:'11px', letterSpacing:'2px', color:'var(--warm-gray)', textTransform:'uppercase', fontWeight:500 }}>Demand Studio</div>
          </div>
        </div>

        <div>
          <p style={{ fontSize:'11px', letterSpacing:'3px', color:'var(--warm-gray)', textTransform:'uppercase', marginBottom:'20px', fontWeight:500 }}>
            A Studio for Color Foresight
          </p>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(32px,4vw,52px)', lineHeight:1.1,
            fontWeight:700, color:'var(--charcoal)', marginBottom:'24px' }}>
            Predict the next shade<br />before the market does.
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'16px', lineHeight:1.7, maxWidth:'440px' }}>
            Pigment turns a year of paint sales into a clear, calm view of what your customers will reach for next season — so the can is on the shelf the morning they walk in.
          </p>
        </div>

        <div>
          <div style={{ display:'flex', gap:'10px', marginBottom:'12px' }}>
            {PALETTE.map(c => (
              <div key={c} style={{ width:'52px', height:'52px', borderRadius:'14px', background:c,
                boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }} />
            ))}
          </div>
          <p style={{ fontSize:'12px', color:'var(--text-muted)', fontStyle:'italic' }}>Featured palette · Spring/Summer 2026</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'48px' }}>
        <div style={{ width:'100%', maxWidth:'440px' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'40px', fontWeight:700, color:'var(--charcoal)', marginBottom:'8px' }}>
            Sign in
          </h2>
          <p style={{ color:'var(--text-secondary)', fontSize:'16px', marginBottom:'36px' }}>
            Welcome back. Your forecasts are waiting.
          </p>

          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', fontSize:'14px', fontWeight:500, color:'var(--text-primary)', marginBottom:'8px' }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom:'28px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
              <label style={{ fontSize:'14px', fontWeight:500, color:'var(--text-primary)' }}>Password</label>
              <span style={{ fontSize:'14px', color:'var(--terracotta)', cursor:'pointer' }}>Forgot?</span>
            </div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
          </div>

          <button onClick={handleRetailer} style={{ ...btnPrimary, width:'100%', marginBottom:'12px' }}>
            Sign in as Retailer
          </button>
          <button onClick={handleCustomer} style={{ ...btnSecondary, width:'100%', marginBottom:'20px' }}>
            Continue as Customer
          </button>

          <p style={{ fontSize:'13px', color:'var(--text-muted)', textAlign:'center', marginBottom:'20px', lineHeight:1.5 }}>
            Tip: click "Retailer" for the dashboard portal, "Customer" for the color explorer.
          </p>

          <p style={{ textAlign:'center', fontSize:'14px', color:'var(--text-secondary)' }}>
            New to Pigment?{' '}
            <span style={{ color:'var(--terracotta)', fontWeight:500, cursor:'pointer' }}>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width:'100%', padding:'14px 16px', borderRadius:'12px',
  border:'1.5px solid var(--border)', background:'#fff',
  fontSize:'15px', color:'var(--text-primary)', outline:'none',
  transition:'border-color 0.2s',
}

const btnPrimary = {
  padding:'16px 24px', borderRadius:'50px', border:'none',
  background:'var(--terracotta)', color:'#fff', fontSize:'16px',
  fontWeight:600, cursor:'pointer', letterSpacing:'0.3px',
  transition:'background 0.2s, transform 0.1s',
}

const btnSecondary = {
  padding:'16px 24px', borderRadius:'50px',
  border:'1.5px solid var(--border)', background:'transparent',
  color:'var(--text-primary)', fontSize:'16px',
  fontWeight:500, cursor:'pointer',
}
