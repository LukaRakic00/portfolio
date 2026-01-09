export interface SocialData {
  linkedin: { url: string; icon: string }
  github: { url: string; icon: string }
  researchgate: { url: string; icon: string }
}

export const socialData: Record<'en' | 'sr', SocialData> = {
  en: {
    linkedin: { url: 'https://linkedin.com', icon: '/icons/linkedin.svg' },
    github: { url: 'https://github.com', icon: '/icons/github.svg' },
    researchgate: { url: 'https://researchgate.net', icon: '/icons/researchgate.svg' },
  },
  sr: {
    linkedin: { url: 'https://linkedin.com', icon: '/icons/linkedin.svg' },
    github: { url: 'https://github.com', icon: '/icons/github.svg' },
    researchgate: { url: 'https://researchgate.net', icon: '/icons/researchgate.svg' },
  },
}

