import React from "react"

export default function PredictionTable({ predictions = [] }) {
  return (
    <div style={{
      background:'var(--bg-card)',
      border:'1px solid var(--border)',
      borderRadius:'16px',
      overflow:'hidden'
    }}>
      <div style={{ padding:'20px' }}>
        <h3>Per-color forecast</h3>
        <p style={{ color:'var(--text-secondary)', fontSize:'14px' }}>
          Predicted units, model confidence, and stocking recommendation.
        </p>
      </div>

      <table style={{ width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr style={{ borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
            <th style={th}>Color</th>
            <th style={th}>Predicted Demand</th>
            <th style={th}>Confidence</th>
            <th style={th}>Suggested Stock</th>
            <th style={th}>Trend</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((p, i) => (
            <tr key={i} style={{ borderBottom:'1px solid var(--border)' }}>
              <td style={td}>{p.name || "Unknown"}</td>
              <td style={td}>{p.predicted || 0}</td>
              <td style={td}>{p.confidence || 0}%</td>
              <td style={td}>{p.suggestedStock || 0}</td>
              <td style={td}>
                {(p.trend || "neutral").toUpperCase()} {/* ✅ CRASH FIX */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const th = {
  textAlign:'left',
  padding:'12px',
  fontSize:'12px',
  textTransform:'uppercase',
  color:'var(--text-muted)'
}

const td = {
  padding:'12px',
  color:'var(--text-primary)'
}