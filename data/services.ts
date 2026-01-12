export interface Service {
  id: string
  title: string
  description: string
  image?: string
  gradient: string
}

export interface ServicesData {
  title: string
  subtitle: string
  services: Service[]
}

export const servicesData: Record<'en' | 'sr', ServicesData> = {
  en: {
    title: 'Services',
    subtitle: 'Professional software development solutions tailored to your needs',
    services: [
      {
        id: 'full-stack-development',
        title: 'Full Stack Development',
        description: 'End-to-end web application development from frontend to backend. Building modern, scalable solutions with React, Next.js, Node.js, and cloud technologies. Creating seamless user experiences with robust server-side architecture.',
        gradient: 'from-blue-600 to-indigo-700',
      },
      {
        id: 'database-development',
        title: 'Database Development & Management',
        description: 'Building and managing scalable, secure databases for optimal data storage and performance. Designing efficient data architectures and ensuring data integrity across complex systems.',
        gradient: 'from-purple-600 to-pink-700',
      },
      {
        id: 'android-development',
        title: 'Android Applications',
        description: 'Development of Android applications with intuitive UI, seamless performance, and modern features. Creating native mobile experiences that engage users and deliver exceptional functionality.',
        gradient: 'from-green-600 to-emerald-700',
      },
    ],
  },
  sr: {
    title: 'Usluge',
    subtitle: 'Profesionalna rešenja za razvoj softvera prilagođena vašim potrebama',
    services: [
      {
        id: 'full-stack-development',
        title: 'Full Stack Razvoj',
        description: 'Kompletan razvoj web aplikacija od frontend-a do backend-a. Izgradnja modernih, skalabilnih rešenja sa React, Next.js, Node.js i cloud tehnologijama. Kreiranje besprekornih korisničkih iskustava sa robusnom server-side arhitekturom.',
        gradient: 'from-blue-600 to-indigo-700',
      },
      {
        id: 'database-development',
        title: 'Razvoj & Upravljanje Bazama Podataka',
        description: 'Izgradnja i upravljanje skalabilnim, bezbednim bazama podataka za optimalno skladištenje podataka i performanse. Dizajniranje efikasnih arhitektura podataka i osiguravanje integriteta podataka u složenim sistemima.',
        gradient: 'from-purple-600 to-pink-700',
      },
      {
        id: 'android-development',
        title: 'Android Aplikacije',
        description: 'Razvoj Android aplikacija sa intuitivnim korisničkim interfejsom, besprekornim performansama i modernim funkcionalnostima. Kreiranje nativnih mobilnih iskustava koja angažuju korisnike i pružaju izuzetnu funkcionalnost.',
        gradient: 'from-green-600 to-emerald-700',
      },
    ],
  },
}
