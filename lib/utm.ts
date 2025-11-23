/**
 * UTM Tracking Utility
 * Adds UTM parameters to external links for analytics tracking
 */

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * Adds UTM parameters to a URL
 * @param url - The original URL
 * @param params - UTM parameters to add
 * @returns URL with UTM parameters
 */
export function addUTMParams(url: string, params: UTMParams): string {
  if (!url || typeof url !== 'string') return url

  try {
    const urlObj = new URL(url)
    
    // Add UTM parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlObj.searchParams.set(key, value)
      }
    })

    return urlObj.toString()
  } catch (error) {
    // If URL is invalid, return original
    console.warn('Invalid URL for UTM tracking:', url)
    return url
  }
}

/**
 * Gets UTM parameters from current page URL
 * Useful for preserving UTM parameters across navigation
 */
export function getUTMParamsFromURL(): UTMParams {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const utmParams: UTMParams = {}

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ]

  utmKeys.forEach((key) => {
    const value = params.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return utmParams
}

/**
 * Creates a UTM tracking URL for social media links
 * @param url - The original URL
 * @param source - The source (e.g., 'portfolio', 'header', 'footer', 'hero')
 * @param medium - The medium (default: 'social')
 * @param campaign - Optional campaign name
 * @returns URL with UTM parameters
 */
export function trackSocialLink(
  url: string,
  source: string,
  medium: string = 'social',
  campaign?: string
): string {
  const existingParams = getUTMParamsFromURL()
  
  return addUTMParams(url, {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign || 'portfolio-social',
    ...existingParams, // Preserve existing UTM params
  })
}

/**
 * Creates a UTM tracking URL for external project links
 * @param url - The original URL
 * @param projectName - Name of the project
 * @param source - The source (e.g., 'projects-section')
 * @returns URL with UTM parameters
 */
export function trackProjectLink(
  url: string,
  projectName: string,
  source: string = 'projects-section'
): string {
  const existingParams = getUTMParamsFromURL()
  
  return addUTMParams(url, {
    utm_source: source,
    utm_medium: 'referral',
    utm_campaign: 'portfolio-projects',
    utm_content: projectName,
    ...existingParams,
  })
}

/**
 * Checks if a URL is external (different domain)
 */
export function isExternalURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    // Handle relative URLs
    if (url.startsWith('/') || url.startsWith('#')) return false
    
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'https://localhost')
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
    
    return urlObj.hostname !== currentHost && urlObj.hostname !== ''
  } catch {
    return false
  }
}

