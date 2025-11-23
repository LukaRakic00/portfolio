import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/middleware'
import { getRedisJSON, setRedisJSONBothLanguages, getRedisJSONLang } from '@/lib/redis'

async function handler(request: NextRequest, user: { username: string }) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }

    const keys = ['hero', 'about', 'contact', 'projects', 'skills', 'social']
    const results: Record<string, { status: string; details?: string }> = {}
    
    console.log('Starting migration with automatic translation to Serbian...')
    
    for (const key of keys) {
      try {
        console.log(`\n[${key}] Checking for existing data...`)
        
        // Check if old format exists (without language suffix)
        const oldData = await getRedisJSON(key)
        
        if (oldData) {
          // Check if new format already exists
          const enData = await getRedisJSONLang(key, 'en')
          const srData = await getRedisJSONLang(key, 'sr')
          
          if (!enData || !srData) {
            console.log(`[${key}] Found old data, migrating and translating to Serbian...`)
            
            // Migrate old data to new format (automatically translates to Serbian)
            await setRedisJSONBothLanguages(key, oldData)
            
            // Verify both languages were saved
            const verifyEn = await getRedisJSONLang(key, 'en')
            const verifySr = await getRedisJSONLang(key, 'sr')
            
            if (verifyEn && verifySr) {
              results[key] = {
                status: 'Migrated successfully',
                details: 'English and Serbian versions saved'
              }
              console.log(`[${key}] ✓ Migration completed - both languages saved`)
            } else {
              results[key] = {
                status: 'Partially migrated',
                details: verifyEn ? 'English saved, Serbian failed' : 'Migration failed'
              }
              console.log(`[${key}] ⚠ Partial migration`)
            }
          } else {
            results[key] = {
              status: 'Already migrated',
              details: 'Both English and Serbian versions exist'
            }
            console.log(`[${key}] - Already migrated`)
          }
        } else {
          results[key] = {
            status: 'No existing data',
            details: 'No data found to migrate'
          }
          console.log(`[${key}] - No existing data`)
        }
      } catch (error: any) {
        results[key] = {
          status: 'Error',
          details: error.message
        }
        console.error(`[${key}] ✗ Error:`, error.message)
      }
    }

    console.log('\nMigration completed!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Migration completed with automatic translation to Serbian',
      results 
    })
  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: error.message || 'Migration failed' },
      { status: 500 }
    )
  }
}

export const POST = authMiddleware(handler)

