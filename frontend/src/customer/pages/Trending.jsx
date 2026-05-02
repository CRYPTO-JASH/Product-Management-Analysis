import React from "react";
import { SHADES } from "../../data/shades";
import ShadeCard from "../components/ShadeCard";

export default function Trending() {
  const trending = SHADES.slice(0, 6);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
        What's Trending Now
      </h1>

      <p style={{ color: "#666", marginBottom: "30px" }}>
        Ranked by demand velocity across all retail partners.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "24px"
        }}
      >
        {trending.map((shade, i) => (
          <div key={shade.id}>
            <ShadeCard shade={shade} />

            <div style={{ marginTop: "10px" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>
                #{i + 1} TRENDING
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}