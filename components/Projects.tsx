'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trackProjectLink, isExternalURL } from '@/lib/utm'
import { useTranslationSafe } from './Header'
import { projectsData, type Project } from '@/data/projects'

export default function Projects() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Use static data instead of API calls
  const projects = useMemo(() => projectsData[language], [language])

  return (
    <section id="projects" className="section-container bg-slate-950 relative overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Mouse interaction glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5" />
      </div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="section-title">{language === 'en' ? 'Projects & Portfolio' : 'Projekti & Portfolio'}</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {language === 'en' ? 'A collection of my recent work and projects' : 'Kolekcija mog nedavnog rada i projekata'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isInView={isInView} language={language} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-12">
              {language === 'en' ? 'No projects to display' : 'Nema projekata za prikaz'}
            </div>
          )}
        </div>
      </div>
      
      {/* Beautiful Gradient Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden z-0">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#1e40af', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.6 }} />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#334155', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path d="M0,80 Q360,20 720,60 T1440,40 L1440,120 L0,120 Z" fill="url(#waveGradient1)" />
          <path d="M0,100 Q360,40 720,80 T1440,60 L1440,120 L0,120 Z" fill="url(#waveGradient2)" />
        </svg>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView, language }: { project: Project; index: number; isInView: boolean; language: 'en' | 'sr' }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${project.gradient.split(' ')[1]} 0%, ${project.gradient.split(' ')[3]} 100%)`
        }}
      />
      
      <div className="relative card overflow-hidden h-full flex flex-col">
        {project.image ? (
          <div className="relative w-full h-64 overflow-hidden">
            {!imageError ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="text-5xl mb-3">🚀</div>
                  <p className="text-lg font-semibold">Project Image</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className={`w-full h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
            <div className="text-center text-white relative z-10">
              <div className="text-4xl mb-2">💼</div>
              <p className="text-sm font-semibold opacity-90">{project.title}</p>
            </div>
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-gradient transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-400 mb-6 flex-1 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-300 rounded-full border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {(() => {
            const hasWebsite = project.website || (!project.github && project.link && project.link !== '#')
            const hasGithub = project.github
            const showBoth = hasWebsite && hasGithub
            
            return (
              <div className={`flex ${showBoth ? 'gap-3' : ''}`}>
                {/* Website button */}
                {hasWebsite && (
                  isExternalURL(project.website || project.link || '') ? (
                    <a
                      href={trackProjectLink(project.website || project.link || '', project.title, 'projects-section')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-outline text-center inline-block group/link ${showBoth ? 'flex-1' : 'w-full'}`}
                    >
                      <span className="group-hover/link:text-gradient transition-colors duration-300">
                        {project.id === 'oracle-db' 
                          ? (language === 'en' ? 'View Certificate →' : 'Pogledaj Sertifikat →')
                          : (language === 'en' ? 'Website →' : 'Sajt →')}
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={project.website || project.link || '#'}
                      className={`btn-outline text-center inline-block group/link ${showBoth ? 'flex-1' : 'w-full'}`}
                    >
                      <span className="group-hover/link:text-gradient transition-colors duration-300">
                        {project.id === 'oracle-db' 
                          ? (language === 'en' ? 'View Certificate →' : 'Pogledaj Sertifikat →')
                          : (language === 'en' ? 'Website →' : 'Sajt →')}
                      </span>
                    </Link>
                  )
                )}
                
                {/* GitHub button */}
                {hasGithub && project.github && (
                  <a
                    href={trackProjectLink(project.github, project.title, 'projects-section')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-outline text-center inline-block group/link ${showBoth ? 'flex-1' : 'w-full'}`}
                  >
                    <span className="group-hover/link:text-gradient transition-colors duration-300">
                      {language === 'en' ? 'GitHub →' : 'GitHub →'}
                    </span>
                  </a>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </motion.div>
  )
}
