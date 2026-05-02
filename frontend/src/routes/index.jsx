import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

import AdminLayout from '../layouts/AdminLayout.jsx'
import Dashboard from '../admin/pages/Dashboard.jsx'
import Products from '../admin/pages/Products.jsx'
import Predictions from '../admin/pages/Predictions.jsx'
import Reports from '../admin/pages/Reports.jsx'
import Settings from '../admin/pages/Settings.jsx'

import Login from '../pages/Login.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

// ✅ CUSTOMER APP
import CustomerApp from "../customer/CustomerApp.jsx"

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>

      {/* 🔥 CUSTOMER IS DEFAULT HOME */}
      <Route path="/*" element={<CustomerApp />} />

      {/* 🔐 LOGIN */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* 🧠 ADMIN */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/predictions" element={<ProtectedRoute><Predictions /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Route>

    </Routes>
  )
}