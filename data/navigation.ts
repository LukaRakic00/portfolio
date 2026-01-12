export interface NavigationData {
  home: string
  about: string
  services: string
  projects: string
  contact: string
  quickLinks: string
  social: string
  footerDescription: string
  footerCopyright: string
}

export const navigationData: Record<'en' | 'sr', NavigationData> = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    quickLinks: 'Quick Links',
    social: 'Social',
    footerDescription: 'Creating modern digital experiences with passion and innovation.',
    footerCopyright: 'Portfolio. All rights reserved.',
  },
  sr: {
    home: 'Početna',
    about: 'O Meni',
    services: 'Usluge',
    projects: 'Projekti',
    contact: 'Kontakt',
    quickLinks: 'Brzi Linkovi',
    social: 'Društvene Mreže',
    footerDescription: 'Kreiranje modernih digitalnih iskustava sa strašću i inovacijama.',
    footerCopyright: 'Portfolio. Sva prava zadržana.',
  },
}

