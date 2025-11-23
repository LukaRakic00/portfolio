'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useTranslationSafe } from './Header'

interface AboutData {
  title: string
  subtitle: string
  paragraphs: string[]
  profileImage: string
}

export default function About() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [imageError, setImageError] = useState(false)
  const [aboutData, setAboutData] = useState<AboutData>({
    title: 'Hello, I\'m Your Name',
    subtitle: 'Passionate developer creating innovative solutions',
    paragraphs: [],
    profileImage: '',
  })

  useEffect(() => {
    fetchAboutData()
  }, [language])

  const fetchAboutData = async () => {
    try {
      const response = await fetch(`/api/data/about?lang=${language}`)
      const data = await response.json()
      setAboutData(data)
    } catch (error) {
      console.error('Error fetching about data:', error)
    }
  }

  return (
    <section id="about" className="section-container bg-slate-950 relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Mouse interaction glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {aboutData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              {!imageError && aboutData.profileImage && aboutData.profileImage.trim() !== '' ? (
                <Image
                  src={aboutData.profileImage}
                  alt="Profile Picture"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <p className="text-slate-400 text-lg">Profile Image</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white">
                {aboutData.title}
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mb-8" />
            </div>
            
            <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-slate-400">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-8 flex gap-4">
              <a href="#contact" className="btn-primary">
                <span>Get In Touch</span>
              </a>
              <a href="#projects" className="btn-outline">
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
