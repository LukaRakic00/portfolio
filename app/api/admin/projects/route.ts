import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { getRedisJSONLang, setRedisJSONBothLanguages } from '@/lib/redis'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    if (request.method === 'GET') {
      // Admin always sees English version
      const projects = (await getRedisJSONLang<any[]>('projects', 'en')) || []
      return NextResponse.json(projects)
    }

    if (request.method === 'POST') {
      const data = await request.json()
      const projects = ((await getRedisJSONLang<any[]>('projects', 'en')) || []) as any[]
      const newProject = {
        ...data,
        id: Date.now().toString(),
      }
      projects.push(newProject)
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('projects', projects)
      return NextResponse.json({ success: true, project: newProject })
    }

    if (request.method === 'PUT') {
      const projectData = await request.json()
      const { id, ...data } = projectData
      const projects = ((await getRedisJSONLang<any[]>('projects', 'en')) || []) as any[]
      const index = projects.findIndex((p: any) => p.id === id)
      
      if (index === -1) {
        // Project doesn't exist, create it (upsert behavior)
        const newProject = {
          ...projectData,
          id: id || Date.now().toString(),
        }
        projects.push(newProject)
      } else {
        // Update existing project
        projects[index] = { ...projects[index], ...data }
      }
      
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('projects', projects)
      return NextResponse.json({ success: true })
    }

    if (request.method === 'DELETE') {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
      }
      const projects = ((await getRedisJSONLang<any[]>('projects', 'en')) || []) as any[]
      const filtered = projects.filter((p: any) => p.id !== id)
      // Save in both languages (en and auto-translated sr)
      await setRedisJSONBothLanguages('projects', filtered)
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

