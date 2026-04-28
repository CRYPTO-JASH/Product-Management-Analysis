import React, { useState } from 'react';

export default function ProductTable({ products }) {
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.sku || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: '20px',
      border: '1px solid var(--border)',
      overflow: 'hidden'
    }}>

      <div style={{
        padding: '24px 28px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{
            fontFamily: 'Playfair Display,serif',
            fontSize: '18px',
            fontWeight: 600
          }}>
            All Products
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)'
          }}>
            {filtered.length} products in catalogue
          </p>
        </div>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            padding: '10px 16px',
            borderRadius: '50px',
            border: '1.5px solid var(--border)',
            background: 'var(--bg-primary)',
            fontSize: '14px',
            color: 'var(--text-primary)',
            outline: 'none',
            width: '220px'
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--bg-primary)' }}>
            {['COLOR','SKU','CATEGORY','STOCK','STATUS'].map(h => (
              <th key={h} style={{
                padding: '12px 20px',
                textAlign: 'left',
                fontSize: '11px',
                letterSpacing: '1.5px',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.map((p, i) => {

            const stock = p.value || 0;
            const status = stock < 100 ? 'risk' : 'ok';

            return (
              <tr key={i} style={{
                borderTop: '1px solid var(--border)'
              }}>
                
                <td style={{ padding: '16px 20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: p.hex || '#ccc',   // ✅ FIXED
                      border: '1px solid rgba(0,0,0,0.06)'
                    }} />

                    <div>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        color: 'var(--text-primary)'
                      }}>
                        {p.name || 'Unknown'}
                      </div>

                      <div style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)'
                      }}>
                        {p.hex || '#ccc'}
                      </div>
                    </div>

                  </div>
                </td>

                <td style={{
                  padding: '16px 20px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  {p.sku}
                </td>

                <td style={{
                  padding: '16px 20px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  {p.category || '-'}
                </td>

                <td style={{
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)'
                }}>
                  {stock}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    padding:'4px 12px',
                    borderRadius:'50px',
                    fontSize:'12px',
                    fontWeight:600,
                    background: status === 'ok'
                      ? 'var(--sage-bg)'
                      : 'var(--terracotta-bg)',
                    color: status === 'ok'
                      ? 'var(--sage)'
                      : 'var(--terracotta)'
                  }}>
                    {status === 'ok'
                      ? '✓ In stock'
                      : '⚠ Risk'}
                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}