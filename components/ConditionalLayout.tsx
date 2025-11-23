'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import MouseInteraction from './MouseInteraction'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <MouseInteraction />}
      <main className="min-h-screen relative overflow-x-hidden max-w-full">
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  )
}

