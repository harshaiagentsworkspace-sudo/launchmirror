import { NextResponse } from 'next/server'
import { saveToWaitlist } from '@/lib/db'

export const dynamic = 'force-dynamic'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body as { name?: string; email?: string }

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!isValidEmail(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const result = await saveToWaitlist(name.trim(), email.trim().toLowerCase())
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('[/api/waitlist]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
