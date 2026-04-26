import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ShadeCard({ shade }) {
  const navigate = useNavigate()
  const isLight = ['#F4ECDD','#E7DDCF','#C0D4C8','#D4A090'].includes(shade.hex)

  return (
    <div
      onClick={() => navigate(`/customer/shades/${shade.id}`)}
      style={{
        borderRadius:'20px', overflow:'hidden', cursor:'pointer',
        background:'var(--bg-card)', border:'1px solid var(--border)',
        boxShadow:'0 2px 8px var(--shadow)',
        transition:'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)' }}
    >
      {/* Color swatch */}
      <div style={{
        height:'160px', background: shade.hex,
        border: isLight ? '1px solid rgba(0,0,0,0.06)' : 'none',
        display:'flex', alignItems:'flex-end', padding:'14px',
        borderBottom:'1px solid var(--border)',
      }}>
        <span style={{
          padding:'4px 10px', borderRadius:'50px', fontSize:'11px', fontWeight:600,
          background:'rgba(255,255,255,0.85)', color:'#333', backdropFilter:'blur(4px)',
        }}>
          {shade.family}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding:'16px 18px' }}>
        <p style={{ fontSize:'16px', fontWeight:600, color:'var(--text-primary)', marginBottom:'3px' }}>{shade.name}</p>
        <p style={{ fontSize:'12px', color:'var(--text-muted)', fontFamily:'monospace', marginBottom:'8px' }}>{shade.hex.toUpperCase()}</p>
        <p style={{ fontSize:'13px', color:'var(--text-secondary)', fontStyle:'italic' }}>{shade.mood}</p>
      </div>
    </div>
  )
}
