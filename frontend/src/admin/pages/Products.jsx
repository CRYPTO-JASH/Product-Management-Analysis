import React from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import ProductTable from '../components/ProductTable.jsx'
import { useAuth } from "../../context/AuthContext"

// 🔥 AUTO COLOR GENERATOR
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}

export default function Products() {
  const { uploadedData } = useAuth()

  // ✅ REMOVE BAD / EMPTY ROWS
  const cleanedData = uploadedData.filter(item =>
    item.name &&
    item.name.trim() !== "" &&
    !item.name.startsWith("#")
  )

  const products = cleanedData.map((item, i) => {
    const value = Number(item.value) || 0

    return {
      id: i,
      name: item.name,

      // ✅ USE CSV HEX OR GENERATE
      hex: item.hex && item.hex.startsWith('#')
        ? item.hex
        : stringToColor(item.name),

      sku: `SKU-${i + 1}`,
      category: item.category || "-",

      value: value,

      // ✅ RISK FIX
      status: value < 100 ? 'risk' : 'ok'
    }
  })

  const riskCount = products.filter(p => p.status === 'risk').length

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Products" subtitle="Manage your full colour catalogue and stock levels" />

      <div style={{ padding:'32px' }}>

        {/* TOP CARDS */}
        <div style={{ display:'flex', gap:'16px', marginBottom:'24px' }}>
          
          <div style={{
            background:'var(--bg-card)',
            borderRadius:'14px',
            padding:'16px 24px',
            border:'1px solid var(--border)',
            display:'flex',
            gap:'12px',
            alignItems:'center'
          }}>
            <span style={{ fontSize:'22px', fontWeight:700 }}>
              {products.length}
            </span>
            <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>
              Total products
            </span>
          </div>

          <div style={{
            background:'var(--bg-card)',
            borderRadius:'14px',
            padding:'16px 24px',
            border:'1px solid var(--border)',
            display:'flex',
            gap:'12px',
            alignItems:'center'
          }}>
            <span style={{ fontSize:'22px', fontWeight:700, color:'var(--terracotta)' }}>
              {riskCount}
            </span>
            <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>
              At risk
            </span>
          </div>
        </div>

        {/* TABLE */}
        {products.length === 0 ? (
          <div style={{
            background:'var(--bg-card)',
            border:'1px solid var(--border)',
            borderRadius:'14px',
            padding:'24px',
            textAlign:'center',
            color:'var(--text-secondary)'
          }}>
            No data uploaded. Go to Dashboard and upload CSV.
          </div>
        ) : (
          <ProductTable products={products} />
        )}

      </div>
    </div>
  )
}