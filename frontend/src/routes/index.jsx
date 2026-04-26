import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import CustomerLayout from '../layouts/CustomerLayout.jsx'
import Login from '../pages/Login.jsx'
import Dashboard from '../admin/pages/Dashboard.jsx'
import Products from '../admin/pages/Products.jsx'
import Predictions from '../admin/pages/Predictions.jsx'
import Reports from '../admin/pages/Reports.jsx'
import Settings from '../admin/pages/Settings.jsx'
import Home from '../customer/pages/Home.jsx'
import Shades from '../customer/pages/Shades.jsx'
import ShadeDetails from '../customer/pages/ShadeDetails.jsx'
import Trending from '../customer/pages/Trending.jsx'

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<CustomerLayout />}>
        <Route path="/customer" element={<Home />} />
        <Route path="/customer/shades" element={<Shades />} />
        <Route path="/customer/shades/:id" element={<ShadeDetails />} />
        <Route path="/customer/trending" element={<Trending />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
