import { NextResponse } from 'next/server'
import { getNvidiaClient } from '@/lib/nvidia'
import { buildMirrorPrompt, MIRROR_SYSTEM_PROMPT } from '@/lib/prompts'

export const dynamic = 'force-dynamic'
import type { FormData, MirrorOutput, SearchResult } from '@/types'

function validateMirrorOutput(data: unknown): data is MirrorOutput {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  const requiredFields: (keyof MirrorOutput)[] = [
    'viability_score', 'market_pulse', 'market_trend',
    'brutal_truth_strong', 'brutal_truth_weak', 'brutal_truth_killer',
    'prob_first_client', 'prob_100k_monthly', 'prob_sustainable',
    'explanation_first_client', 'explanation_100k', 'explanation_sustainable',
    'score_explanation',
  ]
  for (const field of requiredFields) {
    if (d[field] === undefined || d[field] === null) {
      throw new Error(`Missing required field: ${field}`)
    }
  }
  return true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formData, searchResults }: { formData: FormData; searchResults: SearchResult[] } = body

    if (!formData) {
      return NextResponse.json({ error: 'formData is required' }, { status: 400 })
    }

    const userPrompt = buildMirrorPrompt(formData, searchResults ?? [])
    const nvidia = getNvidiaClient()

    const completion = await nvidia.chat.completions.create({
      model: 'meta/llama-3.1-70b-instruct',
      temperature: 0.7,
      max_tokens: 1500,
      messages: [
        { role: 'system', content: MIRROR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) throw new Error('Empty response from AI model')

    // Strip markdown code fences if present
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    if (!validateMirrorOutput(parsed)) {
      throw new Error('AI response missing required fields')
    }

    return NextResponse.json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Mirror analysis failed'
    console.error('[/api/mirror]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
