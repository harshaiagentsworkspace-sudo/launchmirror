'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: 'rgba(69, 45, 63, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(74, 68, 85, 0.15)',
      }}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 2L26 14L14 26L2 14L14 2Z"
            fill="rgba(124,58,237,0.3)"
            stroke="#7c3aed"
            strokeWidth="1.5"
          />
          <path
            d="M14 6L22 14L14 22L6 14L14 6Z"
            fill="rgba(124,58,237,0.5)"
            stroke="#a78bfa"
            strokeWidth="1"
          />
          <circle cx="14" cy="14" r="3" fill="#fdd8ef" />
        </svg>
        <span
          className="text-lg font-bold tracking-tight text-[#fdd8ef]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          LaunchMirror
        </span>
      </Link>

      <Link
        href="/analyze"
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
          fontFamily: 'var(--font-display)',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.4)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
      >
        Analyze My Business
      </Link>
    </nav>
  )
}
