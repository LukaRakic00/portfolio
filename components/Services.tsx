'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Image from 'next/image'
import { useTranslationSafe } from './Header'
import { servicesData, type Service } from '@/data/services'

export default function Services() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Use static data instead of API calls
  const currentServicesData = useMemo(() => servicesData[language], [language])

  return (
    <section id="services" className="section-container bg-slate-950 relative overflow-hidden group">
      {/* Beautiful Gradient Wave Transition - Top */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none overflow-hidden z-0">
        <svg className="absolute top-0 left-0 w-full h-full rotate-180" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradientServicesTop1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.6 }} />
            </linearGradient>
            <linearGradient id="waveGradientServicesTop2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,20 720,60 T1440,40 L1440,120 L0,120 Z" fill="url(#waveGradientServicesTop1)" />
          <path d="M0,100 Q360,40 720,80 T1440,60 L1440,120 L0,120 Z" fill="url(#waveGradientServicesTop2)" />
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Mouse interaction glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="section-title">{currentServicesData.title}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {currentServicesData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServicesData.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
      
      {/* Beautiful Gradient Wave Transition - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden z-0">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradientServicesBottom1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.6 }} />
            </linearGradient>
            <linearGradient id="waveGradientServicesBottom2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,20 720,60 T1440,40 L1440,120 L0,120 Z" fill="url(#waveGradientServicesBottom1)" />
          <path d="M0,100 Q360,40 720,80 T1440,60 L1440,120 L0,120 Z" fill="url(#waveGradientServicesBottom2)" />
        </svg>
      </div>
    </section>
  )
}

function ServiceCard({ service, index, isInView }: { service: Service; index: number; isInView: boolean }) {
  // Icon mapping for each service
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'android-development':
        return '/icons/android02.svg'
      case 'full-stack-development':
      case 'web-development':
        return '/icons/web.svg'
      case 'database-development':
        return '/icons/database.svg'
      default:
        return null
    }
  }

  const iconPath = getServiceIcon(service.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${service.gradient.split(' ')[1]} 0%, ${service.gradient.split(' ')[3]} 100%)`
        }}
      />
      
      <div className="relative card overflow-hidden h-full flex flex-col">
        {/* Image placeholder - will be replaced when images are added */}
        <div className={`relative w-full h-36 overflow-hidden bg-gradient-to-br ${service.gradient}`}>
          {service.image ? (
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
              <div className="text-center text-white/90 relative z-10">
                {iconPath ? (
                  <div className="w-20 h-20 mb-2 opacity-90 group-hover:scale-110 transition-transform duration-300 relative">
                    <Image
                      src={iconPath}
                      alt={service.title}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                ) : (
                  <div className="text-5xl mb-2 opacity-90 group-hover:scale-110 transition-transform duration-300">
                    💼
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-black text-white mb-3 group-hover:text-gradient transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-slate-400 leading-relaxed flex-1 text-sm">
            {service.description}
          </p>
          
          {/* Decorative gradient line */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-500 rounded-full`} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
