import React from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import KPICard from '../components/KPICard.jsx'
import {
  DemandTrendsChart,
  TopPaintColors,
  SeasonalHeatmap,
  InventoryRiskChart
} from '../components/Charts.jsx'
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { uploadedData, setUploadedData } = useAuth()

  const data = uploadedData || []

  // 🔥 DERIVED VALUES (PURE FRONTEND)
  const totalProducts = data.length || 0

  const highestDemand =
    data.length > 0
      ? data.reduce((max, item) =>
          item.value > max.value ? item : max
        )
      : null

  const stockRisk =
    data.length > 0
      ? data.filter(d => d.value < 100).length
      : 0

  return (
    <div style={{ flex:1, overflowY:'auto' }}>

      {/* HEADER */}
      <PageHeader
        title="Studio Overview"
        subtitle="Demand pulse across every shade in your catalogue"
      />

      <div style={{ padding:'32px' }}>

        {/* UPLOAD */}
        <div style={{
          border: "1px dashed var(--border)",
          borderRadius: "20px",
          padding: "32px",
          textAlign: "center",
          background: "var(--bg-card)",
          marginBottom: "28px",
        }}>
          <p style={{ fontSize: 18 }}>Upload your sales dataset</p>
          <p style={{ fontSize: 13, color: "gray" }}>
            CSV format: name, value, category, trend
          </p>

          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files[0]
              if (!file) return

              const reader = new FileReader()
              reader.onload = (event) => {
                const rows = event.target.result.split("\n").slice(1)

                const parsed = rows
                  .map((row) => {
                    const [name, value, category, trend] = row.split(",")
                    return {
                      name,
                      value: Number(value),
                      category,
                      trend,
                    }
                  })
                  .filter(d => d.name)

                setUploadedData(parsed)
              }

              reader.readAsText(file)
            }}
          />

          {data.length > 0 && (
            <p style={{ marginTop: 10, color: "green" }}>
              File uploaded successfully
            </p>
          )}
        </div>

        {/* KPI */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'20px',
          marginBottom:'28px'
        }}>
          <KPICard label="Total Products" value={totalProducts} />
          <KPICard label="Highest Demand" value={highestDemand?.name || "-"} />
          <KPICard label="Stock Risk Items" value={stockRisk} />
          <KPICard label="Forecast Accuracy" value="—" />
        </div>

        {/* CHARTS */}
        {data.length > 0 && (
          <>
            <div style={{
              display:'grid',
              gridTemplateColumns:'1.6fr 1fr',
              gap:'20px',
              marginBottom:'28px'
            }}>
              <DemandTrendsChart data={data} />
              <TopPaintColors data={data} />
            </div>

            <div style={{
              display:'grid',
              gridTemplateColumns:'1.6fr 1fr',
              gap:'20px'
            }}>
              <SeasonalHeatmap data={data} />
              <InventoryRiskChart data={data} />
            </div>
          </>
        )}

      </div>
    </div>
  )
}