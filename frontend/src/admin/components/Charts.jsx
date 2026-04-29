import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts"

// ===============================
// 📈 DEMAND TRENDS (LINE CHART)
// ===============================
// ===============================
// 📊 ACTUAL VS PREDICTED (IMPORTANT)
// ===============================
export function ActualVsPredictedChart({ data }) {
  const chartData = data.map((d, i) => ({
    name: d.name || `Item ${i + 1}`,
    actual: d.actual || 0,
    predicted: d.predicted || 0,
  }))

  return (
    <div className="card">
      <h3>Actual vs predicted demand</h3>
      <p style={{ fontSize: 12, color: "gray" }}>
        Live model output (ARIMA powered)
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="#C65A3A"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#6F8FAF"
            strokeDasharray="5 5"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
export function DemandTrendsChart({ data }) {
  const chartData = data.map((d, i) => ({
    name: d.name || `Item ${i + 1}`,
    value: d.value || 0,
  }))

  return (
    <div className="card">
      <h3>Demand trends</h3>
      <p style={{ fontSize: 12, color: "gray" }}>
        Demand across uploaded products
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#C65A3A" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ===============================
// 🏆 TOP COLORS (BAR CHART)
// ===============================
export function TopPaintColors({ data }) {
  const sorted = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return (
    <div className="card">
      <h3>Top paint colors</h3>
      <p style={{ fontSize: 12, color: "gray" }}>
        Highest demand products
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={sorted}>
          <XAxis dataKey="name" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6F8FAF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ===============================
// 🔥 HEATMAP (SIMPLIFIED GRID)
// ===============================
export function SeasonalHeatmap({ data }) {
  return (
    <div className="card">
      <h3>Seasonal demand heatmap</h3>
      <p style={{ fontSize: 12, color: "gray" }}>
        Based on uploaded dataset
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "10px",
        marginTop: "20px"
      }}>
        {data.slice(0, 12).map((d, i) => (
          <div
            key={i}
            style={{
              height: 40,
              borderRadius: 8,
              background: `rgba(198, 90, 58, ${Math.min(d.value / 200, 1)})`,
            }}
            title={`${d.name} - ${d.value}`}
          />
        ))}
      </div>
    </div>
  )
}

// ===============================
// ⚠️ INVENTORY RISK
// ===============================
export function InventoryRiskChart({ data }) {
  const risky = data.filter(d => d.value < 100)

  return (
    <div className="card">
      <h3>Inventory risk</h3>
      <p style={{ fontSize: 12, color: "gray" }}>
        Low demand items
      </p>

      <div style={{ marginTop: 16 }}>
        {risky.length === 0 && <p>No risk items 🎉</p>}

        {risky.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13
            }}>
              <span>{item.name}</span>
              <span>{item.value}</span>
            </div>

            <div style={{
              height: 8,
              background: "#eee",
              borderRadius: 10,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${item.value}%`,
                background: "#C65A3A",
                height: "100%"
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}