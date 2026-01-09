'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslationSafe } from './Header'
import { skillsData, type Technology } from '@/data/skills'

export default function Skills() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use static data instead of API calls
  const technologies = useMemo(() => skillsData[language], [language])

  // Group technologies by category
  const groupedTechs = useMemo(() => {
    const groups: Record<string, Technology[]> = {}
    technologies.forEach((tech) => {
      if (!groups[tech.category]) {
        groups[tech.category] = []
      }
      groups[tech.category].push(tech)
    })
    return groups
  }, [technologies])

  const categories = Object.keys(groupedTechs)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length)
  }

  return (
    <section id="skills" className="section-container bg-slate-950 relative overflow-hidden">
      {/* Beautiful Gradient Wave Transition */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none overflow-hidden z-0">
        <svg className="absolute top-0 left-0 w-full h-full rotate-180" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradientTop1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.6 }} />
            </linearGradient>
            <linearGradient id="waveGradientTop2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,20 720,60 T1440,40 L1440,120 L0,120 Z" fill="url(#waveGradientTop1)" />
          <path d="M0,100 Q360,40 720,80 T1440,60 L1440,120 L0,120 Z" fill="url(#waveGradientTop2)" />
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">{language === 'en' ? 'Skills & Technologies' : 'Veštine & Tehnologije'}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {language === 'en' ? 'Technologies I work with to bring ideas to life' : 'Tehnologije sa kojima radim da oživim ideje'}
          </p>
        </motion.div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setCurrentIndex(index)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {categories.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-all duration-300"
                aria-label="Previous category"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 flex items-center justify-center text-white hover:bg-slate-700 transition-all duration-300"
                aria-label="Next category"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Slider Content */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `-${currentIndex * 100}%`,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {categories.map((category) => (
                <div
                  key={category}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedTechs[category].map((tech, index) => (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-5 text-center hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300 cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="flex items-center justify-center mb-3 h-14 group-hover:scale-110 transition-transform duration-300">
                          {tech.icon.startsWith('http') || tech.icon.startsWith('/') ? (
                            <Image 
                              src={tech.icon} 
                              alt={tech.name} 
                              width={48} 
                              height={48} 
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <span className="text-3xl">{tech.icon}</span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {tech.name}
                        </h3>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          {categories.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-blue-500 w-8' : 'bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
