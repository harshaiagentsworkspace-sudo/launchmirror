import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About — LaunchMirror',
  description: 'LaunchMirror is a free AI-powered business validator built for Indian founders who want brutal honesty, not validation.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#200c1c] overflow-x-hidden">
      <Navbar />

      {/* ——— HERO ——— */}
      <section
        className="pt-32 pb-16 md:pb-24 px-6 lg:px-20 text-center relative overflow-hidden"
      >
        {/* Background image — very subtle */}
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35, zIndex: 0 }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(32,12,28,0.4) 0%, rgba(32,12,28,0.75) 100%)',
            zIndex: 1,
          }}
        />

        {/* Purple radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.35) 0%, transparent 65%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-5" style={{ zIndex: 2 }}>
          <span
            className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}
          >
            About LaunchMirror
          </span>
          <h1
            className="text-3xl md:text-5xl font-extrabold text-[#fdd8ef] leading-[1.1] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Built For Founders Who Want Truth, Not Validation.
          </h1>
          <p
            className="text-base md:text-lg text-[#ccc3d8] leading-relaxed max-w-2xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Most tools tell you what you want to hear. LaunchMirror tells you what you need to
            know — before you waste months building the wrong thing.
          </p>
        </div>
      </section>

      {/* ——— WHAT IS LAUNCHMIRROR ——— */}
      <section className="py-12 md:py-20 px-6 lg:px-20 bg-[#200c1c]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-8 md:mb-12"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What Is LaunchMirror?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left — body text */}
            <p
              className="text-[#ccc3d8] text-base leading-[1.75]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              LaunchMirror is a free AI-powered business validator built specifically for Indian
              founders. You fill out a 7-question form about your idea. In 60 seconds, you get a
              viability score calculated from real market data, a brutally honest breakdown of what
              works and what doesn&apos;t, and a week-by-week 90-day action plan tailored to your
              exact situation. No generic advice. No motivational fluff. Just the facts about your
              idea — good and bad.
            </p>

            {/* Right — stats card */}
            <div
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-6"
              style={{
                background: '#2a1425',
                boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
              }}
            >
              {[
                { value: '60 seconds', label: 'To get your full analysis' },
                { value: '7 questions', label: "That's all we need" },
                { value: '100% free', label: 'No login. No credit card.' },
              ].map(({ value, label }) => (
                <div key={value} className="flex flex-col gap-1">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: '#7c3aed', fontFamily: 'var(--font-display)' }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-sm text-[#ccc3d8]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS ——— */}
      <section
        className="py-12 md:py-20 px-6 lg:px-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 65%), #200c1c',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-8 md:mb-10 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Two Stages. One Clear Picture.
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                stage: 'Stage 1 — The Mirror',
                desc: 'Your idea goes through a brutally honest analysis. You get a viability score from 0–100, real market data about your niche in India right now, and 3 direct statements about what\'s strong, what\'s weak, and what will most likely kill your business.',
                accent: '#7c3aed',
              },
              {
                stage: 'Stage 2 — The Roadmap',
                desc: 'Built directly from your Mirror results. Not a generic plan — a specific week-by-week roadmap that addresses your exact weaknesses, picks the right platform for your audience, and gives you 3 revenue angles ranked by speed.',
                accent: '#4edea3',
              },
            ].map(({ stage, desc, accent }) => (
              <div
                key={stage}
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: '#2a1425',
                  boxShadow: '0 10px 30px -10px rgba(124,58,237,0.15)',
                  borderTop: `3px solid ${accent}`,
                }}
              >
                <h3
                  className="text-lg font-bold text-[#fdd8ef] mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stage}
                </h3>
                <p
                  className="text-sm text-[#ccc3d8] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— WHY WE BUILT THIS ——— */}
      <section className="py-12 md:py-20 px-6 lg:px-20 bg-[#200c1c]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Why LaunchMirror Exists
          </h2>
          <div
            className="rounded-2xl p-6 md:p-10"
            style={{
              background: '#2a1425',
              boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
            }}
          >
            <p
              className="text-base text-[#ccc3d8] leading-[1.8]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Most Indian founders fail not because they lack talent or work ethic — they fail
              because nobody told them the truth early enough. Mentors are expensive. Consultants
              are generic. Friends are too polite. LaunchMirror exists to be that brutally honest
              friend who has seen enough businesses succeed and fail to tell you exactly what your
              idea needs — and what it doesn&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section
        className="py-16 md:py-24 px-6 lg:px-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.25) 0%, transparent 65%), #2a1425',
        }}
      >
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready To See The Truth?
          </h2>
          <Link
            href="/analyze"
            className="flex items-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Analyze My Business <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer
        className="py-8 px-6 lg:px-20 text-center"
        style={{ background: '#1b0717', borderTop: '1px solid rgba(74,68,85,0.15)' }}
      >
        <p className="text-xs text-[rgba(204,195,216,0.4)]" style={{ fontFamily: 'var(--font-body)' }}>
          © 2025 LaunchMirror. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
