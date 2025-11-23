import { NextRequest, NextResponse } from 'next/server'
import { getRedisJSONLang, getRedisJSON } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    // Get language from query parameter or default to 'en'
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    
    // Try to get language-specific data, fallback to default if not found
    let about = await getRedisJSONLang('about', lang)
    
    // If language-specific data doesn't exist, try English as fallback
    if (!about) {
      about = await getRedisJSONLang('about', 'en')
    }
    
    // If still no data, try old format (without language suffix) for backward compatibility
    if (!about) {
      about = await getRedisJSON('about')
    }
    
    // Final fallback to default values
    if (!about) {
      about = {
        title: 'Hello, I\'m Your Name',
        subtitle: 'Passionate developer creating innovative solutions',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        ],
        profileImage: '',
      }
    }

    return NextResponse.json(about)
  } catch (error) {
    console.error('Error fetching about:', error)
    return NextResponse.json(
      { error: 'Error loading data' },
      { status: 500 }
    )
  }
}

