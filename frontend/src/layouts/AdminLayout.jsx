import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../admin/components/Sidebar.jsx'

export default function AdminLayout() {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <Outlet />
      </div>
    </div>
  )
}
