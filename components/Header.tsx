'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import MatrixLogo from './MatrixLogo'
import { useTranslation } from './TranslationProvider'
import { socialData } from '@/data/social'
import { trackSocialLink, isExternalURL } from '@/lib/utm'

// Fallback hook for when TranslationProvider is not available
export function useTranslationSafe() {
  try {
    return useTranslation()
  } catch {
    return {
      language: 'en' as const,
      setLanguage: () => {},
      translate: async (text: string) => text,
      t: (text: string) => text,
      translations: {},
      isLoading: false,
    }
  }
}

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, isLoading } = useTranslationSafe()
  
  // Use static data for social links
  const currentSocialData = useMemo(() => socialData[language], [language])
  
  const socialLinks = [
    { name: 'LinkedIn', href: currentSocialData.linkedin.url, icon: currentSocialData.linkedin.icon },
    { name: 'GitHub', href: currentSocialData.github.url, icon: currentSocialData.github.icon },
    { name: 'ResearchGate', href: currentSocialData.researchgate.url, icon: currentSocialData.researchgate.icon },
  ]


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link href="/" className="flex items-center h-16 w-16 md:h-20 md:w-20 hover:opacity-80 transition-opacity duration-300" aria-label="Home">
            <MatrixLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-white font-semibold text-lg transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'sr' : 'en')}
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all duration-300 disabled:opacity-50 ml-4 overflow-hidden"
              aria-label="Toggle language"
              title={language === 'en' ? 'Switch to Serbian' : 'Switch to English'}
            >
              {isLoading ? (
                <span className="text-lg">⟳</span>
              ) : (
                <Image 
                  src="/world.png" 
                  alt="Language toggle" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain"
                />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-6 overflow-hidden bg-slate-950/90 backdrop-blur-xl rounded-2xl mt-2 border border-white/10"
            >
              <div className="flex flex-col space-y-4 px-4 pt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-white font-semibold text-lg transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                  {/* Social Links Mobile */}
                  {socialLinks.map((link) => {
                    const href = isExternalURL(link.href) 
                      ? trackSocialLink(link.href, 'mobile-menu', 'social', 'navbar-social')
                      : link.href
                    return (
                      <a
                        key={link.name}
                        href={href}
                        target={isExternalURL(link.href) ? "_blank" : undefined}
                        rel={isExternalURL(link.href) ? "noopener noreferrer" : undefined}
                        className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300"
                        aria-label={link.name}
                        title={link.name}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {(link.icon.startsWith('http') || link.icon.startsWith('/')) ? (
                          <Image src={link.icon} alt={link.name} width={20} height={20} className="w-5 h-5 brightness-0 invert" />
                        ) : (
                          <span>{link.icon}</span>
                        )}
                      </a>
                    )
                  })}
                  
                  {/* Language Toggle Mobile */}
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'sr' : 'en')}
                    disabled={isLoading}
                    className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300 disabled:opacity-50 overflow-hidden"
                    aria-label="Toggle language"
                    title={language === 'en' ? 'Switch to Serbian' : 'Switch to English'}
                  >
                    {isLoading ? (
                      <span className="text-lg">⟳</span>
                    ) : (
                      <Image 
                        src="/world.png" 
                        alt="Language toggle" 
                        width={20} 
                        height={20} 
                        className="w-5 h-5 object-contain"
                      />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
