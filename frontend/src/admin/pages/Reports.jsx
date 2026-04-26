import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'

const historyData = [
  { id:1, name:'Q1 2026 Demand Forecast', type:'PDF', date:'2026-04-01', size:'2.4 MB' },
  { id:2, name:'March Inventory Risk', type:'Excel', date:'2026-04-02', size:'812 KB' },
  { id:3, name:'Top Colors — Interior 2026', type:'PDF', date:'2026-03-21', size:'1.8 MB' },
  { id:4, name:'Q4 2025 Year-End Summary', type:'PDF', date:'2026-01-15', size:'3.1 MB' },
  { id:5, name:'December Reorder Sheet', type:'Excel', date:'2025-12-30', size:'540 KB' },
]

export default function Reports() {
  const [generating, setGenerating] = useState(null)

  function handleGenerate(type) {
    setGenerating(type)
    setTimeout(() => setGenerating(null), 2200)
  }

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Reports" subtitle="Generate, archive, and revisit your forecasts" />
      <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:'24px' }}>

        {/* Generate cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <div style={{ display:'flex', gap:'18px', marginBottom:'20px' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'var(--terracotta-bg)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>📄</div>
              <div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'6px' }}>Forecast report</h3>
                <p style={{ fontSize:'14px', color:'var(--text-secondary)', lineHeight:1.6 }}>A polished PDF with KPIs, charts, and the colors to watch this quarter.</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerate('pdf')}
              disabled={generating === 'pdf'}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'12px 24px', borderRadius:'50px', border:'none',
                background: generating === 'pdf' ? 'var(--sand)' : 'var(--terracotta)',
                color: generating === 'pdf' ? 'var(--text-secondary)' : '#fff',
                fontSize:'14px', fontWeight:600, cursor:'pointer', transition:'all 0.2s',
              }}>
              ↓ {generating === 'pdf' ? 'Generating…' : 'Generate PDF'}
            </button>
          </div>

          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <div style={{ display:'flex', gap:'18px', marginBottom:'20px' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'14px', background:'var(--sage-bg)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>📊</div>
              <div>
                <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'6px' }}>Inventory export</h3>
                <p style={{ fontSize:'14px', color:'var(--text-secondary)', lineHeight:1.6 }}>A categorized spreadsheet ready for procurement and finance.</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerate('excel')}
              disabled={generating === 'excel'}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'12px 24px', borderRadius:'50px', border:'none',
                background: generating === 'excel' ? 'var(--sand)' : 'var(--sage)',
                color: generating === 'excel' ? 'var(--text-secondary)' : '#fff',
                fontSize:'14px', fontWeight:600, cursor:'pointer', transition:'all 0.2s',
              }}>
              ↓ {generating === 'excel' ? 'Generating…' : 'Generate Excel'}
            </button>
          </div>
        </div>

        {/* History table */}
        <div style={{ background:'var(--bg-card)', borderRadius:'20px', border:'1px solid var(--border)', overflow:'hidden' }}>
          <div style={{ padding:'24px 28px', borderBottom:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'4px' }}>Report history</h3>
            <p style={{ fontSize:'13px', color:'var(--text-secondary)' }}>Everything you've generated, ready to download again.</p>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'var(--bg-primary)' }}>
                {['NAME','TYPE','DATE','SIZE','ACTION'].map(h => (
                  <th key={h} style={{ padding:'12px 24px', textAlign:'left', fontSize:'11px', letterSpacing:'1.5px', color:'var(--text-muted)', fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyData.map(r => (
                <tr key={r.id} style={{ borderTop:'1px solid var(--border)' }}>
                  <td style={{ padding:'18px 24px', fontSize:'15px', fontWeight:500, color:'var(--text-primary)' }}>{r.name}</td>
                  <td style={{ padding:'18px 24px' }}>
                    <span style={{
                      padding:'4px 12px', borderRadius:'50px', fontSize:'12px', fontWeight:600,
                      background: r.type === 'PDF' ? 'var(--terracotta-bg)' : 'var(--sage-bg)',
                      color: r.type === 'PDF' ? 'var(--terracotta)' : 'var(--sage)',
                    }}>📄 {r.type}</span>
                  </td>
                  <td style={{ padding:'18px 24px', fontSize:'14px', color:'var(--text-secondary)' }}>{r.date}</td>
                  <td style={{ padding:'18px 24px', fontSize:'14px', color:'var(--text-secondary)' }}>{r.size}</td>
                  <td style={{ padding:'18px 24px' }}>
                    <button style={{
                      display:'flex', alignItems:'center', gap:'6px',
                      background:'none', border:'none', color:'var(--text-secondary)',
                      fontSize:'14px', cursor:'pointer', fontWeight:500,
                    }}>↓ Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
