import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let projects = await getRedisJSONLang('projects', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!projects) {
      projects = await getRedisJSONLang('projects', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!projects) {
      projects = await getRedisJSON('projects')
    }
    
    // Final fallback to empty array
    if (!projects) {
      projects = []
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

