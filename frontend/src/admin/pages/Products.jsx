import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import ProductTable from '../components/ProductTable.jsx'
import { getProducts } from '../../services/api.js'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  const riskCount = products.filter(p => p.status === 'risk').length

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Products" subtitle="Manage your full colour catalogue and stock levels" />
      <div style={{ padding:'32px' }}>
        <div style={{ display:'flex', gap:'16px', marginBottom:'24px' }}>
          <div style={{ background:'var(--bg-card)', borderRadius:'14px', padding:'16px 24px', border:'1px solid var(--border)', display:'flex', gap:'12px', alignItems:'center' }}>
            <span style={{ fontSize:'22px', fontWeight:700, color:'var(--text-primary)' }}>{products.length}</span>
            <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>Total products</span>
          </div>
          <div style={{ background:'var(--bg-card)', borderRadius:'14px', padding:'16px 24px', border:'1px solid var(--border)', display:'flex', gap:'12px', alignItems:'center' }}>
            <span style={{ fontSize:'22px', fontWeight:700, color:'var(--terracotta)' }}>{riskCount}</span>
            <span style={{ fontSize:'13px', color:'var(--text-secondary)' }}>At risk</span>
          </div>
        </div>
        <ProductTable products={products} />
      </div>
    </div>
  )
}
