import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let contact = await getRedisJSONLang('contact', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!contact) {
      contact = await getRedisJSONLang('contact', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!contact) {
      contact = await getRedisJSON('contact')
    }
    
    // Final fallback to default values
    if (!contact) {
      contact = {
        title: 'Get In Touch',
        subtitle: 'Have a project in mind? Let\'s work together to bring it to life',
      }
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

