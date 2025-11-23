import Redis from 'ioredis'

let redis: Redis | null = null

export function getRedisClient(): Redis {
  if (!redis) {
    // Ako je postavljen REDIS_URL (Redis Cloud format), koristi ga
    let redisUrl = process.env.REDIS_URL?.trim()
    if (redisUrl) {
      // Ako URL počinje sa "REDIS_URL=", ukloni taj deo (greška u .env fajlu)
      if (redisUrl.startsWith('REDIS_URL=')) {
        redisUrl = redisUrl.substring('REDIS_URL='.length).trim()
      }
      
      // Očisti URL od eventualnih dodatnih karaktera
      let cleanUrl = redisUrl.trim()
      
      // Ukloni eventualne dodatne prefikse kao što su " -u " ili slično
      cleanUrl = cleanUrl.replace(/^\s*-u\s+/, '')
      cleanUrl = cleanUrl.replace(/^redis-cli\s+-u\s+/, '')
      cleanUrl = cleanUrl.replace(/^redis-cli\s+/, '')
      cleanUrl = cleanUrl.trim()
      
      // Debug logovanje (samo u development)
      if (process.env.NODE_ENV === 'development') {
        console.log('Redis URL (original):', redisUrl.substring(0, 50))
        console.log('Redis URL (cleaned):', cleanUrl.substring(0, 50))
      }
      
      // Proveri da li URL počinje sa redis:// ili rediss://
      if (!cleanUrl || (!cleanUrl.startsWith('redis://') && !cleanUrl.startsWith('rediss://'))) {
        console.error('Invalid REDIS_URL format. Should start with redis:// or rediss://')
        console.error('Original URL:', redisUrl)
        console.error('Cleaned URL:', cleanUrl)
        throw new Error('Invalid REDIS_URL format')
      }
      
      // Ako je rediss://, koristi TLS
      const useTLS = cleanUrl.startsWith('rediss://')
      
      redis = new Redis(cleanUrl, {
        tls: useTLS ? {} : undefined,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000)
          return delay
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
      })
    } else {
      // Inače koristi host/port/password format
      redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined,
        tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000)
          return delay
        },
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000,
      })
    }

    redis.on('error', (err) => {
      console.error('Redis Client Error:', err)
    })

    redis.on('connect', () => {
      console.log('Redis Client Connected')
    })
  }

  return redis
}

export async function getRedisValue(key: string): Promise<string | null> {
  const client = getRedisClient()
  return await client.get(key)
}

export async function setRedisValue(key: string, value: string): Promise<void> {
  const client = getRedisClient()
  await client.set(key, value)
}

export async function deleteRedisKey(key: string): Promise<void> {
  const client = getRedisClient()
  await client.del(key)
}

export async function getAllKeys(pattern: string): Promise<string[]> {
  const client = getRedisClient()
  return await client.keys(pattern)
}

export async function getRedisJSON<T>(key: string): Promise<T | null> {
  const value = await getRedisValue(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export async function setRedisJSON(key: string, value: any): Promise<void> {
  await setRedisValue(key, JSON.stringify(value))
}

/**
 * Get Redis key with language prefix
 * Format: {key}:{lang} (e.g., hero:en, hero:sr)
 */
export function getLangKey(key: string, lang: string = 'en'): string {
  return `${key}:${lang}`
}

/**
 * Get JSON from Redis with language support
 */
export async function getRedisJSONLang<T>(key: string, lang: string = 'en'): Promise<T | null> {
  const langKey = getLangKey(key, lang)
  return await getRedisJSON<T>(langKey)
}

/**
 * Set JSON to Redis with language support
 */
export async function setRedisJSONLang(key: string, value: any, lang: string = 'en'): Promise<void> {
  const langKey = getLangKey(key, lang)
  await setRedisJSON(langKey, value)
}

/**
 * Set JSON to Redis for both languages (en and sr)
 * Automatically translates to Serbian
 */
export async function setRedisJSONBothLanguages(key: string, value: any): Promise<void> {
  console.log(`[Translation] Saving ${key} in English...`)
  
  // Save English version
  await setRedisJSONLang(key, value, 'en')
  console.log(`[Translation] ✓ English version saved for ${key}`)
  
  // Translate and save Serbian version
  try {
    console.log(`[Translation] Translating ${key} to Serbian using Google Translate...`)
    const { translate } = await import('@vitalets/google-translate-api')
    const translatedValue = await translateObject(value, translate)
    
    console.log(`[Translation] ✓ Translation completed for ${key}, saving Serbian version...`)
    await setRedisJSONLang(key, translatedValue, 'sr')
    console.log(`[Translation] ✓ Serbian version saved for ${key}`)
  } catch (error: any) {
    console.error(`[Translation] ✗ Error translating ${key} to Serbian:`, error.message)
    // If translation fails, save English version as fallback
    console.log(`[Translation] Saving English version as fallback for ${key}:sr`)
    await setRedisJSONLang(key, value, 'sr')
  }
}

/**
 * Delay function for rate limiting
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Translate an object recursively with rate limiting
 */
async function translateObject(obj: any, translateFn: any): Promise<any> {
  if (typeof obj === 'string' && obj.trim() !== '') {
    try {
      // Add delay to avoid rate limiting (500ms between requests)
      await delay(500)
      const result = await translateFn(obj, { from: 'en', to: 'sr' })
      return result.text || obj
    } catch (error: any) {
      // If rate limited, wait longer and retry once
      if (error.name === 'TooManyRequestsError' || error.message?.includes('Too Many Requests')) {
        console.warn('Rate limited, waiting 5 seconds before retry...')
        await delay(5000)
        try {
          const result = await translateFn(obj, { from: 'en', to: 'sr' })
          return result.text || obj
        } catch (retryError) {
          console.error('Translation retry failed for text:', obj, retryError)
          return obj
        }
      }
      console.error('Translation error for text:', obj, error)
      return obj
    }
  } else if (Array.isArray(obj)) {
    // Process array items sequentially to avoid rate limiting
    const translated: any[] = []
    for (const item of obj) {
      translated.push(await translateObject(item, translateFn))
    }
    return translated
  } else if (obj !== null && typeof obj === 'object') {
    const translated: any = {}
    for (const [key, value] of Object.entries(obj)) {
      // Skip translation for certain keys (URLs, IDs, etc.)
      if (['id', 'url', 'link', 'image', 'icon', 'cvUrl', 'profileImage', 'gradient', 'firstName', 'lastName'].includes(key)) {
        translated[key] = value
      } else {
        translated[key] = await translateObject(value, translateFn)
      }
    }
    return translated
  }
  return obj
}

