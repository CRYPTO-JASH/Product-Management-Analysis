import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import { useAuth } from "../../context/AuthContext"
import jsPDF from "jspdf"

export default function Reports() {
  const { uploadedData } = useAuth()
  const [generating, setGenerating] = useState(null)

  function handleGenerate(type) {
    if (!uploadedData.length) {
      alert("Upload data first")
      return
    }

    setGenerating(type)

    setTimeout(() => {

      // ✅ EXCEL EXPORT
      if (type === "excel") {
        const headers = Object.keys(uploadedData[0]).join(",")
        const rows = uploadedData.map(obj =>
          Object.values(obj).join(",")
        )

        const csvContent = [headers, ...rows].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = "report.csv"
        a.click()
      }

      // ✅ REAL PDF EXPORT
      if (type === "pdf") {
        const doc = new jsPDF()

        doc.setFontSize(16)
        doc.text("Report Summary", 20, 20)

        doc.setFontSize(12)
        doc.text(`Total Records: ${uploadedData.length}`, 20, 40)
        doc.text(
          `Total Demand: ${uploadedData.reduce((s, d) => s + d.value, 0)}`,
          20,
          50
        )

        let y = 70
        doc.text("Data:", 20, y)
        y += 10

        uploadedData.forEach((d, i) => {
          if (y > 280) {
            doc.addPage()
            y = 20
          }
          doc.text(`${i + 1}. ${d.name} - ${d.value}`, 20, y)
          y += 10
        })

        doc.save("report.pdf")
      }

      setGenerating(null)

    }, 1000)
  }

  const totalRecords = uploadedData.length
  const totalDemand = uploadedData.reduce((sum, d) => sum + (d.value || 0), 0)

  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <PageHeader title="Reports" subtitle="Generate, archive, and revisit your forecasts" />

      <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:'24px' }}>

        {/* SUMMARY */}
        {uploadedData.length > 0 && (
          <div style={{
            background:'var(--bg-card)',
            border:'1px solid var(--border)',
            borderRadius:'16px',
            padding:'20px'
          }}>
            <p style={{ color:'var(--text-secondary)', fontSize:'14px' }}>
              Total Records: <strong>{totalRecords}</strong>
            </p>
            <p style={{ color:'var(--text-secondary)', fontSize:'14px' }}>
              Total Demand: <strong>{totalDemand}</strong>
            </p>
          </div>
        )}

        {/* GENERATE CARDS */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>

          {/* PDF */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <h3>Forecast report</h3>
            <button
              onClick={() => handleGenerate('pdf')}
              disabled={generating === 'pdf'}
            >
              {generating === 'pdf' ? 'Generating…' : 'Generate PDF'}
            </button>
          </div>

          {/* EXCEL */}
          <div style={{ background:'var(--bg-card)', borderRadius:'20px', padding:'28px', border:'1px solid var(--border)' }}>
            <h3>Inventory export</h3>
            <button
              onClick={() => handleGenerate('excel')}
              disabled={generating === 'excel'}
            >
              {generating === 'excel' ? 'Generating…' : 'Generate Excel'}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}