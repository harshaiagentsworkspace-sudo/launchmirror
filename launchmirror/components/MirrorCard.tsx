'use client'

import { ReactNode } from 'react'

interface MirrorCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  topBorderColor?: string
}

export default function MirrorCard({
  children,
  className = '',
  glowColor,
  topBorderColor,
}: MirrorCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: '#2a1425',
        boxShadow: glowColor
          ? `0 10px 30px -10px rgba(124,58,237,0.2), 0 0 12px ${glowColor}`
          : '0 10px 30px -10px rgba(124,58,237,0.2)',
        borderTop: topBorderColor ? `3px solid ${topBorderColor}` : undefined,
      }}
    >
      {children}
    </div>
  )
}
