'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  BarChart2,
  TrendingUp,
  Flame,
  Target,
  Map,
  FileDown,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#200c1c] overflow-x-hidden">
      <Navbar />

      {/* ——— HERO ——— */}
      <section
        className="relative min-h-screen flex items-center pt-16 md:pt-20"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.5) 0%, transparent 65%), radial-gradient(ellipse at 80% 40%, rgba(124,58,237,0.35) 0%, transparent 55%), #200c1c',
        }}
      >
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(204,195,216,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-20 py-10 md:py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="flex flex-col gap-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start">
                <span
                  className="flex items-center gap-2 text-xs font-semibold text-[#a78bfa] px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(124,58,237,0.15)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] inline-block" />
                  AI-Powered Business Validation
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#fdd8ef]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                See The{' '}
                <span
                  style={{
                    background: 'linear-gradient(to right, #7c3aed, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Truth
                </span>{' '}
                About Your Idea Before You Build It.
              </h1>

              {/* Subheading */}
              <p
                className="text-lg text-[#ccc3d8] leading-relaxed max-w-[480px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                LaunchMirror gives Indian founders a brutally honest AI analysis — viability score,
                market reality check, and a 90-day action plan. Free. No fluff.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/analyze"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  Analyze My Business <ArrowRight size={16} />
                </Link>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-[#fdd8ef] transition-all duration-200 hover:bg-[rgba(74,68,85,0.15)]"
                  style={{
                    border: '1px solid rgba(74,68,85,0.3)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  See How It Works
                </a>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-5">
                {['No login required', 'Completely free', 'Results in 60 seconds'].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-[#ccc3d8]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <Check size={12} className="text-[#4edea3]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Preview Card */}
            <div className="flex justify-center lg:justify-center mt-4 md:mt-0">
              <div
                className="relative w-full max-w-sm md:max-w-md rounded-2xl p-4 md:p-6"
                style={{
                  background: 'rgba(69,45,63,0.6)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(74,68,85,0.15)',
                  boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
                }}
              >
                {/* Watermark */}
                <span
                  className="absolute top-3 right-4 text-xs text-[rgba(204,195,216,0.2)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Preview Only
                </span>

                <p
                  className="text-xs text-[#ccc3d8] uppercase tracking-widest mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Your Analysis
                </p>

                {/* Score ring — static preview */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <svg width="90" height="90" viewBox="0 0 200 200" fill="none" className="md:w-[120px] md:h-[120px]">
                      <circle cx="100" cy="100" r="80" stroke="#2a1425" strokeWidth="12" fill="none" />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        stroke="#4edea3"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={502.65}
                        strokeDashoffset={502.65 * (1 - 0.72)}
                        style={{
                          transformOrigin: '100px 100px',
                          transform: 'rotate(-90deg)',
                          filter: 'drop-shadow(0 0 8px rgba(78,222,163,0.5))',
                        }}
                      />
                      <text x="88" y="108" textAnchor="end" fontSize="40" fontWeight="700" fill="#fdd8ef" fontFamily="sans-serif">72</text>
                      <text x="112" y="108" textAnchor="start" fontSize="16" fill="#ccc3d8" fontFamily="sans-serif">/100</text>
                    </svg>
                  </div>
                  <p className="text-xs text-[#ccc3d8] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                    Viability Score
                  </p>
                </div>

                {/* Truth cards */}
                <div className="flex flex-col gap-2 mb-3">
                  <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#2a1425', borderLeft: '3px solid #4edea3' }}>
                    <span className="text-[#4edea3] text-xs font-semibold" style={{ fontFamily: 'var(--font-body)' }}>✓ Strong market timing in India</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#2a1425', borderLeft: '3px solid #f59e0b' }}>
                    <span className="text-[#f59e0b] text-xs font-semibold" style={{ fontFamily: 'var(--font-body)' }}>⚠ No clear differentiation yet</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl" style={{ background: '#2a1425', borderLeft: '3px solid #ffb4ab' }}>
                    <span className="text-[#ffb4ab] text-xs font-semibold" style={{ fontFamily: 'var(--font-body)' }}>✕ Underfunded for this category</span>
                  </div>
                </div>

                {/* Prob bar */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>First client:</span>
                    <span className="text-xs font-bold text-[#4edea3]" style={{ fontFamily: 'var(--font-display)' }}>68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#1b0717]">
                    <div className="h-1.5 rounded-full w-[68%]" style={{ background: '#7c3aed' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— HOW IT WORKS ——— */}
      <section
        id="how-it-works"
        className="py-12 md:py-24 px-6 lg:px-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 65%), #200c1c',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}
            >
              The Process
            </span>
            <h2
              className="text-4xl lg:text-[2.5rem] font-extrabold text-[#fdd8ef] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              From Idea To Clarity In 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 relative">
            {[
              {
                num: '01',
                title: 'Fill The Form',
                desc: 'Answer 7 quick questions about your business idea.',
                icon: <Target size={24} className="text-[#7c3aed]" />,
              },
              {
                num: '02',
                title: 'Face The Mirror',
                desc: 'Get a viability score, market pulse, and the brutal truth.',
                icon: <BarChart2 size={24} className="text-[#7c3aed]" />,
              },
              {
                num: '03',
                title: 'Take The Roadmap',
                desc: 'Receive a week-by-week 90-day action plan.',
                icon: <Map size={24} className="text-[#7c3aed]" />,
              },
            ].map((step, idx) => (
              <div key={step.num} className="relative">
                <div
                  className="rounded-2xl p-5 md:p-8 h-full"
                  style={{
                    background: '#2a1425',
                    boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
                  }}
                >
                  <div
                    className="text-4xl font-extrabold mb-4"
                    style={{ color: 'rgba(124,58,237,0.3)', fontFamily: 'var(--font-display)' }}
                  >
                    {step.num}
                  </div>
                  <div className="mb-4">{step.icon}</div>
                  <h3
                    className="text-xl font-bold text-[#fdd8ef] mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#ccc3d8] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {step.desc}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-[#7c3aed]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— WHAT YOU GET ——— */}
      <section className="py-12 md:py-24 px-6 lg:px-20 bg-[#200c1c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}
            >
              The Output
            </span>
            <h2
              className="text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A Deep Dive Into Reality.
            </h2>
            <p className="text-[#ccc3d8] max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              No fluff. No hype. Here is what you get in your report within 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {[
              { Icon: BarChart2, title: 'Viability Score', desc: 'A 0–100 score from market size, competition, and timing.' },
              { Icon: TrendingUp, title: 'Market Pulse', desc: 'Real-time data on your niche in India right now.' },
              { Icon: Flame, title: 'Brutal Truth', desc: '3 honest statements: strength, weakness, and killer risk.' },
              { Icon: Target, title: 'Probability Estimates', desc: 'Your odds of first client, ₹1L/month, and survival.' },
              { Icon: Map, title: '90-Day Roadmap', desc: 'Week-by-week actions built around your weaknesses.' },
              { Icon: FileDown, title: 'PDF Report', desc: 'Download your full analysis as a professional PDF.' },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: 'rgba(42,20,37,0.8)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 30px -10px rgba(124,58,237,0.15)',
                  border: '1px solid rgba(74,68,85,0.1)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.15)' }}
                >
                  <Icon size={20} className="text-[#7c3aed]" />
                </div>
                <div>
                  <h3
                    className="text-base font-bold text-[#fdd8ef] mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— SAMPLE PREVIEW CTA ——— */}
      <section
        className="py-12 md:py-24 px-6 lg:px-20"
        style={{ background: '#2a1425' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Yours Is Waiting. It Takes 30 Seconds.
            </h2>
            <p className="text-[#ccc3d8]" style={{ fontFamily: 'var(--font-body)' }}>
              No credit card. No signup. Just your specific analysis waiting to be generated.
            </p>
          </div>

          {/* Blurred preview */}
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 10px 30px -10px rgba(124,58,237,0.3)' }}>
            <div
              className="p-6 md:p-8 blur-sm pointer-events-none select-none"
              style={{ background: '#200c1c' }}
            >
              {/* Desktop placeholder blocks */}
              <div className="hidden md:grid grid-cols-3 gap-4 mb-4">
                <div className="h-24 rounded-xl bg-[#2a1425]" />
                <div className="h-24 rounded-xl bg-[#2a1425]" />
                <div className="h-24 rounded-xl bg-[#2a1425]" />
              </div>
              <div className="hidden md:block h-32 rounded-xl bg-[#2a1425] mb-4" />
              <div className="hidden md:block h-20 rounded-xl bg-[#2a1425]" />
              {/* Mobile preview content */}
              <div className="flex flex-col items-center gap-3 md:hidden">
                <div className="flex flex-col items-center">
                  <svg width="80" height="80" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="#2a1425" strokeWidth="12" fill="none" />
                    <circle cx="100" cy="100" r="80" stroke="#4edea3" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={502.65} strokeDashoffset={502.65 * (1 - 0.72)} style={{ transformOrigin: '100px 100px', transform: 'rotate(-90deg)', filter: 'drop-shadow(0 0 8px rgba(78,222,163,0.5))' }} />
                    <text x="85" y="108" textAnchor="end" fontSize="44" fontWeight="700" fill="#fdd8ef" fontFamily="sans-serif">72</text>
                    <text x="108" y="108" textAnchor="start" fontSize="18" fill="#ccc3d8" fontFamily="sans-serif">/100</text>
                  </svg>
                  <p className="text-xs text-[#ccc3d8] mt-1" style={{ fontFamily: 'var(--font-body)' }}>Viability Score</p>
                </div>
                <div className="w-full p-3 rounded-xl" style={{ background: '#2a1425', borderLeft: '3px solid #4edea3' }}>
                  <span className="text-[#4edea3] text-xs font-semibold">✓ Strong market timing in India</span>
                </div>
                <div className="w-full p-3 rounded-xl" style={{ background: '#2a1425', borderLeft: '3px solid #ffb4ab' }}>
                  <span className="text-[#ffb4ab] text-xs font-semibold">✕ Underfunded for this category</span>
                </div>
              </div>
            </div>
            {/* Overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(to bottom, rgba(124,58,237,0.25), rgba(32,12,28,0.8))',
              }}
            >
              <p
                className="text-[#fdd8ef] text-xl font-bold mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Your Mirror is one click away
              </p>
              <Link
                href="/analyze"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)]"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Get Your Free Analysis → <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <footer
        className="py-10 px-6 lg:px-20"
        style={{
          background: '#1b0717',
          borderTop: '1px solid rgba(74,68,85,0.15)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span
              className="text-lg font-bold text-[#fdd8ef]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              LaunchMirror
            </span>
            <span className="text-xs text-[rgba(204,195,216,0.5)]" style={{ fontFamily: 'var(--font-body)' }}>
              Built for Indian founders. Free forever.
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#ccc3d8] hover:text-[#fdd8ef] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>Privacy</a>
            <a href="#" className="text-xs text-[#ccc3d8] hover:text-[#fdd8ef] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>About</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6" style={{ borderTop: '1px solid rgba(74,68,85,0.1)' }}>
          <p className="text-xs text-[rgba(204,195,216,0.4)] text-center" style={{ fontFamily: 'var(--font-body)' }}>
            © 2025 LaunchMirror. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
