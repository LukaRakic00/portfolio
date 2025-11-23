import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { getRedisJSONLang, setRedisJSONBothLanguages } from '@/lib/redis'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    if (request.method === 'GET') {
      // Admin always sees English version
      const hero = await getRedisJSONLang('hero', 'en') || {
        firstName: 'Ime',
        lastName: 'Prezime',
        title: 'Full Stack Developer',
        subtitle: 'Creating Digital Experiences',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        cvUrl: '/cv-placeholder.pdf',
      }
      return NextResponse.json(hero)
    }

    if (request.method === 'PUT') {
      const data = await request.json()
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('hero', data)
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

