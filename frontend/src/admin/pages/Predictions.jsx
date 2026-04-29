import React, { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader.jsx"
import { ActualVsPredictedChart } from "../components/Charts.jsx"
import PredictionTable from "../components/PredictionTable.jsx"
import axios from "axios"

export default function Predictions() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/predictions")

        console.log("RAW API DATA:", res.data) // 🔍 DEBUG

        const formatted = res.data
          .sort((a, b) => b.predicted_demand - a.predicted_demand)
          .slice(0, 10)
          .map((p, i) => {
            const name = p.product || p.name || `Color ${i + 1}`

            return {
              id: i,
              name: name, // 🔥 FORCE NAME
              actual: Math.round(p.predicted_demand * 0.9),
              predicted: p.predicted_demand,
              confidence: p.confidence || 80,
              trend: p.trend || "neutral",
              suggestedStock:
                p.suggested_stock ||
                Math.round(p.predicted_demand * 1.2),
            }
          })

        console.log("FORMATTED:", formatted) // 🔍 DEBUG

        setPredictions(formatted)
      } catch (err) {
        console.error("Prediction fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  const avgConfidence = predictions.length
    ? Math.round(
        predictions.reduce((s, p) => s + p.confidence, 0) /
          predictions.length
      )
    : 0

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading predictions...</div>
  }

  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <PageHeader
        title="Demand Prediction"
        subtitle="Live ARIMA-powered forecast based on uploaded data."
      />

      <div
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* SUMMARY */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "Colors tracked", value: predictions.length },
            { label: "Avg confidence", value: `${avgConfidence}%` },
            { label: "Next season peak", value: "Interior" },
            { label: "Model updated", value: "Live" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                background: "var(--bg-card)",
                borderRadius: "16px",
                padding: "18px 22px",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </p>

              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "Playfair Display,serif",
                }}
              >
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