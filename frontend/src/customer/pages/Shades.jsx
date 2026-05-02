import React from "react";
import { SHADES } from "../../data/shades";
import ShadeCard from "../components/ShadeCard";

export default function Shades() {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Explore Shades 🎨
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "24px"
        }}
      >
        {SHADES.map((shade) => (
          <ShadeCard key={shade.id} shade={shade} />
        ))}
      </div>
    </div>
  );
}