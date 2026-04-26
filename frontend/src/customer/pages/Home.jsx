import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import ShadeCard from '../components/ShadeCard.jsx'
import { getShades } from '../../services/api.js'

const FAMILIES = ['Warm', 'Cool', 'Neutral', 'Dark']

export default function Home() {
  const [shades, setShades] = useState([])
  const navigate = useNavigate()

  useEffect(() => { getShades().then(setShades) }, [])

  return (
    <div>
      <Hero />

      {/* Categories */}
      <div style={{ padding:'48px 40px' }}>
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', fontWeight:600, marginBottom:'8px' }}>Shop by mood</h2>
        <p style={{ color:'var(--text-secondary)', fontSize:'14px', marginBottom:'28px' }}>Each family carries a distinct emotional character.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'56px' }}>
          {FAMILIES.map(f => {
            const familyShades = shades.filter(s => s.family === f)
            const sample = familyShades[0]
            return (
              <div key={f} onClick={() => navigate('/customer/shades')} style={{
                borderRadius:'20px', overflow:'hidden', cursor:'pointer',
                border:'1px solid var(--border)', background:'var(--bg-card)',
                transition:'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ height:'90px', background: sample?.hex || '#ccc', display:'flex', flexWrap:'wrap' }}>
                  {familyShades.slice(0,4).map(s => (
                    <div key={s.id} style={{ width:'50%', height:'45px', background:s.hex }} />
                  ))}
                </div>
                <div style={{ padding:'14px 16px' }}>
                  <p style={{ fontSize:'15px', fontWeight:600, color:'var(--text-primary)' }}>{f} tones</p>
                  <p style={{ fontSize:'12px', color:'var(--text-muted)' }}>{familyShades.length} shades</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured shades */}
        <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'28px', fontWeight:600, marginBottom:'8px' }}>Featured shades</h2>
        <p style={{ color:'var(--text-secondary)', fontSize:'14px', marginBottom:'28px' }}>Handpicked for this season.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
          {shades.slice(0,4).map(s => <ShadeCard key={s.id} shade={s} />)}
        </div>
      </div>
    </div>
  )
}
