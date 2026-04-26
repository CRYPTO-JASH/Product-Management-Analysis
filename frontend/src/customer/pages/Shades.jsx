import React, { useEffect, useState } from 'react'
import ShadeCard from '../components/ShadeCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { getShades } from '../../services/api.js'

const FAMILIES = ['All', 'Warm', 'Cool', 'Neutral', 'Dark']

export default function Shades() {
  const [shades, setShades] = useState([])
  const [search, setSearch] = useState('')
  const [family, setFamily] = useState('All')

  useEffect(() => { getShades().then(setShades) }, [])

  const filtered = shades.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.mood.toLowerCase().includes(search.toLowerCase())
    const matchFamily = family === 'All' || s.family === family
    return matchSearch && matchFamily
  })

  return (
    <div style={{ padding:'40px' }}>
      {/* Header */}
      <div style={{ marginBottom:'32px' }}>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', fontWeight:700, marginBottom:'8px' }}>All Shades</h1>
        <p style={{ color:'var(--text-secondary)', fontSize:'15px' }}>Browse the complete Pigment colour collection.</p>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'16px', alignItems:'center', marginBottom:'32px', flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:'260px' }}>
          <SearchBar onSearch={setSearch} />
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          {FAMILIES.map(f => (
            <button key={f} onClick={() => setFamily(f)} style={{
              padding:'10px 20px', borderRadius:'50px', border:'1.5px solid',
              borderColor: family === f ? 'var(--terracotta)' : 'var(--border)',
              background: family === f ? 'var(--terracotta)' : 'var(--bg-card)',
              color: family === f ? '#fff' : 'var(--text-secondary)',
              fontSize:'13px', fontWeight:500, cursor:'pointer', transition:'all 0.15s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p style={{ fontSize:'13px', color:'var(--text-muted)', marginBottom:'20px' }}>
        Showing {filtered.length} shade{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'80px', color:'var(--text-muted)' }}>
          <p style={{ fontSize:'40px', marginBottom:'12px' }}>🎨</p>
          <p style={{ fontSize:'18px', fontWeight:500 }}>No shades match your search.</p>
          <p style={{ fontSize:'14px', marginTop:'6px' }}>Try a different name or mood.</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'20px' }}>
          {filtered.map(s => <ShadeCard key={s.id} shade={s} />)}
        </div>
      )}
    </div>
  )
}
