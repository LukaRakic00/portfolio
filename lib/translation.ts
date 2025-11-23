/**
 * Translation utility using Google Translate unofficial API (@vitalets/google-translate-api)
 * This package provides direct access to Google Translate without API key
 */

export interface TranslationOptions {
  source?: string
  target: string
  text: string
}

export async function translateText(
  text: string,
  targetLang: string = 'sr',
  sourceLang: string = 'en'
): Promise<string> {
  if (!text || text.trim() === '') return text

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source: sourceLang,
        target: targetLang,
      }),
    })

    if (!response.ok) {
      throw new Error('Translation failed')
    }

    const data = await response.json()
    return data.translatedText || text
  } catch (error) {
    console.error('Translation error:', error)
    return text // Return original text on error
  }
}

export async function translateObject(
  obj: Record<string, any>,
  targetLang: string = 'sr',
  sourceLang: string = 'en'
): Promise<Record<string, any>> {
  const translated: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      translated[key] = await translateText(value, targetLang, sourceLang)
    } else if (Array.isArray(value)) {
      translated[key] = await Promise.all(
        value.map((item) =>
          typeof item === 'string'
            ? translateText(item, targetLang, sourceLang)
            : translateObject(item, targetLang, sourceLang)
        )
      )
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateObject(value, targetLang, sourceLang)
    } else {
      translated[key] = value
    }
  }

  return translated
}

