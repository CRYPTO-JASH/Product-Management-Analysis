import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getShades } from '../../services/api.js'
import ShadeCard from '../components/ShadeCard.jsx'

export default function ShadeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [shade, setShade] = useState(null)
  const [allShades, setAllShades] = useState([])

  useEffect(() => {
    getShades().then(data => {
      setAllShades(data)
      setShade(data.find(s => String(s.id) === String(id)) || null)
    })
  }, [id])

  if (!shade) return (
    <div style={{ padding:'80px', textAlign:'center', color:'var(--text-muted)' }}>
      <p style={{ fontSize:'40px', marginBottom:'12px' }}>🎨</p>
      <p style={{ fontSize:'18px' }}>Shade not found.</p>
    </div>
  )

  const similar = allShades.filter(s => s.family === shade.family && s.id !== shade.id).slice(0,4)
  const isLight = ['#F4ECDD','#E7DDCF','#C0D4C8','#D4A090'].includes(shade.hex)

  return (
    <div>
      {/* Back */}
      <div style={{ padding:'24px 40px 0' }}>
        <button onClick={() => navigate('/customer/shades')} style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'none', border:'none', color:'var(--text-secondary)',
          fontSize:'14px', cursor:'pointer', fontWeight:500,
        }}>← Back to all shades</button>
      </div>

      {/* Hero color */}
      <div style={{ padding:'32px 40px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'40px', alignItems:'start' }}>
          <div>
            <div style={{
              height:'380px', borderRadius:'28px', background: shade.hex,
              border: isLight ? '1px solid rgba(0,0,0,0.08)' : 'none',
              boxShadow:'0 8px 32px rgba(0,0,0,0.12)',
              display:'flex', alignItems:'flex-end', padding:'20px',
            }}>
              <span style={{
                padding:'6px 14px', borderRadius:'50px', fontSize:'13px', fontWeight:600,
                background:'rgba(255,255,255,0.9)', color:'#333',
              }}>{shade.family}</span>
            </div>
          </div>

          <div style={{ paddingTop:'16px' }}>
            <p style={{ fontSize:'12px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--terracotta)', fontWeight:600, marginBottom:'10px' }}>
              {shade.family} Collection
            </p>
            <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'48px', fontWeight:700, marginBottom:'8px', color:'var(--text-primary)' }}>
              {shade.name}
            </h1>
            <p style={{ fontFamily:'monospace', fontSize:'16px', color:'var(--text-muted)', marginBottom:'16px' }}>
              {shade.hex.toUpperCase()}
            </p>
            <p style={{ fontSize:'18px', color:'var(--text-secondary)', fontStyle:'italic', marginBottom:'28px', lineHeight:1.6 }}>
              {shade.mood}
            </p>

            {/* Color swatch row */}
            <div style={{ display:'flex', gap:'8px', marginBottom:'32px' }}>
              <div style={{ width:'56px', height:'56px', borderRadius:'14px', background:shade.hex, border:'3px solid var(--terracotta)' }} />
              {[0.85, 0.7, 0.5, 0.3].map((o,i) => (
                <div key={i} style={{ width:'56px', height:'56px', borderRadius:'14px',
                  background:`${shade.hex}${Math.round(o*255).toString(16).padStart(2,'0')}`,
                  border:'1px solid rgba(0,0,0,0.06)',
                }} />
              ))}
            </div>

            {/* Rooms */}
            <div style={{ marginBottom:'32px' }}>
              <p style={{ fontSize:'13px', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px' }}>
                Works best in
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {shade.rooms.map(r => (
                  <span key={r} style={{
                    padding:'7px 16px', borderRadius:'50px', fontSize:'13px', fontWeight:500,
                    background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-secondary)',
                  }}>{r}</span>
                ))}
              </div>
            </div>

            <button style={{
              padding:'14px 32px', borderRadius:'50px', border:'none',
              background:'var(--terracotta)', color:'#fff',
              fontSize:'15px', fontWeight:600, cursor:'pointer',
            }}>
              Add to Favourites
            </button>
          </div>
        </div>
      </div>

      {/* Similar shades */}
      {similar.length > 0 && (
        <div style={{ padding:'32px 40px 48px', borderTop:'1px solid var(--border)' }}>
          <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'24px', fontWeight:600, marginBottom:'20px' }}>
            Similar shades
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px' }}>
            {similar.map(s => <ShadeCard key={s.id} shade={s} />)}
          </div>
        </div>
      )}
    </div>
  )
}
