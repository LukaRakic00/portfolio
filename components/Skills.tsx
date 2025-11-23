'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslationSafe } from './Header'

interface Technology {
  id: string
  name: string
  category: string
  icon: string
}

export default function Skills() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [technologies, setTechnologies] = useState<Technology[]>([])

  useEffect(() => {
    fetchSkills()
  }, [language])

  const fetchSkills = async () => {
    try {
      const response = await fetch(`/api/data/skills?lang=${language}`)
      const data = await response.json()
      setTechnologies(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  return (
    <section id="skills" className="section-container bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden group">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent" />
      </div>
      
      {/* Mouse interaction glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.length > 0 ? (
            technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5, z: 50 }}
                className="glass-card p-6 text-center group cursor-pointer"
              >
                <motion.div
                  className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                  animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 + 0.3 }}
                >
                  {tech.icon.startsWith('http') ? (
                    <Image src={tech.icon} alt={tech.name} width={48} height={48} className="rounded-lg" />
                  ) : (
                    <span>{tech.icon}</span>
                  )}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-300">
                  {tech.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {tech.category}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-12">
              Nema tehnologija za prikaz
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Continuously learning and adapting to new technologies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
