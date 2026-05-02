import React, { useEffect, useState } from "react"
import axios from "axios"
import PageHeader from "../../components/PageHeader.jsx"

export default function Reports() {
  const [totalRecords, setTotalRecords] = useState(0)
  const [totalDemand, setTotalDemand] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/predictions"
        )

        setTotalRecords(res.data.length)

        const demandSum = res.data.reduce(
          (sum, item) => sum + (item.predicted_demand || 0),
          0
        )

        // ✅ FIX: round it
        setTotalDemand(Math.round(demandSum))

      } catch (err) {
        console.error("Report data error:", err)
      }
    }

    fetchData()
  }, [])

  // 📄 PDF
  const downloadPDF = () => {
    setLoading(true)
    window.open(
      "http://127.0.0.1:8000/api/report/pdf",
      "_blank"
    )
    setTimeout(() => setLoading(false), 2000)
  }

  // ❌ REMOVE EXCEL (since backend not ready)
  // OR keep but comment for now

  return (
    <div style={{ flex: 1 }}>
      <PageHeader
        title="Reports"
        subtitle="Generate, archive, and revisit your forecasts"
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
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid var(--border)",
          }}
        >
          <p>Total Records: {totalRecords}</p>
          <p>Total Demand: {totalDemand}</p>
        </div>

        {/* CARDS */}
        <div style={{ display: "flex", gap: "20px" }}>
          
          {/* PDF CARD */}
          <div
            style={{
              flex: 1,
              background: "var(--bg-card)",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid var(--border)",
            }}
          >
            <h3>Forecast report</h3>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Generate PDF
            </p>

            <button
              onClick={downloadPDF}
              disabled={loading}
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Generate PDF
            </button>
          </div>

          {/* OPTIONAL: Excel disabled */}
          <div
            style={{
              flex: 1,
              background: "var(--bg-card)",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid var(--border)",
              opacity: 0.6
            }}
          >
            <h3>Inventory export</h3>
            <p style={{ fontSize: "12px", color: "gray" }}>
              Coming soon
            </p>

            <button disabled style={{
              marginTop: "10px",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}>
              Not Available
            </button>
          </div>
        </div>

        {loading && (
          <p style={{ color: "gray" }}>
            Generating report...
          </p>
        )}
      </div>
    </div>
  )
}