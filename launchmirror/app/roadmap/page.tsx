'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Lightbulb, FileDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import RoadmapSection from '@/components/RoadmapSection'
import { useAnalysis } from '@/lib/context'
import { generateAndDownloadPDF } from '@/lib/pdf-utils'

export default function RoadmapPage() {
  const router = useRouter()
  const { formData, mirrorOutput, roadmapOutput } = useAnalysis()

  useEffect(() => {
    if (!roadmapOutput || !formData) router.replace('/analyze')
  }, [roadmapOutput, formData, router])

  if (!roadmapOutput || !formData || !mirrorOutput) return null

  const { business_model_analysis, ninety_day_roadmap, revenue_strategy, marketing_playbook, automation_opportunities, risk_warnings } = roadmapOutput

  async function handleDownloadPDF() {
    if (!formData || !mirrorOutput || !roadmapOutput) return
    await generateAndDownloadPDF(formData, mirrorOutput, roadmapOutput)
  }

  return (
    <div className="min-h-screen bg-[#200c1c]">
      <Navbar />

      <div className="pt-28 pb-20 px-6 lg:px-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}>
            Your Roadmap
          </span>
          <h1 className="text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Your 90-Day Action Plan
          </h1>
          <p className="text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>Built directly from your Mirror results.</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Section 1 — Business Model */}
          <RoadmapSection number={1} title="Business Model Analysis">
            <div className="grid md:grid-cols-2 gap-6 mb-5">
              <div>
                <h3 className="text-sm font-bold text-[#4edea3] mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Strategic Strengths</h3>
                <ul className="flex flex-col gap-2">
                  {business_model_analysis.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-[#4edea3] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#ffb4ab] mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Critical Weaknesses</h3>
                <ul className="flex flex-col gap-2">
                  {business_model_analysis.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle size={16} className="text-[#ffb4ab] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <Lightbulb size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
                <span className="font-bold text-[#f59e0b]">Blind Spot: </span>
                {business_model_analysis.blind_spot}
              </p>
            </div>
          </RoadmapSection>

          {/* Section 2 — 90-Day Roadmap */}
          <RoadmapSection number={2} title="90-Day Roadmap">
            {/* Month 1 */}
            <h3 className="text-base font-bold text-[#7c3aed] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Month 1</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {(['week1', 'week2', 'week3', 'week4'] as const).map((week, i) => (
                <div key={week} className="rounded-xl p-4" style={{ background: '#3a2334' }}>
                  <p className="text-xs font-bold text-[#7c3aed] mb-1 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>Week {i + 1}</p>
                  <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{ninety_day_roadmap.month1[week]}</p>
                </div>
              ))}
            </div>

            {/* Month 2 */}
            <h3 className="text-base font-bold text-[#7c3aed] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Month 2: <span className="text-[#fdd8ef]">{ninety_day_roadmap.month2.focus}</span>
            </h3>
            <ul className="flex flex-col gap-1.5 mb-6">
              {ninety_day_roadmap.month2.tasks.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="text-[#7c3aed] font-bold">•</span> {t}
                </li>
              ))}
            </ul>

            {/* Month 3 */}
            <h3 className="text-base font-bold text-[#7c3aed] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Month 3: <span className="text-[#fdd8ef]">{ninety_day_roadmap.month3.focus}</span>
            </h3>
            <ul className="flex flex-col gap-1.5">
              {ninety_day_roadmap.month3.tasks.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="text-[#7c3aed] font-bold">•</span> {t}
                </li>
              ))}
            </ul>
          </RoadmapSection>

          {/* Section 3 — Revenue Strategy */}
          <RoadmapSection number={3} title="Revenue Strategy">
            <div className="flex flex-col gap-4">
              {revenue_strategy.map((rs) => {
                const speedLabel = rs.speed_rank === 1 ? 'Fastest Revenue' : rs.speed_rank === 2 ? 'Medium Speed' : 'Slower Build'
                const speedColor = rs.speed_rank === 1 ? '#4edea3' : rs.speed_rank === 2 ? '#f59e0b' : '#ccc3d8'
                return (
                  <div key={rs.speed_rank} className="rounded-xl p-4" style={{ background: '#3a2334' }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)' }}>{rs.speed_rank}</span>
                        <h4 className="text-sm font-bold text-[#fdd8ef]" style={{ fontFamily: 'var(--font-display)' }}>{rs.angle}</h4>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0" style={{ color: speedColor, background: `${speedColor}15`, fontFamily: 'var(--font-display)' }}>{speedLabel}</span>
                    </div>
                    <p className="text-xs text-[rgba(204,195,216,0.6)] uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)' }}>Do this week:</p>
                    <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{rs.action_this_week}</p>
                  </div>
                )
              })}
            </div>
          </RoadmapSection>

          {/* Section 4 — Marketing Playbook */}
          <RoadmapSection number={4} title="Marketing Playbook">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg font-extrabold text-[#fdd8ef] px-4 py-1.5 rounded-xl" style={{ background: 'rgba(124,58,237,0.2)', fontFamily: 'var(--font-display)' }}>
                {marketing_playbook.platform}
              </span>
            </div>
            <p className="text-sm text-[#ccc3d8] mb-4" style={{ fontFamily: 'var(--font-body)' }}>{marketing_playbook.platform_reason}</p>
            <h3 className="text-sm font-bold text-[#fdd8ef] mb-2" style={{ fontFamily: 'var(--font-display)' }}>Content Strategy</h3>
            <p className="text-sm text-[#ccc3d8] mb-5" style={{ fontFamily: 'var(--font-body)' }}>{marketing_playbook.content_strategy}</p>
            <h3 className="text-sm font-bold text-[#fdd8ef] mb-3" style={{ fontFamily: 'var(--font-display)' }}>First 3 Campaigns</h3>
            <div className="flex flex-col gap-2">
              {marketing_playbook.first_three_campaigns.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#3a2334' }}>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)' }}>{i + 1}</span>
                  <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{c}</p>
                </div>
              ))}
            </div>
          </RoadmapSection>

          {/* Section 5 — Automations */}
          <RoadmapSection number={5} title="Top 3 Automations">
            <div className="flex flex-col gap-3">
              {automation_opportunities.map((a) => (
                <div key={a.priority} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#3a2334' }}>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)', boxShadow: '0 0 12px rgba(124,58,237,0.4)' }}>{a.priority}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#fdd8ef]" style={{ fontFamily: 'var(--font-display)' }}>{a.what}</p>
                    <p className="text-xs text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{a.tool}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: a.tool_cost.toLowerCase() === 'free' ? 'rgba(78,222,163,0.15)' : '#3a2334',
                      color: a.tool_cost.toLowerCase() === 'free' ? '#4edea3' : '#ccc3d8',
                      border: a.tool_cost.toLowerCase() === 'free' ? '1px solid rgba(78,222,163,0.3)' : '1px solid rgba(74,68,85,0.2)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {a.tool_cost}
                  </span>
                </div>
              ))}
            </div>
          </RoadmapSection>

          {/* Section 6 — Risk Warnings */}
          <RoadmapSection number={6} title="Risk Warnings">
            <div className="grid md:grid-cols-2 gap-4">
              {risk_warnings.map((r, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{
                    background: '#2a1425',
                    borderLeft: '3px solid #ffb4ab',
                    boxShadow: '0 0 12px rgba(255,180,171,0.1)',
                  }}
                >
                  <p className="text-sm font-bold text-[#ffb4ab] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{r.risk}</p>
                  <p className="text-xs text-[rgba(204,195,216,0.6)] uppercase tracking-wider mb-1" style={{ fontFamily: 'var(--font-body)' }}>How to avoid:</p>
                  <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>{r.mitigation}</p>
                </div>
              ))}
            </div>
          </RoadmapSection>

          {/* Download PDF */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)', fontFamily: 'var(--font-display)' }}
            >
              <FileDown size={18} className="inline mr-2 -mt-0.5" />
              Download Full PDF Report
            </button>
            <p className="text-xs text-[rgba(204,195,216,0.5)]" style={{ fontFamily: 'var(--font-body)' }}>
              Includes Mirror analysis + complete Roadmap
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
