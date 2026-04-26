import React from 'react'

export default function KPICard({ label, value, sub, trend, trendDir, icon, iconBg, accent }) {
  const trendColor = trendDir === 'up' ? '#3D6B4F' : trendDir === 'down' ? '#C65A3A' : 'var(--text-muted)'
  const trendArrow = trendDir === 'up' ? '↗' : trendDir === 'down' ? '↘' : ''

  return (
    <div style={{
      background:'var(--bg-card)', borderRadius:'20px', padding:'28px',
      border:'1px solid var(--border)', boxShadow:'0 1px 4px var(--shadow)',
      display:'flex', flexDirection:'column', gap:'8px', position:'relative', overflow:'hidden',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <p style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:600, color:'var(--text-muted)' }}>
          {label}
        </p>
        {icon && (
          <div style={{ width:'40px', height:'40px', borderRadius:'50%', background: iconBg || 'var(--terracotta-bg)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        {accent && <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:accent, flexShrink:0 }} />}
        <p style={{ fontFamily:'Playfair Display,serif', fontSize: accent ? '30px' : '42px', fontWeight:700, color:'var(--text-primary)', lineHeight:1.1 }}>
          {value}
        </p>
      </div>
      {sub && <p style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{sub}</p>}
      {trend && (
        <p style={{ fontSize:'13px', color:trendColor, fontWeight:500, display:'flex', alignItems:'center', gap:'4px' }}>
          <span>{trendArrow}</span> {trend}
        </p>
      )}
    </div>
  )
}
