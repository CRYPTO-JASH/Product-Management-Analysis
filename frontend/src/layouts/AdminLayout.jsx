import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function AdminLayout() {
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#EDE3D0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px"
      }}>

        {/* TOP */}
        <div>
          {/* LOGO */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ fontWeight: "600", fontSize: "18px" }}>
              Pigment
            </div>
            <div style={{ fontSize: "11px", letterSpacing: "2px" }}>
              DEMAND STUDIO
            </div>
          </div>

          {/* NAV LINKS */}
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/products" label="Products" />
          <NavItem to="/predictions" label="Demand Prediction" />
          <NavItem to="/reports" label="Reports" />
          <NavItem to="/settings" label="Settings" />
        </div>

        {/* 🔥 BOTTOM USER + LOGOUT */}
        <div>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "500" }}>
              {user?.name || "Manager"}
            </div>
            <div style={{ fontSize: "12px", color: "#777" }}>
              {user?.role || "Retailer"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#C65A3A",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Sign Out
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        background: "#F4ECDD"
      }}>
        <Outlet />
      </div>
    </div>
  )
}

/* 🔥 NAV ITEM COMPONENT */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "10px 15px",
        borderRadius: "8px",
        marginBottom: "10px",
        textDecoration: "none",
        color: isActive ? "#fff" : "#333",
        background: isActive ? "#C65A3A" : "transparent",
        fontWeight: isActive ? "500" : "400"
      })}
    >
      {label}
    </NavLink>
  )
}