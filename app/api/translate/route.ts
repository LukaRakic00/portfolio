import { NextRequest, NextResponse } from 'next/server'
import { translate } from '@vitalets/google-translate-api'

export async function POST(request: NextRequest) {
  try {
    const { text, source = 'en', target = 'sr' } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // If source and target are the same, return original text
    if (source === target) {
      return NextResponse.json({ translatedText: text })
    }

    // Use Google Translate unofficial API
    const result = await translate(text, {
      from: source,
      to: target,
    })

    return NextResponse.json({
      translatedText: result.text || text,
    })
  } catch (error: any) {
    console.error('Translation error:', error)
    
    // Handle specific Google Translate errors
    if (error.name === 'TooManyRequestsError') {
      return NextResponse.json(
        { error: 'Too many translation requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}

