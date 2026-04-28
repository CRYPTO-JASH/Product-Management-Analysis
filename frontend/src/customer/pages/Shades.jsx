import React from "react";
import { useAuth } from "../../context/AuthContext";

// 🔥 same color generator (backup)
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}

export default function Shades() {
  const { uploadedData } = useAuth();

  const shades = uploadedData
    .filter(item => item.name && item.name.trim() !== "")
    .map((item, i) => ({
      id: i,
      name: item.name,
      value: Number(item.value) || 0,
      trend: item.trend || "Normal",

      hex: item.hex && item.hex.startsWith("#")
        ? item.hex
        : stringToColor(item.name)
    }));

  // 🔥 sort by demand (for demo “trending” feel)
  const sorted = [...shades].sort((a, b) => b.value - a.value);

  return (
    <div style={{ padding: "32px" }}>

      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Explore Shades
      </h1>

      {sorted.length === 0 ? (
        <p>No data available. Ask retailer to upload CSV.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px"
        }}>
          {sorted.map((shade) => (
            <div key={shade.id} style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "16px",
              background: "var(--bg-card)"
            }}>
              
              <div style={{
                width: "100%",
                height: "80px",
                borderRadius: "12px",
                background: shade.hex,
                marginBottom: "12px"
              }} />

              <div style={{ fontWeight: 600 }}>
                {shade.name}
              </div>

              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {shade.hex}
              </div>

              <div style={{
                marginTop: "8px",
                fontSize: "12px",
                color: shade.value > 150 ? "green" : "orange"
              }}>
                {shade.value > 150 ? "🔥 Trending" : "• Normal"}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}