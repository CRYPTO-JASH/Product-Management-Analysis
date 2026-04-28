import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Settings() {
  const { user, theme, toggleTheme } = useAuth()

  const [name, setName] = useState(user?.name || 'Manager')
  const [email, setEmail] = useState(user?.email || 'manager@pigment.studio')
  const [saved, setSaved] = useState(false)

  // 🔥 Backend notifications
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/settings")
      .then(res => res.json())
      .then(data => setNotifications({
        lowStock: data.lowStock,
        weeklyDigest: data.weeklyDigest,
        demandSpike: data.spikeAlerts
      }))
      .catch(() => {
        setNotifications({
          lowStock: true,
          weeklyDigest: true,
          demandSpike: false
        })
      })
  }, [])

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleNotif(key) {
    const updated = { ...notifications, [key]: !notifications[key] }
    setNotifications(updated)

    fetch("http://localhost:8000/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lowStock: updated.lowStock,
        weeklyDigest: updated.weeklyDigest,
        spikeAlerts: updated.demandSpike
      })
    })
  }

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Settings" subtitle="Tune your workspace and notification rituals" />

      <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'24px', alignItems:'start' }}>

        {/* LEFT COLUMN */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

          {/* PROFILE */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Profile</h3>

            <div style={{ display:'flex', alignItems:'center', gap:'18px', marginBottom:'28px' }}>
              <div style={avatarStyle}>
                {name[0] || 'M'}
              </div>

              <div>
                <p style={{ fontSize:'18px', fontWeight:600 }}>{name}</p>
                <p style={{ fontSize:'14px', color:'var(--text-secondary)' }}>{email}</p>
                <span style={badgeStyle}>Retailer</span>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }}>
              <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button onClick={handleSave} style={buttonStyle}>
                {saved ? '✓ Saved!' : 'Save changes'}
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Notifications</h3>

            {notifications && [
              { key:'lowStock', title:'Low stock alerts', desc:'When any color falls under its reorder line.' },
              { key:'weeklyDigest', title:'Weekly forecast digest', desc:'Every Monday morning, a snapshot of trends.' },
              { key:'demandSpike', title:'Demand spike alerts', desc:'Flag colors that double their normal velocity.' },
            ].map(n => (
              <div key={n.key} style={notifCard}>
                <div>
                  <p style={{ fontWeight:500 }}>{n.title}</p>
                  <p style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{n.desc}</p>
                </div>
                <Toggle checked={notifications[n.key]} onChange={() => toggleNotif(n.key)} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

          {/* APPEARANCE (RESTORED UI) */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Appearance</h3>

            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              
              {/* LIGHT */}
              <button onClick={() => theme === 'dark' && toggleTheme()} style={{
                ...appearanceBtn,
                border: theme === 'light' ? '2px solid var(--terracotta)' : '1px solid var(--border)',
                background: theme === 'light' ? 'var(--terracotta-bg)' : 'var(--bg-primary)'
              }}>
                ☀️ Ivory studio
              </button>

              {/* DARK */}
              <button onClick={() => theme === 'light' && toggleTheme()} style={{
                ...appearanceBtn,
                border: theme === 'dark' ? '2px solid var(--terracotta)' : '1px solid var(--border)',
                background: theme === 'dark' ? 'var(--terracotta-bg)' : 'var(--bg-primary)'
              }}>
                🌙 Charcoal atelier
              </button>
            </div>
          </div>

          {/* ROLE (RESTORED UI) */}
          <div style={cardStyle}>
            <h3 style={titleStyle}>Role (demo)</h3>

            <p style={{ fontSize:'14px', color:'var(--text-secondary)', marginBottom:'18px' }}>
              Switch role to preview navigation visibility and permissions.
            </p>

            <select style={selectStyle}>
              <option>Retailer</option>
              <option>Customer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{
      width:'48px', height:'28px',
      borderRadius:'99px',
      background: checked ? 'var(--terracotta)' : 'var(--border)',
      position:'relative',
      cursor:'pointer'
    }}>
      <div style={{
        position:'absolute',
        left: checked ? '24px' : '4px',
        top:'4px',
        width:'20px',
        height:'20px',
        borderRadius:'50%',
        background:'#fff'
      }} />
    </div>
  )
}

/* ---------- STYLES ---------- */

const cardStyle = {
  background:'var(--bg-card)',
  borderRadius:'20px',
  padding:'28px',
  border:'1px solid var(--border)'
}

const titleStyle = {
  fontSize:'20px',
  marginBottom:'20px'
}

const avatarStyle = {
  width:'68px',
  height:'68px',
  borderRadius:'18px',
  background:'var(--terracotta)',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  color:'#fff',
  fontSize:'28px',
  fontWeight:700
}

const badgeStyle = {
  padding:'4px 12px',
  borderRadius:'50px',
  fontSize:'12px',
  background:'var(--sand)'
}

const inputStyle = {
  padding:'12px',
  borderRadius:'12px',
  border:'1px solid var(--border)',
  background:'var(--bg-primary)'
}

const buttonStyle = {
  padding:'12px 28px',
  borderRadius:'50px',
  border:'none',
  background:'var(--terracotta)',
  color:'#fff',
  cursor:'pointer'
}

const notifCard = {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  padding:'16px',
  border:'1px solid var(--border)',
  borderRadius:'14px',
  marginBottom:'12px'
}

const appearanceBtn = {
  padding:'14px',
  borderRadius:'14px',
  cursor:'pointer',
  textAlign:'left'
}

const selectStyle = {
  width:'100%',
  padding:'12px',
  borderRadius:'12px',
  border:'1px solid var(--border)'
}