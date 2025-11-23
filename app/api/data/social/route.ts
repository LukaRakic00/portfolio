import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let social = await getRedisJSONLang('social', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!social) {
      social = await getRedisJSONLang('social', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!social) {
      social = await getRedisJSON('social')
    }
    
    // Final fallback to default values
    if (!social) {
      social = {
        linkedin: { url: 'https://linkedin.com', icon: '💼' },
        researchgate: { url: 'https://researchgate.net', icon: '🔬' },
      }
    }

    return NextResponse.json(social)
  } catch (error) {
    console.error('Error fetching social:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

