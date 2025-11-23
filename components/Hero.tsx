'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { trackSocialLink, isExternalURL } from '@/lib/utm'
import InteractiveBackground from './InteractiveBackground'
import TypewriterText from './TypewriterText'
import { useTranslationSafe } from './Header'

interface HeroData {
  firstName: string
  lastName: string
  title: string
  subtitle: string
  description: string
  cvUrl: string
}

interface SocialData {
  linkedin: { url: string; icon: string }
  researchgate: { url: string; icon: string }
}

export default function Hero() {
  const { language } = useTranslationSafe()
  const [heroData, setHeroData] = useState<HeroData>({
    firstName: 'Ime',
    lastName: 'Prezime',
    title: 'Full Stack Developer',
    subtitle: 'Creating Digital Experiences',
    description: '',
    cvUrl: '/cv-placeholder.pdf',
  })
  const [socialData, setSocialData] = useState<SocialData>({
    linkedin: { url: 'https://linkedin.com', icon: '💼' },
    researchgate: { url: 'https://researchgate.net', icon: '🔬' },
  })
  const [showFirstName, setShowFirstName] = useState(false)
  const [showLastName, setShowLastName] = useState(false)

  useEffect(() => {
    fetchHeroData()
    fetchSocialData()
    // Start typewriter effect after a short delay
    const timer = setTimeout(() => {
      setShowFirstName(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [language])

  const fetchHeroData = async () => {
    try {
      const response = await fetch(`/api/data/hero?lang=${language}`)
      const data = await response.json()
      setHeroData(data)
      // Reset typewriter when language changes
      setShowFirstName(false)
      setShowLastName(false)
      setTimeout(() => {
        setShowFirstName(true)
      }, 500)
    } catch (error) {
      console.error('Error fetching hero data:', error)
    }
  }

  const fetchSocialData = async () => {
    try {
      const response = await fetch(`/api/data/social?lang=${language}`)
      const data = await response.json()
      setSocialData(data)
    } catch (error) {
      console.error('Error fetching social data:', error)
    }
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = heroData.cvUrl
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
        <div className="text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight font-mono"
          >
            <div className="block text-white mb-2 min-h-[1.2em]">
              {showFirstName ? (
                <TypewriterText
                  text={heroData.firstName}
                  speed={80}
                  onComplete={() => {
                    setTimeout(() => setShowLastName(true), 300)
                  }}
                />
              ) : (
                <span className="text-blue-400">$&gt; </span>
              )}
            </div>
            {showLastName && (
              <div className="block text-gradient min-h-[1.2em]">
                <TypewriterText text={heroData.lastName} speed={80} />
              </div>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-lg md:text-xl font-semibold text-white font-mono shadow-[0_0_20px_rgba(59,130,246,0.4)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.5)]">
              {heroData.title}
            </span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl mb-6 text-white font-light [text-shadow:_0_2px_20px_rgba(0,0,0,0.8),0_0_10px_rgba(255,255,255,0.3)]"
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-slate-200 leading-relaxed font-light [text-shadow:_0_2px_15px_rgba(0,0,0,0.7),0_0_8px_rgba(255,255,255,0.2)]"
          >
            {heroData.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="#projects" className="btn-primary shadow-[0_0_20px_rgba(59,130,246,0.4)]">
              <span>View My Work</span>
            </Link>
            <button onClick={downloadCV} className="btn-secondary shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              Download CV
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center items-center gap-6 mt-16"
          >
            <a 
              href={isExternalURL(socialData.linkedin.url) ? trackSocialLink(socialData.linkedin.url, 'hero', 'social', 'hero-social') : socialData.linkedin.url} 
              target={isExternalURL(socialData.linkedin.url) ? "_blank" : undefined}
              rel={isExternalURL(socialData.linkedin.url) ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              {socialData.linkedin.icon.startsWith('http') ? (
                <Image src={socialData.linkedin.icon} alt="LinkedIn" width={24} height={24} className="rounded-full" />
              ) : (
                <span>{socialData.linkedin.icon}</span>
              )}
            </a>
            <a 
              href={isExternalURL(socialData.researchgate.url) ? trackSocialLink(socialData.researchgate.url, 'hero', 'social', 'hero-social') : socialData.researchgate.url} 
              target={isExternalURL(socialData.researchgate.url) ? "_blank" : undefined}
              rel={isExternalURL(socialData.researchgate.url) ? "noopener noreferrer" : undefined}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
            >
              {socialData.researchgate.icon.startsWith('http') ? (
                <Image src={socialData.researchgate.icon} alt="ResearchGate" width={24} height={24} className="rounded-full" />
              ) : (
                <span>{socialData.researchgate.icon}</span>
              )}
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
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
