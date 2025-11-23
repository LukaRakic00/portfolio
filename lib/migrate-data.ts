/**
 * Migration utility to move existing data to language-specific keys
 * Run this once to migrate existing data to the new format
 */

import { getRedisJSON, setRedisJSONLang, getRedisJSONLang } from './redis'
import { setRedisJSONBothLanguages } from './redis'

export async function migrateExistingData() {
  const keys = ['hero', 'about', 'contact', 'projects', 'skills', 'social']
  
  for (const key of keys) {
    try {
      // Check if old format exists (without language suffix)
      const oldData = await getRedisJSON(key)
      
      if (oldData) {
        console.log(`Migrating ${key}...`)
        
        // Check if new format already exists
        const enData = await getRedisJSONLang(key, 'en')
        
        if (!enData) {
          // Migrate old data to new format
          await setRedisJSONBothLanguages(key, oldData)
          console.log(`✓ Migrated ${key} to language-specific format`)
        } else {
          console.log(`- ${key} already migrated`)
        }
      } else {
        console.log(`- No existing data for ${key}`)
      }
    } catch (error) {
      console.error(`Error migrating ${key}:`, error)
    }
  }
}

