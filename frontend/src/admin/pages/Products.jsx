import React from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import ProductTable from '../components/ProductTable.jsx'
import { useAuth } from "../../context/AuthContext"

export default function Products() {
  const { uploadedData } = useAuth()

  // 🔥 Convert CSV → product format (FIXED)
  const products = uploadedData.map((item, i) => ({
    id: i,
    name: item.name,
    hex: "#C65A3A", // you can improve later
    sku: `SKU-${i + 1}`,
    category: item.category,
    stock: Number(item.value),

    // ✅ FIX: proper risk logic
    status: Number(item.value) < 100 ? 'risk' : 'in_stock'
  }))

  // ✅ FIX: correct risk count
  const riskCount = products.filter(p => p.status === 'risk').length

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Products" subtitle="Manage your full colour catalogue and stock levels" />

      <div style={{ padding:'32px' }}>

        {/* TOP CARDS (UNCHANGED UI) */}
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