import React, { useState, useEffect } from 'react'

/**
 * Error Notification Component
 * Displays error messages with auto-dismiss capability
 */
export default function ErrorNotification({ 
  error, 
  onClose, 
  autoCloseDuration = 5000,
  variant = 'error' // 'error', 'warning', 'info'
}) {
  const [isVisible, setIsVisible] = useState(!!error)

  useEffect(() => {
    if (!error) return
    
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, autoCloseDuration)

    return () => clearTimeout(timer)
  }, [error, autoCloseDuration, onClose])

  if (!isVisible || !error) return null

  const bgColor = {
    error: '#FEE2E2',
    warning: '#FEF3C7',
    info: '#DBEAFE'
  }[variant]

  const borderColor = {
    error: '#FCA5A5',
    warning: '#FCD34D',
    info: '#93C5FD'
  }[variant]

  const textColor = {
    error: '#991B1B',
    warning: '#92400E',
    info: '#1E40AF'
  }[variant]

  const icon = {
    error: '⚠️',
    warning: '⚡',
    info: 'ℹ️'
  }[variant]

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
    }}>
      <span style={{ fontSize: '20px', lineHeight: '1.4' }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          color: textColor,
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5
        }}>
          {error}
        </p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: textColor,
          padding: '0',
          lineHeight: '1'
        }}
      >
        ✕
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
