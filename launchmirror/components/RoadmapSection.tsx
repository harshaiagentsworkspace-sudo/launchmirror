'use client'

import { ReactNode } from 'react'

interface RoadmapSectionProps {
  number: string | number
  title: string
  children: ReactNode
}

export default function RoadmapSection({ number, title, children }: RoadmapSectionProps) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: '#2a1425',
        boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
            boxShadow: '0 0 12px rgba(124,58,237,0.4)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {number}
        </span>
        <h2
          className="text-xl font-bold text-[#fdd8ef]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}
