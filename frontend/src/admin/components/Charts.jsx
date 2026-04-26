import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts'

const demandData = [
  { month:'Jan', Interior:420, Exterior:180, Industrial:140, Specialty:80, Primer:60 },
  { month:'Feb', Interior:450, Exterior:195, Industrial:145, Specialty:85, Primer:65 },
  { month:'Mar', Interior:490, Exterior:220, Industrial:155, Specialty:90, Primer:70 },
  { month:'Apr', Interior:530, Exterior:260, Industrial:160, Specialty:95, Primer:72 },
  { month:'May', Interior:510, Exterior:310, Industrial:150, Specialty:92, Primer:68 },
  { month:'Jun', Interior:480, Exterior:355, Industrial:148, Specialty:88, Primer:65 },
  { month:'Jul', Interior:460, Exterior:380, Industrial:145, Specialty:85, Primer:63 },
  { month:'Aug', Interior:440, Exterior:340, Industrial:142, Specialty:82, Primer:60 },
  { month:'Sep', Interior:470, Exterior:290, Industrial:150, Specialty:88, Primer:66 },
  { month:'Oct', Interior:500, Exterior:230, Industrial:155, Specialty:93, Primer:70 },
  { month:'Nov', Interior:520, Exterior:200, Industrial:158, Specialty:95, Primer:72 },
  { month:'Dec', Interior:540, Exterior:185, Industrial:162, Specialty:97, Primer:74 },
]

const actualVsPredicted = [
  { month:'Jan', actual:330, predicted:325 },
  { month:'Feb', actual:360, predicted:355 },
  { month:'Mar', actual:455, predicted:450 },
  { month:'Apr', actual:470, predicted:465 },
  { month:'May', actual:455, predicted:460 },
  { month:'Jun', actual:448, predicted:466 },
  { month:'Jul', actual:430, predicted:440 },
  { month:'Aug', actual:400, predicted:410 },
  { month:'Sep', actual:370, predicted:380 },
  { month:'Oct', actual:355, predicted:365 },
  { month:'Nov', actual:350, predicted:358 },
  { month:'Dec', actual:370, predicted:362 },
]

const topColors = [
  { name:'Terracotta ...', units:482, color:'#C65A3A' },
  { name:'Sage Mist', units:418, color:'#8AA89F' },
  { name:'Ivory White', units:395, color:'#F4ECDD', border:'#ccc' },
  { name:'Ocean Grey', units:271, color:'#7B9EA8' },
  { name:'Forest Shade', units:244, color:'#3D6B4F' },
]

const heatmapData = [
  { category:'Interior', months:[0.8,0.8,0.7,0.7,0.6,0.6,0.5,0.5,0.6,0.7,0.7,0.8] },
  { category:'Exterior', months:[0.2,0.3,0.5,0.7,0.9,1.0,1.0,0.9,0.7,0.5,0.3,0.2] },
  { category:'Industrial', months:[0.5,0.5,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.6,0.5,0.5] },
  { category:'Specialty', months:[0.4,0.4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.4,0.4] },
  { category:'Primer', months:[0.4,0.4,0.6,0.7,0.7,0.6,0.5,0.5,0.6,0.6,0.5,0.4] },
]

const inventoryRisk = [
  { name:'Terracotta Red', value:142, color:'#C65A3A' },
  { name:'Sage Mist', value:38, color:'#8AA89F' },
  { name:'Ivory White', value:220, color:'#E8E0D0', labelColor:'#999' },
  { name:'Charcoal Smoke', value:95, color:'#2E2E2E' },
  { name:'Sand Dune', value:55, color:'#E7DDCF', labelColor:'#999' },
  { name:'Mustard Field', value:30, color:'#C99A3B' },
]

const MONTHS_SHORT = ['JAN','FEB','MAR','APR','MAY','JUN','JUL']

function heatColor(v) {
  const r = Math.round(198 + (1-v)*20)
  const g = Math.round(100 + (1-v)*100)
  const b = Math.round(88 + (1-v)*80)
  const a = 0.2 + v * 0.8
  return `rgba(${r},${g},${b},${a})`
}

const CustomTooltipAVP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:'12px', padding:'14px 18px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
      <p style={{ fontWeight:600, marginBottom:'6px', color:'var(--text-primary)' }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.dataKey === 'actual' ? '#C65A3A' : '#8AA89F', fontSize:'14px', fontWeight:500 }}>
          {p.dataKey.charAt(0).toUpperCase()+p.dataKey.slice(1)} : {p.value}
        </p>
      ))}
    </div>
  )
}

