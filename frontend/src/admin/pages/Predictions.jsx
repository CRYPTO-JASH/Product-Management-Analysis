import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import { ActualVsPredictedChart } from '../components/Charts.jsx'
import PredictionTable from '../components/PredictionTable.jsx'
import { getPredictions } from '../../services/api.js'

export default function Predictions() {
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    getPredictions().then(setPredictions)
  }, [])

  const avgConfidence = predictions.length
    ? Math.round(predictions.reduce((s, p) => s + p.confidence, 0) / predictions.length)
    : 0

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Demand Prediction" subtitle="Where the market is moving — and how confident we are." />
      <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:'24px' }}>

        {/* Summary strip */}
        <div style={{ display:'flex', gap:'16px' }}>
          {[
            { label:'Colors tracked', value: predictions.length, color:'var(--text-primary)' },
            { label:'Avg confidence', value: `${avgConfidence}%`, color:'var(--sage)' },
            { label:'Next season peak', value: 'Interior', color:'var(--terracotta)' },
            { label:'Model updated', value: 'Apr 2026', color:'var(--text-secondary)' },
          ].map(s => (
            <div key={s.label} style={{
              flex:1, background:'var(--bg-card)', borderRadius:'16px', padding:'18px 22px',
              border:'1px solid var(--border)',
            }}>
              <p style={{ fontSize:'11px', letterSpacing:'1.5px', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:600, marginBottom:'6px' }}>{s.label}</p>
              <p style={{ fontSize:'22px', fontWeight:700, color: s.color, fontFamily:'Playfair Display,serif' }}>{s.value}</p>
            </div>
          ))}
        </div>

        <ActualVsPredictedChart />
        <PredictionTable predictions={predictions} />
      </div>
    </div>
  )
}
