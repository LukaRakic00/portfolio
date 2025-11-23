import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { getRedisJSONLang, setRedisJSONBothLanguages } from '@/lib/redis'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    if (request.method === 'GET') {
      // Admin always sees English version
      const skills = (await getRedisJSONLang<any[]>('skills', 'en')) || []
      return NextResponse.json(skills)
    }

    if (request.method === 'POST') {
      const data = await request.json()
      const skills = ((await getRedisJSONLang<any[]>('skills', 'en')) || []) as any[]
      const newSkill = {
        ...data,
        id: Date.now().toString(),
      }
      skills.push(newSkill)
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('skills', skills)
      return NextResponse.json({ success: true, skill: newSkill })
    }

    if (request.method === 'PUT') {
      const { id, ...data } = await request.json()
      const skills = ((await getRedisJSONLang<any[]>('skills', 'en')) || []) as any[]
      const index = skills.findIndex((s: any) => s.id === id)
      if (index === -1) {
        return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
      }
      skills[index] = { ...skills[index], ...data }
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('skills', skills)
      return NextResponse.json({ success: true })
    }

    if (request.method === 'DELETE') {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
      }
      const skills = ((await getRedisJSONLang<any[]>('skills', 'en')) || []) as any[]
      const filtered = skills.filter((s: any) => s.id !== id)
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('skills', filtered)
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
export const POST = authMiddleware(handler)
export const PUT = authMiddleware(handler)
export const DELETE = authMiddleware(handler)

