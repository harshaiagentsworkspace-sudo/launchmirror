import { NextResponse } from 'next/server'
import { searchMarket } from '@/lib/serper'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ results: [] })
    }
    const results = await searchMarket(query)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
