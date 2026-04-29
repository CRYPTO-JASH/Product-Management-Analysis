import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        background: "var(--ivory)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px",
      }}
    >
      {/* 🔥 LOGO */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <img
            src="/logo.png"   // ✅ THIS ALWAYS WORKS
            alt="Pigment Logo"
            style={{
              width: "36px",
              height: "36px",
              objectFit: "contain",
            }}
          />

          <div>
            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              Pigment
            </div>

            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                color: "#888",
              }}
            >
              DEMAND STUDIO
            </div>
          </div>
        </div>

        {navItem("/dashboard", "Dashboard")}
        {navItem("/products", "Products")}
        {navItem("/predictions", "Demand Prediction")}
        {navItem("/reports", "Reports")}
        {navItem("/settings", "Settings")}
      </div>

      {/* USER */}
      <div style={{ fontSize: "14px" }}>
        <p style={{ margin: 0 }}>Jash Patel</p>
        <p style={{ margin: 0, color: "#888" }}>Retailer</p>

        <button
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "var(--terracotta)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function navItem(path, label) {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 14px",
        borderRadius: "10px",
        marginBottom: "8px",
        textDecoration: "none",
        color: isActive ? "white" : "#333",
        background: isActive ? "var(--terracotta)" : "transparent",
        fontWeight: 500,
      })}
    >
      {label}
    </NavLink>
  );
}