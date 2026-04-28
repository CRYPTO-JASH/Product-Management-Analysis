import React, { useMemo } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import { ActualVsPredictedChart } from '../components/Charts.jsx'
import PredictionTable from '../components/PredictionTable.jsx'
import { useAuth } from "../../context/AuthContext"

export default function Predictions() {
  const { uploadedData } = useAuth()

  // 🔥 Generate predictions safely
  const predictions = useMemo(() => {
    if (uploadedData.length === 0) return []

    return uploadedData.map((item, i) => {
      const predicted = Math.round(item.value * (0.9 + Math.random() * 0.2))
      const confidence = Math.floor(75 + Math.random() * 20)

      return {
        id: i,
        name: item.name || "Unknown",
        actual: item.value || 0,
        predicted,
        confidence,
        trend: item.trend || "neutral", // ✅ FIX
        suggestedStock: Math.round(predicted * 1.2)
      }
    })
  }, [uploadedData])

  const avgConfidence = predictions.length
    ? Math.round(predictions.reduce((s, p) => s + p.confidence, 0) / predictions.length)
    : 80

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Demand Prediction" subtitle="Where the market is moving — and how confident we are." />

      <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:'24px' }}>

        {/* SUMMARY */}
        <div style={{ display:'flex', gap:'16px' }}>
          {[
            { label:'Colors tracked', value: predictions.length || 0 },
            { label:'Avg confidence', value: `${avgConfidence}%` },
            { label:'Next season peak', value: 'Interior' },
            { label:'Model updated', value: 'Apr 2026' },
          ].map(s => (
            <div key={s.label} style={{
              flex:1,
              background:'var(--bg-card)',
              borderRadius:'16px',
              padding:'18px 22px',
              border:'1px solid var(--border)',
            }}>
              <p style={{
                fontSize:'11px',
                letterSpacing:'1.5px',
                textTransform:'uppercase',
                color:'var(--text-muted)',
                fontWeight:600
              }}>
                {s.label}
              </p>

              <p style={{
                fontSize:'22px',
                fontWeight:700,
                fontFamily:'Playfair Display,serif'
              }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* CHART */}
        <ActualVsPredictedChart data={predictions} />

        {/* TABLE */}
        <PredictionTable predictions={predictions} />
      </div>
    </div>
  )
}