import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { label:'Dashboard', path:'/dashboard', icon:'⊞' },
  { label:'Products', path:'/products', icon:'◎' },
  { label:'Demand Prediction', path:'/predictions', icon:'↗' },
  { label:'Reports', path:'/reports', icon:'≡' },
  { label:'Settings', path:'/settings', icon:'⚙' },
]

export default function Sidebar() {
  const { user, logout, toggleTheme, theme } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div style={{
      width:'280px', minWidth:'280px', minHeight:'100vh',
      background:'var(--bg-sidebar)', borderRight:'1px solid var(--border)',
      display:'flex', flexDirection:'column', padding:'28px 16px',
      position:'sticky', top:0, height:'100vh',
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'8px', padding:'0 8px' }}>
        <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'var(--terracotta)',
          display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
          fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'20px', flexShrink:0 }}>P</div>
        <div>
          <div style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, color:'var(--text-primary)' }}>Pigment</div>
          <div style={{ fontSize:'10px', letterSpacing:'2px', color:'var(--warm-gray)', textTransform:'uppercase', fontWeight:500 }}>Demand Studio</div>
        </div>
      </div>

      {/* Dark mode hint */}
      <div style={{ padding:'6px 8px', marginBottom:'20px' }}>
        <div style={{ fontSize:'11px', color:'var(--text-muted)', background:'var(--charcoal)', color:'#fff',
          borderRadius:'6px', padding:'4px 10px', display:'inline-block', fontSize:'11px' }}>
          Preview: Paint Demand Prediction
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:'4px' }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path} style={{
              display:'flex', alignItems:'center', gap:'12px',
              padding:'12px 16px', borderRadius:'12px',
              background: isActive ? 'var(--terracotta)' : 'transparent',
              color: isActive ? '#fff' : 'var(--text-primary)',
              fontSize:'15px', fontWeight: isActive ? 600 : 400,
              transition:'all 0.15s', cursor:'pointer',
              textDecoration:'none',
            }}>
              <span style={{ fontSize:'17px', width:'20px', textAlign:'center', opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: user + theme + logout */}
      <div style={{ borderTop:'1px solid var(--border)', paddingTop:'16px', marginTop:'16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'8px', marginBottom:'8px' }}>
          <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'var(--sand-dark)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', fontWeight:600,
            color:'var(--text-secondary)', flexShrink:0 }}>
            {user?.name?.[0] || 'M'}
          </div>
          <div>
            <div style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)' }}>{user?.name || 'Manager'}</div>
            <div style={{ fontSize:'11px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px' }}>
              {user?.role || 'RETAILER'}
            </div>
          </div>
          <button onClick={toggleTheme} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', fontSize:'16px', color:'var(--text-muted)' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <button onClick={handleLogout} style={{
          display:'flex', alignItems:'center', gap:'8px',
          width:'100%', padding:'10px 16px', borderRadius:'10px',
          background:'none', border:'none', color:'var(--text-secondary)',
          fontSize:'14px', cursor:'pointer', textAlign:'left',
          transition:'color 0.15s',
        }}>
          <span>⇥</span> Sign out
        </button>
      </div>
    </div>
  )
}
