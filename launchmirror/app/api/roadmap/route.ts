import { NextResponse } from 'next/server'
import { getNvidiaClient } from '@/lib/nvidia'
import { buildRoadmapPrompt, ROADMAP_SYSTEM_PROMPT } from '@/lib/prompts'

export const dynamic = 'force-dynamic'
import type { FormData, MirrorOutput, RoadmapOutput } from '@/types'

function validateRoadmapOutput(data: unknown): data is RoadmapOutput {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>

  const requiredTopLevel: (keyof RoadmapOutput)[] = [
    'business_model_analysis', 'ninety_day_roadmap', 'revenue_strategy',
    'marketing_playbook', 'automation_opportunities', 'risk_warnings',
  ]
  for (const field of requiredTopLevel) {
    if (d[field] === undefined || d[field] === null) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  const bma = d.business_model_analysis as Record<string, unknown>
  if (!Array.isArray(bma.strengths) || !Array.isArray(bma.weaknesses) || !bma.blind_spot) {
    throw new Error('business_model_analysis is malformed')
  }

  const roadmap = d.ninety_day_roadmap as Record<string, unknown>
  if (!roadmap.month1 || !roadmap.month2 || !roadmap.month3) {
    throw new Error('ninety_day_roadmap is malformed')
  }

  if (!Array.isArray(d.revenue_strategy) || (d.revenue_strategy as unknown[]).length === 0) {
    throw new Error('revenue_strategy must be a non-empty array')
  }

  const mp = d.marketing_playbook as Record<string, unknown>
  if (!mp.platform || !mp.platform_reason || !mp.content_strategy || !Array.isArray(mp.first_three_campaigns)) {
    throw new Error('marketing_playbook is malformed')
  }

  if (!Array.isArray(d.automation_opportunities) || !Array.isArray(d.risk_warnings)) {
    throw new Error('automation_opportunities or risk_warnings is malformed')
  }

  return true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { formData, mirrorOutput }: { formData: FormData; mirrorOutput: MirrorOutput } = body

    if (!formData || !mirrorOutput) {
      return NextResponse.json({ error: 'formData and mirrorOutput are required' }, { status: 400 })
    }

    const userPrompt = buildRoadmapPrompt(formData, mirrorOutput)
    const nvidia = getNvidiaClient()

    const completion = await nvidia.chat.completions.create({
      model: 'meta/llama-3.1-70b-instruct',
      temperature: 0.7,
      max_tokens: 3000,
      messages: [
        { role: 'system', content: ROADMAP_SYSTEM_PROMPT },
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

    if (!validateRoadmapOutput(parsed)) {
      throw new Error('AI response missing required fields')
    }

    return NextResponse.json(parsed)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Roadmap generation failed'
    console.error('[/api/roadmap]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
