import React from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURED = ['#C65A3A','#8AA89F','#F4ECDD','#C99A3B','#3D6B4F','#D4A090','#7B9EA8','#2E2E2E']

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div style={{
      padding:'80px 40px 60px',
      background:'linear-gradient(160deg, var(--bg-primary) 0%, var(--ivory-dark) 100%)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-100px', right:'-60px', width:'400px', height:'400px',
        background:'radial-gradient(circle, rgba(198,90,58,0.08) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'20%', width:'300px', height:'300px',
        background:'radial-gradient(circle, rgba(138,168,159,0.1) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

      <div style={{ maxWidth:'800px', margin:'0 auto', textAlign:'center', position:'relative' }}>
        <p style={{ fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--terracotta)', fontWeight:600, marginBottom:'16px' }}>
          Spring / Summer 2026 Collection
        </p>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(40px,6vw,72px)', fontWeight:700,
          color:'var(--text-primary)', lineHeight:1.05, marginBottom:'20px' }}>
          Find the shade<br />that feels like home.
        </h1>
        <p style={{ fontSize:'17px', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:'36px', maxWidth:'520px', margin:'0 auto 36px' }}>
          Explore our curated collection of paint shades, each crafted for a different mood, room, and season.
        </p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', marginBottom:'48px' }}>
          <button onClick={() => navigate('/customer/shades')} style={{
            padding:'14px 32px', borderRadius:'50px', border:'none',
            background:'var(--terracotta)', color:'#fff', fontSize:'15px', fontWeight:600, cursor:'pointer',
          }}>Explore Shades</button>
          <button onClick={() => navigate('/customer/trending')} style={{
            padding:'14px 32px', borderRadius:'50px',
            border:'1.5px solid var(--border)', background:'transparent',
            color:'var(--text-primary)', fontSize:'15px', fontWeight:500, cursor:'pointer',
          }}>See What's Trending</button>
        </div>

        {/* Palette strip */}
        <div style={{ display:'flex', justifyContent:'center', gap:'10px' }}>
          {FEATURED.map(c => (
            <div key={c} style={{
              width:'48px', height:'48px', borderRadius:'12px', background:c,
              boxShadow:'0 2px 8px rgba(0,0,0,0.12)', transition:'transform 0.2s', cursor:'pointer',
              border: c === '#F4ECDD' ? '1px solid rgba(0,0,0,0.08)' : 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
