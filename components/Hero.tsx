'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMemo } from 'react'
import Image from 'next/image'
import { trackSocialLink, isExternalURL } from '@/lib/utm'
import InteractiveBackground from './InteractiveBackground'
import MatrixLogo from './MatrixLogo'
import { useTranslationSafe } from './Header'
import { heroData, type HeroData } from '@/data/hero'
import { socialData, type SocialData } from '@/data/social'

export default function Hero() {
  const { language } = useTranslationSafe()

  // Use static data instead of API calls
  const currentHeroData = useMemo(() => heroData[language], [language])
  const currentSocialData = useMemo(() => socialData[language], [language])

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = currentHeroData.cvUrl
    link.download = 'CV.pdf'
    link.click()
  }

  return (
    <section id="home" className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/40 pointer-events-none z-[5]" />

      <div className="section-container relative z-10 w-full">
        <div className="flex justify-center md:justify-start w-full md:pl-16 lg:pl-24">
          <div className="text-left max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto md:mx-0">
            {/* Small uppercase text */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base uppercase tracking-wider mb-4 font-sans bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            >
              {currentHeroData.firstName}
            </motion.p>

            {/* Large white name */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white font-sans"
            >
              {currentHeroData.lastName}
            </motion.h1>

            {/* Professional title */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl mb-8 text-slate-400 font-semibold"
            >
              {currentHeroData.title}
            </motion.p>
            
            {/* Descriptive text */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl text-white font-light [text-shadow:_0_2px_20px_rgba(0,0,0,0.8),0_0_10px_rgba(255,255,255,0.3)]"
            >
              {currentHeroData.subtitle}
            </motion.p>
            
            {/* Contact and Download CV buttons */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
            >
              <Link 
                href="#contact" 
                className="inline-block px-5 py-2.5 md:px-8 md:py-4 bg-white text-black rounded-full font-medium hover:bg-slate-100 transition-all duration-200 font-sans text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                {language === 'en' ? 'Contact me' : 'Kontaktiraj me'}
              </Link>
              {/* Mobile: Show PNG preview */}
              <a 
                href={language === 'en' ? '/images/LUKA RAKIC - ENGLISH.png' : '/images/LUKA RAKIĆ - SRPSKI.png'}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-block px-5 py-2.5 bg-transparent border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-sans text-sm shadow-lg hover:shadow-xl hover:scale-105"
              >
                {language === 'en' ? 'View CV' : 'Pogledaj CV'}
              </a>
              {/* Desktop: Show HTML CV */}
              <a 
                href={currentHeroData.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-block px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-full font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-sans text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                {language === 'en' ? 'View CV' : 'Pogledaj CV'}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Logo and Social Links - Fixed on right side (hidden on mobile) */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-6"
          >
            {/* Logo */}
            <div className="w-16 h-16 mb-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
              <MatrixLogo />
            </div>
            <a 
              href={isExternalURL(currentSocialData.linkedin.url) ? trackSocialLink(currentSocialData.linkedin.url, 'hero', 'social', 'hero-social') : currentSocialData.linkedin.url} 
              target={isExternalURL(currentSocialData.linkedin.url) ? "_blank" : undefined}
              rel={isExternalURL(currentSocialData.linkedin.url) ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              {(currentSocialData.linkedin.icon.startsWith('http') || currentSocialData.linkedin.icon.startsWith('/')) ? (
                <Image 
                  src={currentSocialData.linkedin.icon} 
                  alt="LinkedIn" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 brightness-0 invert"
                />
              ) : (
                <span>{currentSocialData.linkedin.icon}</span>
              )}
            </a>
            <a 
              href={isExternalURL(currentSocialData.github.url) ? trackSocialLink(currentSocialData.github.url, 'hero', 'social', 'hero-social') : currentSocialData.github.url} 
              target={isExternalURL(currentSocialData.github.url) ? "_blank" : undefined}
              rel={isExternalURL(currentSocialData.github.url) ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              {(currentSocialData.github.icon.startsWith('http') || currentSocialData.github.icon.startsWith('/')) ? (
                <Image 
                  src={currentSocialData.github.icon} 
                  alt="GitHub" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 brightness-0 invert"
                />
              ) : (
                <span>{currentSocialData.github.icon}</span>
              )}
            </a>
            <a 
              href={isExternalURL(currentSocialData.researchgate.url) ? trackSocialLink(currentSocialData.researchgate.url, 'hero', 'social', 'hero-social') : currentSocialData.researchgate.url} 
              target={isExternalURL(currentSocialData.researchgate.url) ? "_blank" : undefined}
              rel={isExternalURL(currentSocialData.researchgate.url) ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              {(currentSocialData.researchgate.icon.startsWith('http') || currentSocialData.researchgate.icon.startsWith('/')) ? (
                <Image 
                  src={currentSocialData.researchgate.icon} 
                  alt="ResearchGate" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 brightness-0 invert"
                />
              ) : (
                <span>{currentSocialData.researchgate.icon}</span>
              )}
            </a>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <Link href="#about" className="flex flex-col items-center text-white/50 hover:text-white transition-colors duration-300">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/50 rounded-full"
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
