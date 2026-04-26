import React, { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'Search shades, moods, rooms…' }) {
  const [value, setValue] = useState('')

  function handleChange(e) {
    setValue(e.target.value)
    onSearch && onSearch(e.target.value)
  }

  return (
    <div style={{
      display:'flex', alignItems:'center', gap:'12px',
      background:'var(--bg-card)', borderRadius:'50px',
      border:'1.5px solid var(--border)', padding:'12px 22px',
      boxShadow:'0 2px 12px var(--shadow)',
    }}>
      <span style={{ fontSize:'16px', color:'var(--text-muted)' }}>🔍</span>
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          border:'none', background:'none', outline:'none',
          fontSize:'15px', color:'var(--text-primary)', flex:1,
        }}
      />
    </div>
  )
}
