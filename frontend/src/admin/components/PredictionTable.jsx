import React from 'react'

export default function PredictionTable({ predictions }) {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', border:'1px solid var(--border)', overflow:'hidden' }}>
      <div style={{ padding:'24px 28px', borderBottom:'1px solid var(--border)' }}>
        <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'4px' }}>Per-color forecast</h3>
        <p style={{ fontSize:'13px', color:'var(--text-secondary)' }}>Predicted units, model confidence, and a stocking recommendation.</p>
      </div>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ background:'var(--bg-primary)' }}>
            {['COLOR','PREDICTED DEMAND','CONFIDENCE','SUGGESTED STOCK','TREND'].map(h => (
              <th key={h} style={{ padding:'12px 20px', textAlign:'left', fontSize:'11px', letterSpacing:'1.5px', color:'var(--text-muted)', fontWeight:600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {predictions.map(p => (
            <tr key={p.id} style={{ borderTop:'1px solid var(--border)' }}>
              <td style={{ padding:'18px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'50%', background:p.hex, border:'1px solid rgba(0,0,0,0.06)', flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:'15px', fontWeight:500, color:'var(--text-primary)' }}>{p.name}</div>
                    <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>{p.hex.toUpperCase()}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding:'18px 20px', fontSize:'15px', fontWeight:600, color:'var(--text-primary)' }}>{p.predicted}</td>
              <td style={{ padding:'18px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'60px', height:'6px', borderRadius:'99px', background:'var(--border)', overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:'99px', background:'var(--terracotta)', width:`${p.confidence}%` }} />
                  </div>
                  <span style={{ fontSize:'14px', color:'var(--text-secondary)' }}>{p.confidence}%</span>
                </div>
              </td>
              <td style={{ padding:'18px 20px', fontSize:'15px', fontWeight:600, color:'var(--text-primary)' }}>{p.suggestedStock}</td>
              <td style={{ padding:'18px 20px' }}>
                {p.trendDir === 'flat' ? (
                  <span style={{ padding:'5px 14px', borderRadius:'50px', fontSize:'13px', fontWeight:600,
                    background:'var(--sage-bg)', color:'var(--sage)' }}>— flat</span>
                ) : (
                  <span style={{ padding:'5px 14px', borderRadius:'50px', fontSize:'13px', fontWeight:600,
                    background: p.trendDir === 'up' ? '#F0F7EE' : 'var(--terracotta-bg)',
                    color: p.trendDir === 'up' ? '#4A7C59' : 'var(--terracotta)',
                  }}>
                    {p.trendDir === 'up' ? '↗' : '↘'} {p.trend}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
