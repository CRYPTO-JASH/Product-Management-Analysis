import React from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import KPICard from '../components/KPICard.jsx'
import { DemandTrendsChart, TopPaintColors, SeasonalHeatmap, InventoryRiskChart } from '../components/Charts.jsx'
import { useAuth } from "../../context/AuthContext"

export default function Dashboard() {
  const { uploadedData, setUploadedData } = useAuth()

  // 🔥 Use uploaded data if available
  const data = uploadedData.length > 0 ? uploadedData : []

  // 🔥 Derived values
  const totalProducts = data.length > 0 ? data.length : 24

  const highestDemand =
    data.length > 0
      ? data.reduce((max, item) =>
          item.value > max.value ? item : max
        )
      : null

  const stockRisk =
    data.length > 0
      ? data.filter(d => d.value < 100).length
      : 6

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'0' }}>
      <PageHeader title="Studio Overview" subtitle="Demand pulse across every shade in your catalogue" />

      <div style={{ padding:'32px' }}>

        {/* 🔥 CLEAN UPLOAD UI */}
        <div
          style={{
            border: "1px dashed var(--border)",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
            background: "var(--bg-card)",
            marginBottom: "24px",
          }}
        >
          <p style={{
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "10px"
          }}>
            Upload your sales dataset
          </p>

          <p style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            marginBottom: "16px"
          }}>
            CSV format: name, value, category, trend
          </p>

          <label
            style={{
              padding: "10px 20px",
              borderRadius: "50px",
              background: "var(--terracotta)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              display: "inline-block"
            }}
          >
            Choose File
            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                  const text = event.target.result;
                  const rows = text.split("\n").slice(1);

                  const parsed = rows
                    .map((row) => {
                      const [name, value, category, trend] = row.split(",");
                      return {
                        name,
                        value: Number(value),
                        category,
                        trend,
                      };
                    })
                    .filter((d) => d.name);

                  setUploadedData(parsed);
                };

                reader.readAsText(file);
              }}
              style={{ display: "none" }}
            />
          </label>

          {uploadedData.length > 0 && (
            <p style={{ marginTop: "10px", fontSize: "12px", color: "green" }}>
              File uploaded successfully ✅
            </p>
          )}
        </div>

        {/* 🔥 ORIGINAL KPI CARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'24px' }}>
          <KPICard
            label="Total Products"
            value={totalProducts}
            sub="Across 5 categories"
            trend="+4.2% vs last quarter"
            trendDir="up"
            icon="⊞"
            iconBg="var(--terracotta-bg)"
          />

          <KPICard
            label="Highest Demand"
            value={highestDemand ? highestDemand.name : "Terracotta Red"}
            sub="Leading shade this month"
            accent="#C65A3A"
            icon="🎨"
            iconBg="var(--terracotta-bg)"
          />

          <KPICard
            label="Stock Risk Items"
            value={stockRisk}
            sub="At or below reorder line"
            trend="-2 items vs last quarter"
            trendDir="down"
            icon="⚠"
            iconBg="var(--terracotta-bg)"
          />

          <KPICard
            label="Forecast Accuracy"
            value="92.4%"
            sub="Trailing 90 days"
            trend="+1.8% vs last quarter"
            trendDir="up"
            icon="◎"
            iconBg="var(--sage-bg)"
          />
        </div>

        {/* 🔥 CHARTS */}
        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'20px', marginBottom:'24px' }}>
          <DemandTrendsChart data={data} />
          <TopPaintColors data={data} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'20px' }}>
          <SeasonalHeatmap data={data} />
          <InventoryRiskChart data={data} />
        </div>

      </div>
    </div>
  )
}