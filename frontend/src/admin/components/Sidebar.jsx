import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

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
      {/* 🔥 LOGO + BRAND */}
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
            src={logo}
            alt="Pigment Logo"
            style={{
              width: "42px",
              height: "42px",
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

        {/* 🔥 NAV ITEMS */}
        {navItem("/dashboard", "Dashboard")}
        {navItem("/products", "Products")}
        {navItem("/predictions", "Demand Prediction")}
        {navItem("/reports", "Reports")}
        {navItem("/settings", "Settings")}
      </div>

      {/* 🔥 USER SECTION */}
      <div style={{ fontSize: "14px" }}>
        <p style={{ margin: 0 }}>Manager</p>
        <p style={{ margin: 0, color: "#888" }}>Retailer</p>
      </div>
    </div>
  );
}

/* 🔥 NAV LINK STYLE */
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