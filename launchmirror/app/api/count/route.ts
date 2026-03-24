import { NextResponse } from 'next/server'
import { getAnalysisCount } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const count = await getAnalysisCount()
    return NextResponse.json({ count }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ count: 0 }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
