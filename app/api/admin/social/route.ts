import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { getRedisJSONLang, setRedisJSONBothLanguages } from '@/lib/redis'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    if (request.method === 'GET') {
      // Admin always sees English version
      const social = await getRedisJSONLang('social', 'en') || {
        linkedin: { url: 'https://linkedin.com', icon: '💼' },
        researchgate: { url: 'https://researchgate.net', icon: '🔬' },
      }
      return NextResponse.json(social)
    }

    if (request.method === 'PUT') {
      const data = await request.json()
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('social', data)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error saving data' },
      { status: 500 }
    )
  }
}

export const GET = authMiddleware(handler)
export const PUT = authMiddleware(handler)

