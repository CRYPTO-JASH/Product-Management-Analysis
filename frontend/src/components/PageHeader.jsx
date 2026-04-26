import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function PageHeader({ title, subtitle }) {
  const { toggleTheme, theme } = useAuth()

  return (
    <div style={{
      position:'sticky', top:0, zIndex:50,
      background:'var(--bg-primary)', borderBottom:'1px solid var(--border)',
      padding:'20px 32px', display:'flex', alignItems:'center', justifyContent:'space-between',
      backdropFilter:'blur(8px)',
    }}>
      <div>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'30px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.2 }}>{title}</h1>
        {subtitle && <p style={{ fontSize:'13px', color:'var(--text-secondary)', marginTop:'3px', maxWidth:'400px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{subtitle}</p>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'50px', padding:'10px 18px' }}>
          <span style={{ fontSize:'14px', color:'var(--text-muted)' }}>🔍</span>
          <input placeholder="Search colors, SKUs..." style={{
            background:'none', border:'none', outline:'none', fontSize:'14px',
            color:'var(--text-primary)', width:'180px',
          }} />
        </div>
        <button onClick={toggleTheme} style={{
          width:'40px', height:'40px', borderRadius:'50%', border:'1px solid var(--border)',
          background:'var(--bg-card)', cursor:'pointer', fontSize:'16px', display:'flex',
          alignItems:'center', justifyContent:'center',
        }}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div style={{
          width:'40px', height:'40px', borderRadius:'50%', border:'1px solid var(--border)',
          background:'var(--bg-card)', display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', fontSize:'16px', position:'relative',
        }}>
          🔔
          <span style={{ position:'absolute', top:'6px', right:'6px', width:'8px', height:'8px', borderRadius:'50%', background:'var(--terracotta)', border:'2px solid var(--bg-card)' }} />
        </div>
      </div>
    </div>
  )
}
