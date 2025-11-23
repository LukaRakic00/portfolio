'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { trackSocialLink, isExternalURL } from '@/lib/utm'
import MatrixLogo from './MatrixLogo'
import { useTranslationSafe } from './Header'

interface SocialData {
  linkedin: { url: string; icon: string }
  researchgate: { url: string; icon: string }
}

export default function Footer() {
  const { language } = useTranslationSafe()
  const [socialData, setSocialData] = useState<SocialData>({
    linkedin: { url: 'https://linkedin.com', icon: '💼' },
    researchgate: { url: 'https://researchgate.net', icon: '🔬' },
  })

  useEffect(() => {
    fetchSocialData()
  }, [language])

  const fetchSocialData = async () => {
    try {
      const response = await fetch(`/api/data/social?lang=${language}`)
      const data = await response.json()
      setSocialData(data)
    } catch (error) {
      console.error('Error fetching social data:', error)
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', href: socialData.linkedin.url, icon: socialData.linkedin.icon },
    { name: 'ResearchGate', href: socialData.researchgate.url, icon: socialData.researchgate.icon },
  ]
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="h-24 w-24 md:h-32 md:w-32 mb-4">
              <MatrixLogo />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Creating modern digital experiences with passion and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group">
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 mr-0 group-hover:mr-2 transition-all duration-300" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Social</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const href = isExternalURL(link.href) 
                  ? trackSocialLink(link.href, 'footer', 'social', 'footer-social')
                  : link.href
                return (
                  <a
                    key={link.name}
                    href={href}
                    target={isExternalURL(link.href) ? "_blank" : undefined}
                    rel={isExternalURL(link.href) ? "noopener noreferrer" : undefined}
                    className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 hover:scale-110 hover:border-white/20 transition-all duration-300"
                    aria-label={link.name}
                    title={link.name}
                  >
                    {link.icon.startsWith('http') ? (
                      <Image src={link.icon} alt={link.name} width={24} height={24} className="rounded-full" />
                    ) : (
                      <span>{link.icon}</span>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
