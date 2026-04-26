import React from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import KPICard from '../components/KPICard.jsx'
import { DemandTrendsChart, TopPaintColors, SeasonalHeatmap, InventoryRiskChart } from '../components/Charts.jsx'

export default function Dashboard() {
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'0' }}>
      <PageHeader title="Studio Overview" subtitle="Demand pulse across every shade in your catalogue" />
      <div style={{ padding:'32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'24px' }}>
          <KPICard
            label="Total Products"
            value="24"
            sub="Across 5 categories"
            trend="+4.2% vs last quarter"
            trendDir="up"
            icon="⊞"
            iconBg="var(--terracotta-bg)"
          />
          <KPICard
            label="Highest Demand"
            value="Terracotta Red"
            sub="Leading shade this month"
            accent="#C65A3A"
            icon="🎨"
            iconBg="var(--terracotta-bg)"
          />
          <KPICard
            label="Stock Risk Items"
            value="6"
            sub="At or below reorder line"
            trend="-2 items vs last quarter"
            trendDir="down"
            icon="⚠"
            iconBg="var(--terracotta-bg)"
          />
          <KPICard
            label="Forecast Accuracy"
            value="92.4%"
            sub="Trailing 90 days"
            trend="+1.8% vs last quarter"
            trendDir="up"
            icon="◎"
            iconBg="var(--sage-bg)"
          />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'20px', marginBottom:'24px' }}>
          <DemandTrendsChart />
          <TopPaintColors />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:'20px' }}>
          <SeasonalHeatmap />
          <InventoryRiskChart />
        </div>
      </div>
    </div>
  )
}
