import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TranslationProvider } from '@/components/TranslationProvider'
import ConditionalLayout from '@/components/ConditionalLayout'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Luka Rakic | Full Stack Developer Portfolio',
    template: '%s | Luka Rakic Portfolio'
  },
  description: 'Moderni portfolio sajt - Full Stack Developer sa iskustvom u Next.js, React, Node.js i više tehnologija. Specijalizovan za kreiranje modernih web aplikacija.',
  keywords: ['portfolio', 'developer', 'full stack', 'next.js', 'react', 'web development', 'Luka Rakic', 'programmer', 'software engineer'],
  authors: [{ name: 'Luka Rakic' }],
  creator: 'Luka Rakic',
  publisher: 'Luka Rakic',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
    siteName: 'Luka Rakic Portfolio',
    title: 'Luka Rakic | Full Stack Developer Portfolio',
    description: 'Moderni portfolio sajt - Full Stack Developer sa iskustvom u Next.js, React, Node.js i više tehnologija.',
    images: [
      {
        url: '/favicon.ico',
        width: 512,
        height: 512,
        alt: 'Luka Rakic Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luka Rakic | Full Stack Developer Portfolio',
    description: 'Moderni portfolio sajt - Full Stack Developer sa iskustvom u Next.js, React, Node.js i više tehnologija.',
    images: ['/favicon.ico'],
    creator: '@yourtwitter',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: 'your-yandex-verification',
    // bing: 'your-bing-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luka Rakic',
    jobTitle: 'Full Stack Developer',
    description: 'Moderni portfolio sajt - Full Stack Developer sa iskustvom u Next.js, React, Node.js i više tehnologija.',
    url: siteUrl,
    sameAs: [
      // Add your social media profiles here
      // 'https://linkedin.com/in/yourprofile',
      // 'https://github.com/yourprofile',
    ],
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Next.js',
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
    ],
  }

  return (
    <html lang="sr" suppressHydrationWarning>
      <body className={inter.className}>
        <StructuredData data={structuredData} />
        <ThemeProvider>
          <TranslationProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

