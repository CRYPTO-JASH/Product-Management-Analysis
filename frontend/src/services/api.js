import axios from 'axios'

const api = axios.create({ baseURL: '/api', timeout: 5000 })

export const login = (email, password) =>
  Promise.resolve({ role: email.includes('customer') ? 'CUSTOMER' : 'RETAILER' })

export const getProducts = () => Promise.resolve([
  { id: 1, name: 'Terracotta Red', sku: 'TRD-001', hex: '#C65A3A', category: 'Interior', stock: 142, reorderLine: 50, status: 'ok' },
  { id: 2, name: 'Sage Mist', sku: 'SGM-002', hex: '#8AA89F', category: 'Interior', stock: 38, reorderLine: 60, status: 'risk' },
  { id: 3, name: 'Ivory White', sku: 'IVW-003', hex: '#F4ECDD', category: 'Exterior', stock: 220, reorderLine: 80, status: 'ok' },
  { id: 4, name: 'Charcoal Smoke', sku: 'CHS-004', hex: '#2E2E2E', category: 'Industrial', stock: 95, reorderLine: 40, status: 'ok' },
  { id: 5, name: 'Sand Dune', sku: 'SND-005', hex: '#E7DDCF', category: 'Exterior', stock: 55, reorderLine: 70, status: 'risk' },
  { id: 6, name: 'Mustard Field', sku: 'MST-006', hex: '#C99A3B', category: 'Specialty', stock: 30, reorderLine: 45, status: 'risk' },
  { id: 7, name: 'Ocean Grey', sku: 'OCG-007', hex: '#7B9EA8', category: 'Industrial', stock: 180, reorderLine: 60, status: 'ok' },
  { id: 8, name: 'Forest Shade', sku: 'FRS-008', hex: '#3D6B4F', category: 'Exterior', stock: 110, reorderLine: 50, status: 'ok' },
])

export const getPredictions = () => Promise.resolve([
  { id: 1, name: 'Terracotta Red', hex: '#C65A3A', predicted: 493, confidence: 84, suggestedStock: 612, trend: '+13.5%', trendDir: 'up' },
  { id: 2, name: 'Sage Mist', hex: '#8AA89F', predicted: 418, confidence: 79, suggestedStock: 553, trend: '+16.2%', trendDir: 'up' },
  { id: 3, name: 'Ivory White', hex: '#F4ECDD', predicted: 432, confidence: 74, suggestedStock: 527, trend: '+7.4%', trendDir: 'up' },
  { id: 4, name: 'Charcoal Smoke', hex: '#2E2E2E', predicted: 385, confidence: 94, suggestedStock: 490, trend: 'flat', trendDir: 'flat' },
  { id: 5, name: 'Sand Dune', hex: '#E7DDCF', predicted: 365, confidence: 74, suggestedStock: 465, trend: '+7.8%', trendDir: 'up' },
  { id: 6, name: 'Mustard Field', hex: '#C99A3B', predicted: 284, confidence: 86, suggestedStock: 355, trend: '+5.1%', trendDir: 'up' },
  { id: 7, name: 'Ocean Grey', hex: '#7B9EA8', predicted: 307, confidence: 70, suggestedStock: 380, trend: 'flat', trendDir: 'flat' },
])

export const getShades = () => Promise.resolve([
  { id: 1, name: 'Terracotta Red', hex: '#C65A3A', family: 'Warm', mood: 'Bold & Earthy', rooms: ['Living Room', 'Kitchen', 'Accent Wall'] },
  { id: 2, name: 'Sage Mist', hex: '#8AA89F', family: 'Cool', mood: 'Calm & Natural', rooms: ['Bedroom', 'Bathroom', 'Office'] },
  { id: 3, name: 'Ivory White', hex: '#F4ECDD', family: 'Neutral', mood: 'Light & Airy', rooms: ['Any Room', 'Ceiling', 'Trim'] },
  { id: 4, name: 'Charcoal Smoke', hex: '#2E2E2E', family: 'Dark', mood: 'Dramatic & Modern', rooms: ['Feature Wall', 'Study', 'Dining'] },
  { id: 5, name: 'Sand Dune', hex: '#E7DDCF', family: 'Neutral', mood: 'Warm & Serene', rooms: ['Bedroom', 'Hallway', 'Living Room'] },
  { id: 6, name: 'Mustard Field', hex: '#C99A3B', family: 'Warm', mood: 'Cheerful & Vibrant', rooms: ['Kitchen', 'Playroom', 'Accent Wall'] },
  { id: 7, name: 'Ocean Grey', hex: '#7B9EA8', family: 'Cool', mood: 'Fresh & Coastal', rooms: ['Bathroom', 'Laundry', 'Bedroom'] },
  { id: 8, name: 'Forest Shade', hex: '#3D6B4F', family: 'Cool', mood: 'Rich & Grounded', rooms: ['Study', 'Dining', 'Feature Wall'] },
  { id: 9, name: 'Blush Clay', hex: '#D4A090', family: 'Warm', mood: 'Soft & Romantic', rooms: ['Bedroom', 'Nursery', 'Living Room'] },
  { id: 10, name: 'Slate Mist', hex: '#8C9BAA', family: 'Cool', mood: 'Clean & Minimal', rooms: ['Office', 'Bathroom', 'Kitchen'] },
  { id: 11, name: 'Amber Dusk', hex: '#C87941', family: 'Warm', mood: 'Cozy & Rustic', rooms: ['Living Room', 'Kitchen', 'Dining'] },
  { id: 12, name: 'Pale Sage', hex: '#C0D4C8', family: 'Cool', mood: 'Delicate & Fresh', rooms: ['Bedroom', 'Nursery', 'Bathroom'] },
])

export default api
