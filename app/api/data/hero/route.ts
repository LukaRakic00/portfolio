import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let hero = await getRedisJSONLang('hero', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!hero) {
      hero = await getRedisJSONLang('hero', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!hero) {
      hero = await getRedisJSON('hero')
    }
    
    // Final fallback to default values
    if (!hero) {
      hero = {
        firstName: 'Ime',
        lastName: 'Prezime',
        title: 'Full Stack Developer',
        subtitle: 'Creating Digital Experiences',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        cvUrl: '/cv-placeholder.pdf',
      }
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

