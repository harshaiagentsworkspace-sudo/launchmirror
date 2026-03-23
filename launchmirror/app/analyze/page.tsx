'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import LoadingState from '@/components/LoadingState'
import { useAnalysis } from '@/lib/context'
import type { FormData, MirrorOutput } from '@/types'

const BUSINESS_TYPES: FormData['businessType'][] = [
  'Product', 'Service', 'SaaS', 'Content', 'Agency', 'E-commerce',
]
const STAGES: FormData['currentStage'][] = [
  'Just an idea', 'Just started', 'Some revenue', 'Scaling',
]
const GOALS: FormData['primaryGoal'][] = [
  'Get first clients', 'Increase revenue', 'Build brand', 'Automate operations',
]
const BUDGETS: FormData['monthlyBudget'][] = [
  'Zero', 'Under ₹5K', '₹5K to ₹20K', '₹20K+',
]

interface Errors {
  businessName?: string
  description?: string
  businessType?: string
  targetAudience?: string
  currentStage?: string
  primaryGoal?: string
  monthlyBudget?: string
  general?: string
}

const inputBase = {
  background: '#1b0717',
  border: '1px solid rgba(74,68,85,0.15)',
  borderRadius: '12px',
  color: '#fdd8ef',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

export default function AnalyzePage() {
  const router = useRouter()
  const { setFormData, setMirrorOutput } = useAnalysis()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [charCount, setCharCount] = useState(0)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const [form, setForm] = useState<Partial<FormData>>({
    businessName: '',
    description: '',
    businessType: undefined,
    targetAudience: '',
    currentStage: undefined,
    primaryGoal: undefined,
    monthlyBudget: undefined,
  })

  function validate(): boolean {
    const e: Errors = {}
    if (!form.businessName?.trim()) e.businessName = 'Business name is required'
    if (!form.description?.trim()) e.description = 'Description is required'
    if (!form.businessType) e.businessType = 'Select a business type'
    if (!form.targetAudience?.trim()) e.targetAudience = 'Target audience is required'
    if (!form.currentStage) e.currentStage = 'Select your current stage'
    if (!form.primaryGoal) e.primaryGoal = 'Select your primary goal'
    if (!form.monthlyBudget) e.monthlyBudget = 'Select your monthly budget'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const validForm = form as FormData
    setFormData(validForm)
    setLoading(true)
    setErrors({})

    try {
      // Step 1: Search
      const searchRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `${validForm.description} ${validForm.businessType}` }),
      })
      const { results: searchResults } = await searchRes.json()

      // Step 2: Mirror
      const mirrorRes = await fetch('/api/mirror', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: validForm, searchResults }),
      })

      if (!mirrorRes.ok) {
        const err = await mirrorRes.json()
        throw new Error(err.error ?? 'Mirror analysis failed')
      }

      const mirrorOutput: MirrorOutput = await mirrorRes.json()
      setMirrorOutput(mirrorOutput)
      router.push('/mirror')
    } catch (err) {
      setLoading(false)
      setErrors({ general: err instanceof Error ? err.message : 'Something went wrong. Please try again.' })
    }
  }

  function getFocusStyle(field: string) {
    return focusedField === field
      ? { ...inputBase, borderColor: '#7c3aed', boxShadow: '0 0 0 4px rgba(124,58,237,0.15)' }
      : inputBase
  }

  return (
    <div className="min-h-screen bg-[#200c1c]">
      {loading && <LoadingState />}
      <Navbar />

      <div
        className="pt-28 pb-20 px-6"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.2) 0%, transparent 60%), #200c1c',
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold text-[#7c3aed] tracking-[0.15em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.1)', fontFamily: 'var(--font-display)' }}
          >
            Step 1 of 1
          </span>
          <h1
            className="text-4xl font-extrabold text-[#fdd8ef] tracking-[-0.02em] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Tell Us About Your Idea
          </h1>
          <p className="text-[#ccc3d8] max-w-sm mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            Be specific. The more detail you give, the sharper your Mirror.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="max-w-[580px] mx-auto rounded-2xl p-8 md:p-10"
          style={{
            background: '#2a1425',
            boxShadow: '0 10px 30px -10px rgba(124,58,237,0.2)',
          }}
          noValidate
        >
          {/* Error banner */}
          {errors.general && (
            <div
              className="mb-6 p-4 rounded-xl text-sm text-[#ffb4ab]"
              style={{ background: 'rgba(255,180,171,0.1)', border: '1px solid rgba(255,180,171,0.2)', fontFamily: 'var(--font-body)' }}
            >
              {errors.general}
            </div>
          )}

          {/* Field: Business Name */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Business Name
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              onFocus={() => setFocusedField('businessName')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. DesignRush Studio"
              className="w-full px-4 py-3"
              style={getFocusStyle('businessName')}
            />
            {errors.businessName && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.businessName}</p>
            )}
          </div>

          {/* Field: Description */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Describe Your Idea
            </label>
            <div className="relative">
              <textarea
                rows={4}
                maxLength={500}
                value={form.description}
                onChange={(e) => {
                  setCharCount(e.target.value.length)
                  setForm((f) => ({ ...f, description: e.target.value }))
                }}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                placeholder="Explain what you do, who you serve, and how you make money. 2–3 sentences."
                className="w-full px-4 py-3 resize-none"
                style={getFocusStyle('description')}
              />
              <span
                className={`absolute bottom-3 right-3 text-xs ${charCount >= 480 ? 'text-[#ffb4ab]' : 'text-[rgba(204,195,216,0.4)]'}`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {charCount}/500
              </span>
            </div>
            {errors.description && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.description}</p>
            )}
          </div>

          {/* Field: Business Type */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Business Type
            </label>
            <select
              value={form.businessType ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value as FormData['businessType'] }))}
              onFocus={() => setFocusedField('businessType')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3"
              style={getFocusStyle('businessType')}
            >
              <option value="" disabled>Select business type</option>
              {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
            </select>
            {errors.businessType && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.businessType}</p>
            )}
          </div>

          {/* Field: Target Audience */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Target Audience
            </label>
            <input
              type="text"
              value={form.targetAudience}
              onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
              onFocus={() => setFocusedField('targetAudience')}
              onBlur={() => setFocusedField(null)}
              placeholder="e.g. Freelance designers in Tier 2 Indian cities"
              className="w-full px-4 py-3"
              style={getFocusStyle('targetAudience')}
            />
            {errors.targetAudience && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.targetAudience}</p>
            )}
          </div>

          {/* Field: Current Stage */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Current Stage
            </label>
            <select
              value={form.currentStage ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, currentStage: e.target.value as FormData['currentStage'] }))}
              onFocus={() => setFocusedField('currentStage')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3"
              style={getFocusStyle('currentStage')}
            >
              <option value="" disabled>Select your stage</option>
              {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.currentStage && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.currentStage}</p>
            )}
          </div>

          {/* Field: Primary Goal */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Primary Goal
            </label>
            <select
              value={form.primaryGoal ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, primaryGoal: e.target.value as FormData['primaryGoal'] }))}
              onFocus={() => setFocusedField('primaryGoal')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3"
              style={getFocusStyle('primaryGoal')}
            >
              <option value="" disabled>Select your goal</option>
              {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            {errors.primaryGoal && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.primaryGoal}</p>
            )}
          </div>

          {/* Field: Monthly Budget */}
          <div className="mb-8">
            <label className="block text-xs uppercase tracking-widest text-[#ccc3d8] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
              Monthly Budget
            </label>
            <select
              value={form.monthlyBudget ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, monthlyBudget: e.target.value as FormData['monthlyBudget'] }))}
              onFocus={() => setFocusedField('monthlyBudget')}
              onBlur={() => setFocusedField(null)}
              className="w-full px-4 py-3"
              style={getFocusStyle('monthlyBudget')}
            >
              <option value="" disabled>Select your budget</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            {errors.monthlyBudget && (
              <p className="mt-1 text-xs text-[#ffb4ab]" style={{ fontFamily: 'var(--font-body)' }}>{errors.monthlyBudget}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:shadow-[0_0_24px_rgba(124,58,237,0.4)] disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #7645e0)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {loading ? 'Analyzing...' : 'Show Me The Truth →'}
          </button>

          <p className="mt-4 text-center text-xs text-[rgba(204,195,216,0.5)]" style={{ fontFamily: 'var(--font-body)' }}>
            Your data is never stored. Analysis is generated fresh every time.
          </p>
        </form>
      </div>
    </div>
  )
}
