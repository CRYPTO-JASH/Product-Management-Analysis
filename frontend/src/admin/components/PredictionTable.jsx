import React from "react"

export default function PredictionTable({ predictions }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "16px",
        padding: "20px",
        border: "1px solid var(--border)",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Per-color forecast</h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", fontSize: "13px" }}>
            <th>Name</th>
            <th>Actual</th>
            <th>Predicted</th>
            <th>Confidence</th>
            <th>Trend</th>
            <th>Suggested Stock</th>
          </tr>
        </thead>

        <tbody>
          {predictions.map((p) => {
            const diff = p.predicted - p.actual

            let trend = "stable"
            if (diff > 5) trend = "up"
            else if (diff < -5) trend = "down"

            return (
              <tr key={p.id} style={{ borderTop: "1px solid #eee" }}>
                <td>{p.name}</td>
                <td>{p.actual}</td>
                <td>{p.predicted}</td>
                <td>{p.confidence}%</td>

                <td>
                  <span
                    style={{
                      color:
                        trend === "up"
                          ? "green"
                          : trend === "down"
                          ? "red"
                          : "gray",
                      fontWeight: 600,
                    }}
                  >
                    {trend === "up"
                      ? "↑ Rising"
                      : trend === "down"
                      ? "↓ Falling"
                      : "→ Stable"}
                  </span>
                </td>

                <td>{p.suggestedStock}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}