import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let skills = await getRedisJSONLang('skills', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!skills) {
      skills = await getRedisJSONLang('skills', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!skills) {
      skills = await getRedisJSON('skills')
    }
    
    // Final fallback to empty array
    if (!skills) {
      skills = []
    }

    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

