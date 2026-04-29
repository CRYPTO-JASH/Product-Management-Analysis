import React, { useEffect, useState } from "react"
import axios from "axios"

// 🔥 COLOR GENERATOR (name → consistent color)
function stringToColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255
    color += ("00" + value.toString(16)).slice(-2)
  }

  return color
}

export default function Products() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user-shades")
        setData(res.data)
      } catch (err) {
        console.error(err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div style={{ padding: "30px" }}>Loading products...</div>
  }

  if (error) {
    return <div style={{ padding: "30px", color: "red" }}>{error}</div>
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ fontSize: "26px", marginBottom: "20px" }}>
        Products
      </h1>

      {data.length === 0 ? (
        <p>No uploaded data found. Please upload CSV from dashboard.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "16px",
                background: "var(--bg-card)",
              }}
            >
              {/* 🎨 COLOR BOX */}
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  borderRadius: "10px",
                  background: stringToColor(item.name || "default"),
                  marginBottom: "10px",
                }}
              />

              <h3 style={{ margin: "0 0 5px 0" }}>
                {item.name || "Unknown"}
              </h3>

              <p style={{ fontSize: "13px", color: "gray" }}>
                Value: {item.value}
              </p>

              <p style={{ fontSize: "12px", color: "gray" }}>
                Category: {item.category}
              </p>

              <p
                style={{
                  fontSize: "12px",
                  marginTop: "8px",
                  color: item.trend === "up" ? "green" : "orange",
                }}
              >
                {item.trend}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}