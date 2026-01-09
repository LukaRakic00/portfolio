export interface AboutData {
  title: string
  subtitle: string
  paragraphs: string[]
  profileImage: string
}

export const aboutData: Record<'en' | 'sr', AboutData> = {
  en: {
    title: 'About Me',
    subtitle: 'A professional software engineer',
    paragraphs: [
      'Software Engineer with experience in designing and developing scalable systems using Spring Boot, React/Next.js, TypeScript, and PostgreSQL. Strong background in REST APIs, JWT authentication, WebSockets, and CI/CD with Docker. Focused on clean, optimized code, high performance, excellent user experience, and continuous adoption of new technologies.',
    ],
    profileImage: '',
  },
  sr: {
    title: 'O Meni',
    subtitle: 'Profesionalni softver inženjer',
    paragraphs: [
      'Softver inženjer sa iskustvom u razvoju i arhitekturi skalabilnih sistema (Spring Boot, React/Next.js, TypeScript, PostgreSQL), REST API-ja, JWT autentifikacije, WebSocket-a i CI/CD procesa sa Dockerom. Fokus na čist i optimizovan kod, performanse, vrhunski UX i stalno usvajanje novih tehnologija.',
    ],
    profileImage: '',
  },
}

