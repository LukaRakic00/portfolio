'use client'

import { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
  gradient: string
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects', {
        credentials: 'include',
      })
      
      if (!response.ok) {
        console.error('Load error:', response.status, await response.text())
        return
      }
      
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      image: '',
      technologies: [],
      link: '#',
      gradient: 'from-blue-600 to-purple-600',
    }
    setProjects([...projects, newProject])
    setEditingId(newProject.id)
  }

  const handleSave = async (project: Project) => {
    try {
      // Check if project exists in the loaded projects (from database)
      const existingProject = projects.find(p => p.id === project.id)
      const isNewProject = !existingProject
      
      const method = isNewProject ? 'POST' : 'PUT'
      const response = await fetch('/api/admin/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Save error:', response.status, errorData)
        setMessage(`Error: ${errorData.error || 'Failed to save project'}`)
        setTimeout(() => setMessage(''), 3000)
        return
      }

      setMessage('Saved successfully!')
      setTimeout(() => setMessage(''), 3000)
      setEditingId(null)
      loadProjects()
    } catch (error) {
      console.error('Save error:', error)
      setMessage('Error saving')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id))
        setMessage('Project deleted!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error deleting')
    }
  }

  if (loading) {
    return <div className="text-slate-400">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button onClick={handleAdd} className="btn-primary">
          + Add Project
        </button>
      </div>

      {message && (
        <div className={`px-4 py-2 rounded-lg ${
          message.includes('successfully') || message.includes('deleted') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectForm
            key={project.id}
            project={project}
            isEditing={editingId === project.id}
            onEdit={() => setEditingId(project.id)}
            onCancel={() => setEditingId(null)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectForm({
  project,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  project: Project
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (project: Project) => void
  onDelete: (id: string) => void
}) {
  const [formData, setFormData] = useState(project)

  useEffect(() => {
    setFormData(project)
  }, [project])

  if (!isEditing) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{project.title || 'No title'}</h3>
          <p className="text-slate-400 text-sm">{project.description.substring(0, 50)}...</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30">
            Edit
          </button>
          <button onClick={() => onDelete(project.id)} className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30">
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Link</label>
          <input
            type="text"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-300">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-300">Image</label>
          <ImageUpload
            currentImage={formData.image}
            onUpload={(url) => setFormData({ ...formData, image: url })}
            folder="luka-portfolio"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Technologies (comma-separated)</label>
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Next.js, React, TypeScript"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Gradient</label>
          <select
            value={formData.gradient}
            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="from-blue-600 to-purple-600">Blue - Purple</option>
            <option value="from-purple-600 to-pink-600">Purple - Pink</option>
            <option value="from-pink-600 to-red-600">Pink - Red</option>
            <option value="from-blue-600 to-cyan-600">Blue - Cyan</option>
            <option value="from-purple-600 to-blue-600">Purple - Blue</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => onSave(formData)} className="btn-primary">
          Save
        </button>
        <button onClick={onCancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10">
          Cancel
        </button>
      </div>
    </div>
  )
}

