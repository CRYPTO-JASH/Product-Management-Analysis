import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function CustomerLayout() {
  const { logout, toggleTheme, theme } = useAuth()
  const location = useLocation()

  const navItems = [
    { label:'Explore', path:'/customer' },
    { label:'All Shades', path:'/customer/shades' },
    { label:'Trending', path:'/customer/trending' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-primary)' }}>
      <header style={{
        position:'sticky', top:0, zIndex:100,
        background:'rgba(244,236,221,0.92)', backdropFilter:'blur(12px)',
        borderBottom:'1px solid var(--border)', padding:'0 40px',
        display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'var(--terracotta)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
            fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'16px' }}>P</div>
          <div>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'17px', fontWeight:600 }}>Pigment</div>
            <div style={{ fontSize:'9px', letterSpacing:'2px', color:'var(--warm-gray)', textTransform:'uppercase' }}>Color Studio</div>
          </div>
        </div>

        <nav style={{ display:'flex', gap:'4px' }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{
              padding:'8px 18px', borderRadius:'50px', fontSize:'14px', fontWeight:500,
              color: location.pathname === item.path ? '#fff' : 'var(--text-secondary)',
              background: location.pathname === item.path ? 'var(--terracotta)' : 'transparent',
              transition:'all 0.2s',
            }}>{item.label}</Link>
          ))}
        </nav>

        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={toggleTheme} style={{ background:'none', border:'none', cursor:'pointer', fontSize:'18px', color:'var(--text-secondary)' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button onClick={logout} style={{
            padding:'8px 16px', borderRadius:'50px', border:'1.5px solid var(--border)',
            background:'transparent', color:'var(--text-secondary)', fontSize:'13px', cursor:'pointer', fontWeight:500
          }}>Sign out</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
