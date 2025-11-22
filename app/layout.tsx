import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Moderni portfolio sajt - Full Stack Developer sa iskustvom u Next.js, React, Node.js i više tehnologija.',
  keywords: ['portfolio', 'developer', 'full stack', 'next.js', 'react', 'web development'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio | Full Stack Developer',
    description: 'Moderni portfolio sajt - Full Stack Developer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

