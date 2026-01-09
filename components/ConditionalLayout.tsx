'use client'

import Header from './Header'
import Footer from './Footer'
import MouseInteraction from './MouseInteraction'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MouseInteraction />
      <main className="min-h-screen relative overflow-x-hidden max-w-full">
        {children}
      </main>
      <Footer />
    </>
  )
}