export function DemandTrendsChart() {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'4px' }}>Demand trends</h3>
      <p style={{ color:'var(--text-secondary)', fontSize:'13px', marginBottom:'24px' }}>Monthly unit demand by category, trailing twelve months.</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={demandData} margin={{ top:5, right:20, left:0, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius:'12px', border:'1px solid var(--border)', fontSize:'13px' }} />
          <Line type="monotone" dataKey="Interior" stroke="#C65A3A" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Exterior" stroke="#8AA89F" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Industrial" stroke="#C99A3B" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ActualVsPredictedChart() {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'4px' }}>Actual vs predicted demand</h3>
      <p style={{ color:'var(--text-secondary)', fontSize:'13px', marginBottom:'24px' }}>How closely our model has tracked reality, last twelve months.</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={actualVsPredicted} margin={{ top:5, right:20, left:0, bottom:5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0,600]} ticks={[0,150,300,450,600]} tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltipAVP />} />
          <Legend
            formatter={(v) => <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>{v.charAt(0).toUpperCase()+v.slice(1)}</span>}
            iconType="circle" iconSize={10}
          />
          <Line type="monotone" dataKey="actual" stroke="#C65A3A" strokeWidth={2.5} dot={{ fill:'#C65A3A', r:4 }} activeDot={{ r:6 }} />
          <Line type="monotone" dataKey="predicted" stroke="#8AA89F" strokeWidth={2.5} strokeDasharray="6 3" dot={{ fill:'#8AA89F', r:4 }} activeDot={{ r:6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopPaintColors() {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', fontWeight:600, marginBottom:'4px' }}>Top paint colors</h3>
      <p style={{ color:'var(--text-secondary)', fontSize:'12px', marginBottom:'20px' }}>Last 30 days, by units sold.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
        {topColors.map(c => (
          <div key={c.name}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
              <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:c.color, border: c.border ? `1px solid ${c.border}` : 'none', flexShrink:0 }} />
              <span style={{ fontSize:'14px', color:'var(--text-primary)', flex:1 }}>{c.name}</span>
              <span style={{ fontSize:'13px', fontWeight:600, color:'var(--text-secondary)' }}>{c.units} units</span>
            </div>
            <div style={{ height:'4px', borderRadius:'99px', background:'var(--border)' }}>
              <div style={{ height:'100%', borderRadius:'99px', background:c.color === '#F4ECDD' ? '#ccc' : c.color, width:`${(c.units/500)*100}%`, transition:'width 0.6s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SeasonalHeatmap() {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'20px', fontWeight:600, marginBottom:'4px' }}>Seasonal demand heatmap</h3>
      <p style={{ color:'var(--text-secondary)', fontSize:'13px', marginBottom:'24px' }}>Where each category peaks across the year.</p>
      <div style={{ overflowX:'auto' }}>
        <table style={{ borderCollapse:'separate', borderSpacing:'5px', width:'100%' }}>
          <thead>
            <tr>
              <th style={{ width:'90px' }}></th>
              {MONTHS_SHORT.map(m => (
                <th key={m} style={{ fontSize:'11px', color:'var(--text-muted)', fontWeight:600, letterSpacing:'1px', textAlign:'center', padding:'0 4px 8px' }}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map(row => (
              <tr key={row.category}>
                <td style={{ fontSize:'13px', color:'var(--text-secondary)', paddingRight:'12px', whiteSpace:'nowrap' }}>{row.category}</td>
                {row.months.slice(0,7).map((v,i) => (
                  <td key={i} style={{ padding:'2px' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'10px', background:heatColor(v), transition:'transform 0.15s' }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function InventoryRiskChart() {
  return (
    <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
      <h3 style={{ fontFamily:'Playfair Display,serif', fontSize:'18px', fontWeight:600, marginBottom:'4px' }}>Inventory risk</h3>
      <p style={{ color:'var(--text-secondary)', fontSize:'12px', marginBottom:'20px' }}>Items closest to running out.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {inventoryRisk.map(item => (
          <div key={item.name} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ fontSize:'12px', color:'var(--text-secondary)', width:'100px', textAlign:'right', flexShrink:0 }}>{item.name}</span>
            <div style={{ flex:1, height:'18px', borderRadius:'99px', background:'var(--border)', overflow:'hidden' }}>
              <div style={{ height:'100%', borderRadius:'99px', background:item.color, width:`${(item.value/240)*100}%`, transition:'width 0.6s' }} />
            </div>
          </div>
        ))}
        <div style={{ display:'flex', justifyContent:'flex-end', gap:'20px', marginTop:'4px' }}>
          {['0','40','80','120','160','200','240'].map(v => (
            <span key={v} style={{ fontSize:'11px', color:'var(--text-muted)' }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
