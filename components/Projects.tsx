'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { trackProjectLink, isExternalURL } from '@/lib/utm'
import { useTranslationSafe } from './Header'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
  gradient: string
}

export default function Projects() {
  const { language } = useTranslationSafe()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects()
  }, [language])

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/data/projects?lang=${language}`)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

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
          <h2 className="section-title">Projects & Portfolio</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A collection of my recent work and projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-12">
              Nema projekata za prikaz
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, isInView }: { project: Project, index: number, isInView: boolean }) {
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
          
          {isExternalURL(project.link) ? (
            <a
              href={trackProjectLink(project.link, project.title, 'projects-section')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center inline-block group/link"
            >
              <span className="group-hover/link:text-gradient transition-colors duration-300">
                View Project →
              </span>
            </a>
          ) : (
            <Link
              href={project.link}
              className="btn-outline w-full text-center inline-block group/link"
            >
              <span className="group-hover/link:text-gradient transition-colors duration-300">
                View Project →
              </span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
