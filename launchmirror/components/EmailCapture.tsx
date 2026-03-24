'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  onSuccess: () => void
}

const inputBase: React.CSSProperties = {
  background: '#1b0717',
  border: '1px solid rgba(74,68,85,0.25)',
  borderRadius: '12px',
  color: '#fdd8ef',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
  padding: '12px 16px',
  fontSize: '0.9rem',
}

const inputFocus: React.CSSProperties = {
  ...inputBase,
  borderColor: '#7c3aed',
  boxShadow: '0 0 0 4px rgba(124,58,237,0.15)',
}

export default function EmailCapture({ onSuccess }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  function validate(): string | null {
    if (!name.trim()) return 'Please enter your name'
    if (!email.trim()) return 'Please enter your email'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Please enter a valid email'
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        setLoading(false)
        return
      }
      onSuccess()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.3) 0%, transparent 65%), rgba(32,12,28,0.97)',
      }}
    >
      <div
        className="w-full max-w-[480px] rounded-2xl p-7 md:p-9 flex flex-col gap-5"
        style={{
          background: '#2a1425',
          boxShadow: '0 20px 60px -10px rgba(124,58,237,0.35)',
          border: '1px solid rgba(74,68,85,0.2)',
        }}
      >
        {/* Badge */}
        <span
          className="self-start text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
          style={{
            color: '#7c3aed',
            background: 'rgba(124,58,237,0.12)',
            fontFamily: 'var(--font-display)',
          }}
        >
          One Last Step
        </span>

        {/* Heading */}
        <h2
          className="text-xl md:text-2xl font-extrabold text-[#fdd8ef] leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Where Should We Send Your Results?
        </h2>

        {/* Subtext */}
        <p
          className="text-sm text-[#ccc3d8] leading-relaxed -mt-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Join 2,000+ Indian founders already on the list. Get your Mirror results plus weekly
          insights on building in India.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs uppercase tracking-widest text-[#ccc3d8]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="e.g. Arjun Mehta"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={focusedField === 'name' ? inputFocus : inputBase}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs uppercase tracking-widest text-[#ccc3d8]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Your Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={focusedField === 'email' ? inputFocus : inputBase}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs text-[#ffb4ab] -mt-1"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              'Get My Analysis →'
            )}
          </button>

          {/* Below button note */}
          <p
            className="text-center text-xs text-[rgba(204,195,216,0.45)] -mt-1"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No spam. Unsubscribe anytime.
          </p>
        </form>

        {/* Skip link */}
        <button
          onClick={onSuccess}
          className="text-center text-sm text-[#ccc3d8] hover:text-[#fdd8ef] transition-colors duration-150 -mt-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Skip for now →
        </button>
      </div>
    </div>
  )
}
