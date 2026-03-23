'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import MirrorCard from '@/components/MirrorCard'
import ViabilityMeter from '@/components/ViabilityMeter'
import LoadingState from '@/components/LoadingState'
import { useAnalysis } from '@/lib/context'
import type { RoadmapOutput } from '@/types'

function ProbabilityBar({ label, value, explanation, color }: { label: string; value: number; explanation: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref}>
      <MirrorCard className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-[#fdd8ef]" style={{ fontFamily: 'var(--font-display)' }}>{label}</span>
          <span className="text-2xl font-extrabold" style={{ color, fontFamily: 'var(--font-display)' }}>{value}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1b0717] overflow-hidden">
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            initial={{ width: '0%' }}
            animate={inView || prefersReducedMotion ? { width: `${value}%` } : { width: '0%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{explanation}</p>
      </MirrorCard>
    </div>
  )
}

export default function MirrorPage() {
  const router = useRouter()
  const { formData, mirrorOutput, setRoadmapOutput } = useAnalysis()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mirrorOutput) router.replace('/analyze')
  }, [mirrorOutput, router])

  if (!mirrorOutput || !formData) return null

  const trendBadge = () => {
    if (mirrorOutput.market_trend === 'up')
      return <span className="flex items-center gap-1.5 text-xs font-bold text-[#4edea3] px-3 py-1 rounded-full" style={{ background: 'rgba(78,222,163,0.1)', border: '1px solid rgba(78,222,163,0.2)' }}><TrendingUp size={12} /> Growing</span>
    if (mirrorOutput.market_trend === 'flat')
      return <span className="flex items-center gap-1.5 text-xs font-bold text-[#f59e0b] px-3 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}><Minus size={12} /> Stable</span>
    return <span className="flex items-center gap-1.5 text-xs font-bold text-[#ffb4ab] px-3 py-1 rounded-full" style={{ background: 'rgba(255,180,171,0.1)', border: '1px solid rgba(255,180,171,0.2)' }}><TrendingDown size={12} /> Declining</span>
  }

  async function handleGetRoadmap() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, mirrorOutput }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? 'Roadmap generation failed')
      }
      const roadmapOutput: RoadmapOutput = await res.json()
      setRoadmapOutput(roadmapOutput)
      router.push('/roadmap')
    } catch (err) {
      setLoading(false)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-[#200c1c]">
      {loading && <LoadingState />}
      <Navbar />

      <div className="pt-28 pb-20 px-6 lg:px-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}>
            Your Mirror
          </span>
          <h1 className="text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Here&apos;s The Honest Truth
          </h1>
          <p className="text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
            Analysis for: <span className="text-[#fdd8ef] font-semibold">{formData.businessName}</span>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Section A — Viability Score */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="rounded-2xl p-10 flex flex-col items-center gap-4 w-full max-w-xs mx-auto"
              style={{ background: '#2a1425', boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)' }}
            >
              <ViabilityMeter score={mirrorOutput.viability_score} size={180} />
            </div>
            <MirrorCard className="w-full">
              <p className="text-sm text-[#ccc3d8] leading-relaxed text-center" style={{ fontFamily: 'var(--font-body)' }}>
                {mirrorOutput.score_explanation}
              </p>
            </MirrorCard>
          </div>

          {/* Section B — Market Pulse */}
          <MirrorCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#fdd8ef]" style={{ fontFamily: 'var(--font-display)' }}>Market Pulse</h2>
              {trendBadge()}
            </div>
            <p className="text-sm text-[#ccc3d8] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{mirrorOutput.market_pulse}</p>
          </MirrorCard>

          {/* Section C — Brutal Truth */}
          <div>
            <h2 className="text-xl font-bold text-[#fdd8ef] mb-4" style={{ fontFamily: 'var(--font-display)' }}>The Brutal Truth 🔥</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <MirrorCard topBorderColor="#4edea3" glowColor="rgba(78,222,163,0.2)">
                <p className="text-xs font-bold text-[#4edea3] mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>✓ Working For You</p>
                <p className="text-sm text-[#ccc3d8] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{mirrorOutput.brutal_truth_strong}</p>
              </MirrorCard>
              <MirrorCard topBorderColor="#f59e0b" glowColor="rgba(245,158,11,0.2)">
                <p className="text-xs font-bold text-[#f59e0b] mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>⚠ Weak Point</p>
                <p className="text-sm text-[#ccc3d8] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{mirrorOutput.brutal_truth_weak}</p>
              </MirrorCard>
              <MirrorCard topBorderColor="#ffb4ab" glowColor="rgba(255,180,171,0.2)">
                <p className="text-xs font-bold text-[#ffb4ab] mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>✕ Will Kill This</p>
                <p className="text-sm text-[#ccc3d8] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{mirrorOutput.brutal_truth_killer}</p>
              </MirrorCard>
            </div>
          </div>

          {/* Section D — Probability Estimates */}
          <div>
            <h2 className="text-xl font-bold text-[#fdd8ef] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Your Odds</h2>
            <div className="flex flex-col gap-4">
              <ProbabilityBar
                label="First client in 90 days"
                value={mirrorOutput.prob_first_client}
                explanation={mirrorOutput.explanation_first_client}
                color="#4edea3"
              />
              <ProbabilityBar
                label="Reach ₹1L/month"
                value={mirrorOutput.prob_100k_monthly}
                explanation={mirrorOutput.explanation_100k}
                color="#7c3aed"
              />
              <ProbabilityBar
                label="Long-term sustainable"
                value={mirrorOutput.prob_sustainable}
                explanation={mirrorOutput.explanation_sustainable}
                color="#f59e0b"
              />
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="rounded-2xl p-10 flex flex-col items-center text-center gap-5"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.25) 0%, transparent 70%), #2a1425',
              boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
            }}
          >
            <h2 className="text-2xl font-extrabold text-[#fdd8ef]" style={{ fontFamily: 'var(--font-display)' }}>Ready To Act On This?</h2>
            <p className="text-[#ccc3d8] max-w-md" style={{ fontFamily: 'var(--font-body)' }}>
              The data is clear. We&apos;ve mapped out exactly how to move your idea forward.
            </p>
            {error && <p className="text-sm text-[#ffb4ab]">{error}</p>}
            <button
              onClick={handleGetRoadmap}
              disabled={loading}
              className="px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)', fontFamily: 'var(--font-display)' }}
            >
              See Your Full Roadmap →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
