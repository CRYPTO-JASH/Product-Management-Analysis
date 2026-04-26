import React, { useEffect, useState } from 'react'
import ShadeCard from '../components/ShadeCard.jsx'
import { getShades } from '../../services/api.js'

const TRENDS = [
  { rank:1, label:'#1 This Month', badge:'🔥', shade:'Terracotta Red', growth:'+13.5%', desc:'Earthy warmth continues to dominate interior design.' },
  { rank:2, label:'#2 Rising Fast', badge:'↗', shade:'Sage Mist', growth:'+16.2%', desc:'The biggest climber — coastal calm meets urban living.' },
  { rank:3, label:'#3 Steady', badge:'✦', shade:'Ivory White', growth:'+7.4%', desc:'The perennial favourite. Never goes out of style.' },
]

export default function Trending() {
  const [shades, setShades] = useState([])

  useEffect(() => { getShades().then(setShades) }, [])

  const trendingShades = shades.filter(s => ['Terracotta Red','Sage Mist','Ivory White','Mustard Field','Charcoal Smoke'].includes(s.name))
  const risingShades = shades.filter(s => ['Sand Dune','Ocean Grey','Forest Shade','Blush Clay'].includes(s.name))

  return (
    <div style={{ padding:'40px' }}>
      {/* Header */}
      <div style={{ marginBottom:'40px' }}>
        <p style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'var(--terracotta)', fontWeight:600, marginBottom:'8px' }}>Live Trends</p>
        <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'36px', fontWeight:700, marginBottom:'8px' }}>What's Trending Now</h1>
        <p style={{ color:'var(--text-secondary)', fontSize:'15px' }}>Ranked by demand velocity across all retail partners. Updated weekly.</p>
      </div>

      {/* Top 3 feature */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', marginBottom:'48px' }}>
        {TRENDS.map(t => {
          const shade = shades.find(s => s.name === t.shade)
          if (!shade) return null
          return (
            <div key={t.rank} style={{
              borderRadius:'24px', overflow:'hidden',
              background:'var(--bg-card)', border:'1px solid var(--border)',
              boxShadow:'0 2px 12px var(--shadow)',
            }}>
              <div style={{ height:'200px', background:shade.hex, position:'relative', display:'flex', alignItems:'flex-end', padding:'16px' }}>
                <span style={{ fontSize:'28px', position:'absolute', top:'16px', left:'16px' }}>{t.badge}</span>
                <span style={{
                  padding:'4px 12px', borderRadius:'50px', fontSize:'12px', fontWeight:700,
                  background:'rgba(255,255,255,0.9)', color:'#333',
                }}>{t.growth}</span>
              </div>
              <div style={{ padding:'20px' }}>
                <p style={{ fontSize:'11px', letterSpacing:'1.5px', color:'var(--text-muted)', textTransform:'uppercase', marginBottom:'6px' }}>{t.label}</p>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'8px', color:'var(--text-primary)' }}>{t.shade}</h3>
                <p style={{ fontSize:'13px', color:'var(--text-secondary)', lineHeight:1.6 }}>{t.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Trending shades grid */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'26px', fontWeight:600, marginBottom:'8px' }}>Top performers</h2>
      <p style={{ color:'var(--text-secondary)', fontSize:'14px', marginBottom:'24px' }}>Highest demand this season.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'20px', marginBottom:'48px' }}>
        {trendingShades.map(s => <ShadeCard key={s.id} shade={s} />)}
      </div>

      {/* Rising shades */}
      <h2 style={{ fontFamily:'Playfair Display,serif', fontSize:'26px', fontWeight:600, marginBottom:'8px' }}>Rising this season</h2>
      <p style={{ color:'var(--text-secondary)', fontSize:'14px', marginBottom:'24px' }}>Gaining momentum — get ahead of the trend.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'20px' }}>
        {risingShades.map(s => <ShadeCard key={s.id} shade={s} />)}
      </div>
    </div>
  )
}
