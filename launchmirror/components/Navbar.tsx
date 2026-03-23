'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4"
      style={{
        background: 'rgba(69, 45, 63, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(74, 68, 85, 0.15)',
      }}
    >
      {/* Main row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group min-w-0 shrink">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M14 2L26 14L14 26L2 14L14 2Z" fill="rgba(124,58,237,0.3)" stroke="#7c3aed" strokeWidth="1.5" />
            <path d="M14 6L22 14L14 22L6 14L14 6Z" fill="rgba(124,58,237,0.5)" stroke="#a78bfa" strokeWidth="1" />
            <circle cx="14" cy="14" r="3" fill="#fdd8ef" />
          </svg>
          <span
            className="text-sm md:text-lg font-bold tracking-tight text-[#fdd8ef] truncate"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            LaunchMirror
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-150 relative group"
              style={{
                color: pathname === link.href ? '#fdd8ef' : '#ccc3d8',
                fontFamily: 'var(--font-body)',
              }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-200"
                style={{ background: '#fdd8ef' }}
              />
            </Link>
          ))}
          <Link
            href="/analyze"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:shadow-[0_0_16px_rgba(124,58,237,0.4)] whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)', fontFamily: 'var(--font-display)' }}
          >
            Analyze My Business
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-lg text-[#ccc3d8] hover:text-[#fdd8ef] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden mt-3 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(69,45,63,0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(74,68,85,0.2)',
          }}
        >
          <div className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-5 py-3 text-sm font-medium transition-colors duration-150 hover:bg-[rgba(124,58,237,0.1)]"
                style={{
                  color: pathname === link.href ? '#fdd8ef' : '#ccc3d8',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pb-3 pt-1">
              <Link
                href="/analyze"
                onClick={() => setOpen(false)}
                className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #7645e0)', fontFamily: 'var(--font-display)' }}
              >
                Analyze My Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
