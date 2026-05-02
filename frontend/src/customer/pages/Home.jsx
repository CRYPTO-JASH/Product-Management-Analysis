import React, { useEffect, useState } from "react";
import Hero from "../components/Hero.jsx";
import { SHADES } from "../../data/shades.js";

const FAMILIES = ["Warm", "Cool", "Neutral", "Dark"];

export default function Home() {
  const [shades, setShades] = useState([]);

  useEffect(() => {
    setShades(SHADES);
  }, []);

  return (
    <div>
      <Hero />

      <div style={{ padding: "40px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
          Shop by mood
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "24px"
          }}
        >
          {FAMILIES.map((f) => {
            const list = shades.filter((s) => s.family === f);

            return (
              <div
                key={f}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1px solid #eee"
                }}
              >
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  {list.slice(0, 4).map((s) => (
                    <div
                      key={s.id}
                      style={{
                        width: "25%",
                        height: "50px",
                        background: s.hex
                      }}
                    />
                  ))}
                </div>

                <p style={{ fontWeight: 600 }}>{f} tones</p>
                <p style={{ color: "#888", fontSize: "12px" }}>
                  {list.length} shades
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}