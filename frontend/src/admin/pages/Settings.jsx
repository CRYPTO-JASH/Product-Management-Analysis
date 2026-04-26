import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Settings() {
  const { user, theme, toggleTheme } = useAuth()
  const [name, setName] = useState(user?.name || 'Manager')
  const [email, setEmail] = useState(user?.email || 'manager@pigment.studio')
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({ lowStock: true, weeklyDigest: true, demandSpike: false })

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleNotif(key) {
    setNotifications(n => ({ ...n, [key]: !n[key] }))
  }

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Settings" subtitle="Tune your workspace and notification rituals" />
      <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'24px', alignItems:'start' }}>

        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

          {/* Profile */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'32px', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', fontWeight:600, marginBottom:'24px' }}>Profile</h3>
            <div style={{ display:'flex', alignItems:'center', gap:'18px', marginBottom:'28px' }}>
              <div style={{ width:'68px', height:'68px', borderRadius:'18px', background:'var(--terracotta)',
                display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
                fontFamily:'Playfair Display,serif', fontWeight:700, fontSize:'28px', flexShrink:0 }}>
                {name[0] || 'M'}
              </div>
              <div>
                <p style={{ fontSize:'18px', fontWeight:600, color:'var(--text-primary)', marginBottom:'4px' }}>{name}</p>
                <p style={{ fontSize:'14px', color:'var(--text-secondary)', marginBottom:'8px' }}>{email}</p>
                <span style={{ padding:'4px 12px', borderRadius:'50px', fontSize:'12px', fontWeight:500,
                  background:'var(--sand)', color:'var(--text-secondary)' }}>Retailer</span>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px' }}>
              <div>
                <label style={{ display:'block', fontSize:'13px', fontWeight:500, color:'var(--text-secondary)', marginBottom:'8px' }}>Full name</label>
                <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'13px', fontWeight:500, color:'var(--text-secondary)', marginBottom:'8px' }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end' }}>
              <button onClick={handleSave} style={{
                padding:'12px 28px', borderRadius:'50px', border:'none',
                background:'var(--terracotta)', color:'#fff', fontSize:'15px',
                fontWeight:600, cursor:'pointer', transition:'all 0.2s',
              }}>
                {saved ? '✓ Saved!' : 'Save changes'}
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'32px', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'22px', fontWeight:600, marginBottom:'20px' }}>Notifications</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {[
                { key:'lowStock', title:'Low stock alerts', desc:'When any color falls under its reorder line.' },
                { key:'weeklyDigest', title:'Weekly forecast digest', desc:'Every Monday morning, a snapshot of trends.' },
                { key:'demandSpike', title:'Demand spike alerts', desc:'Flag colors that double their normal velocity.' },
              ].map(n => (
                <div key={n.key} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'18px 22px', borderRadius:'14px', border:'1px solid var(--border)', background:'var(--bg-primary)',
                }}>
                  <div>
                    <p style={{ fontSize:'15px', fontWeight:500, color:'var(--text-primary)', marginBottom:'3px' }}>{n.title}</p>
                    <p style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{n.desc}</p>
                  </div>
                  <Toggle checked={notifications[n.key]} onChange={() => toggleNotif(n.key)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

          {/* Appearance */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'20px' }}>Appearance</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <button onClick={() => theme === 'dark' && toggleTheme()} style={{
                display:'flex', alignItems:'center', gap:'14px',
                padding:'16px 20px', borderRadius:'14px',
                border: theme === 'light' ? '2px solid var(--terracotta)' : '1px solid var(--border)',
                background: theme === 'light' ? 'var(--terracotta-bg)' : 'var(--bg-primary)',
                cursor:'pointer', textAlign:'left',
              }}>
                <span style={{ fontSize:'20px' }}>☀️</span>
                <div>
                  <p style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)', marginBottom:'2px' }}>Ivory studio</p>
                  <p style={{ fontSize:'12px', color:'var(--text-secondary)' }}>Daylight palette</p>
                </div>
              </button>
              <button onClick={() => theme === 'light' && toggleTheme()} style={{
                display:'flex', alignItems:'center', gap:'14px',
                padding:'16px 20px', borderRadius:'14px',
                border: theme === 'dark' ? '2px solid var(--terracotta)' : '1px solid var(--border)',
                background: theme === 'dark' ? 'var(--terracotta-bg)' : 'var(--bg-primary)',
                cursor:'pointer', textAlign:'left',
              }}>
                <span style={{ fontSize:'20px' }}>🌙</span>
                <div>
                  <p style={{ fontSize:'14px', fontWeight:600, color:'var(--text-primary)', marginBottom:'2px' }}>Charcoal atelier</p>
                  <p style={{ fontSize:'12px', color:'var(--text-secondary)' }}>Warm dark mode</p>
                </div>
              </button>
            </div>
          </div>

          {/* Role demo */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'10px' }}>Role (demo)</h3>
            <p style={{ fontSize:'14px', color:'var(--text-secondary)', marginBottom:'18px', lineHeight:1.6 }}>
              Switch role to preview navigation visibility and permissions.
            </p>
            <select style={{
              width:'100%', padding:'12px 16px', borderRadius:'12px',
              border:'1.5px solid var(--border)', background:'var(--bg-primary)',
              color:'var(--text-primary)', fontSize:'14px', outline:'none', cursor:'pointer',
            }}>
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
      width:'48px', height:'28px', borderRadius:'99px', cursor:'pointer',
      background: checked ? 'var(--terracotta)' : 'var(--border)',
      position:'relative', transition:'background 0.25s', flexShrink:0,
    }}>
      <div style={{
        position:'absolute', top:'4px',
        left: checked ? '24px' : '4px',
        width:'20px', height:'20px', borderRadius:'50%',
        background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
        transition:'left 0.25s',
      }} />
    </div>
  )
}

const inputStyle = {
  width:'100%', padding:'12px 16px', borderRadius:'12px',
  border:'1.5px solid var(--border)', background:'var(--bg-primary)',
  fontSize:'14px', color:'var(--text-primary)', outline:'none',
}
