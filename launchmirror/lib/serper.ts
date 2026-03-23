import type { SearchResult } from '@/types'

export async function searchMarket(query: string): Promise<SearchResult[]> {
  try {
    const constructedQuery = `${query} market India 2025 competitors`
    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: constructedQuery, num: 5 }),
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    const organic: Array<{ title: string; snippet: string }> = data.organic ?? []

    return organic.slice(0, 5).map((item) => ({
      title: item.title ?? '',
      snippet: item.snippet ?? '',
    }))
  } catch {
    return []
  }
}
