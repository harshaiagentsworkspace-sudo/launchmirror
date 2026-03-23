'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ViabilityMeterProps {
  score: number
  size?: number
}

function getScoreColor(score: number) {
  if (score > 65) return '#4edea3'
  if (score >= 40) return '#f59e0b'
  return '#ffb4ab'
}

function getScoreGlow(score: number) {
  if (score > 65) return 'rgba(78, 222, 163, 0.4)'
  if (score >= 40) return 'rgba(245, 158, 11, 0.4)'
  return 'rgba(255, 180, 171, 0.4)'
}

export default function ViabilityMeter({ score, size = 200 }: ViabilityMeterProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const [animatedScore, setAnimatedScore] = useState(0)

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const color = getScoreColor(score)
  const glow = getScoreGlow(score)

  const targetOffset = circumference - (score / 100) * circumference
  const currentOffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion) {
      setAnimatedScore(score)
      return
    }
    let start: number | null = null
    const duration = 1400
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, score, prefersReducedMotion])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ filter: `drop-shadow(0 0 16px ${glow})` }}>
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background track */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#2a1425"
            strokeWidth="12"
            fill="none"
          />

          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={prefersReducedMotion ? targetOffset : currentOffset}
            style={{
              transformOrigin: '100px 100px',
              transform: 'rotate(-90deg)',
              filter: `url(#glow-filter)`,
              transition: prefersReducedMotion ? 'none' : undefined,
            }}
          />

          {/* Score number */}
          <text
            x="88"
            y="108"
            textAnchor="end"
            fontSize="48"
            fontWeight="700"
            fill="#fdd8ef"
            fontFamily="var(--font-display)"
          >
            {animatedScore}
          </text>
          {/* /100 */}
          <text
            x="112"
            y="108"
            textAnchor="start"
            fontSize="18"
            fontWeight="400"
            fill="#ccc3d8"
            fontFamily="var(--font-body)"
          >
            /100
          </text>
        </svg>
      </div>
      <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
        Viability Score
      </p>
    </div>
  )
}
