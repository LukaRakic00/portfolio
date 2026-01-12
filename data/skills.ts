export interface Technology {
  id: string
  name: string
  category: string
  icon: string
}

export const skillsData: Record<'en' | 'sr', Technology[]> = {
  en: [
    // Programming Languages
    {
      id: 'java',
      name: 'Java',
      category: 'Programming Language',
      icon: '/icons/java.svg',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programming Language',
      icon: '/icons/JavaScript.svg',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Programming Language',
      icon: '/icons/typescript.svg',
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      category: 'Programming Language',
      icon: '/icons/kotlin.svg',
    },
    // Databases
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Database',
      icon: '/icons/postgresql.svg',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Database',
      icon: '/icons/MySQL.svg',
    },
    {
      id: 'mongodb-atlas',
      name: 'MongoDB',
      category: 'Database',
      icon: '/icons/MongoDB.svg',
    },
    // Frameworks & Libraries
    {
      id: 'react',
      name: 'React.js',
      category: 'Framework',
      icon: '/icons/React.svg',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Framework',
      icon: '/icons/next.svg',
    },
    // Backend
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      category: 'Backend',
      icon: '/icons/Spring.svg',
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Backend',
      icon: '/icons/java.svg',
    },
    {
      id: 'api',
      name: 'REST API',
      category: 'Backend',
      icon: '/images/rest.svg',
    },
    // Cloud & DevOps
    {
      id: 'docker',
      name: 'Docker',
      category: 'Cloud & DevOps',
      icon: '/icons/Docker.svg',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'Cloud & DevOps',
      icon: '/icons/Kubernetes.svg',
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud & DevOps',
      icon: '/images/AWS.svg',
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'Cloud & DevOps',
      icon: '/icons/Vercel.svg',
    },
    // Mobile
    {
      id: 'android',
      name: 'Android',
      category: 'Mobile Development',
      icon: '/icons/android.svg',
    },
  ],
  sr: [
    // Programski Jezici
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programski Jezik',
      icon: '/icons/JavaScript.svg',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Programski Jezik',
      icon: '/icons/typescript.svg',
    },
    {
      id: 'kotlin',
      name: 'Kotlin',
      category: 'Programski Jezik',
      icon: '/icons/kotlin.svg',
    },
    // Baze Podataka
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Baza Podataka',
      icon: '/icons/postgresql.svg',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Baza Podataka',
      icon: '/icons/MySQL.svg',
    },
    {
      id: 'mongodb-atlas',
      name: 'MongoDB',
      category: 'Baza Podataka',
      icon: '/icons/database-svgrepo-com.svg',
    },
    // Framework-i i Biblioteke
    {
      id: 'react',
      name: 'React.js',
      category: 'Framework',
      icon: '/icons/React.svg',
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'Framework',
      icon: '/icons/next.svg',
    },
    // Backend
    {
      id: 'spring-boot',
      name: 'Spring Boot',
      category: 'Backend',
      icon: '/icons/java2.svg',
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Backend',
      icon: '/icons/java.svg',
    },
    {
      id: 'api',
      name: 'REST API',
      category: 'Backend',
      icon: '/images/rest.svg',
    },
    // Cloud & DevOps
    {
      id: 'docker',
      name: 'Docker',
      category: 'Cloud & DevOps',
      icon: '/icons/Docker.svg',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      category: 'Cloud & DevOps',
      icon: '/icons/Kubernetes.svg',
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud & DevOps',
      icon: '/images/AWS.svg',
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'Cloud & DevOps',
      icon: '/icons/Vercel.svg',
    },
    // Mobilni Razvoj
    {
      id: 'android',
      name: 'Android',
      category: 'Mobilni Razvoj',
      icon: '/icons/android.svg',
    },
  ],
}

