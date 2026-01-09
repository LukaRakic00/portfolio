export interface HeroData {
  firstName: string
  lastName: string
  title: string
  subtitle: string
  description: string
  cvUrl: string
}

export const heroData: Record<'en' | 'sr', HeroData> = {
  en: {
    firstName: 'HI, MY NAME IS',
    lastName: 'Luka Rakic',
    title: 'Junior Software Engineer',
    subtitle: 'A lifetime programmer who loves software development.',
    description: 'A lifetime programmer who loves software development.',
    cvUrl: '/LUKA_RAKIC_CV.pdf',
  },
  sr: {
    firstName: 'ZDRAVO, MOJE IME JE',
    lastName: 'Luka Rakić',
    title: 'Junior Software Engineer',
    subtitle: 'Programer ceo život koji voli razvoj softvera.',
    description: 'Programer ceo život koji voli razvoj softvera.',
    cvUrl: '/LUKA_RAKIC_CV.pdf',
  },
}

