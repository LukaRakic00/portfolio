'use client'

import { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

interface Skill {
  id: string
  name: string
  category: string
  icon: string
}

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills')
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Error loading skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: '',
      icon: '',
    }
    setSkills([...skills, newSkill])
    setEditingId(newSkill.id)
  }

  const handleSave = async (skill: Skill) => {
    try {
      const response = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      })

      if (response.ok) {
        setMessage('Saved successfully!')
        setTimeout(() => setMessage(''), 3000)
        setEditingId(null)
        loadSkills()
      } else {
        setMessage('Error saving')
      }
    } catch (error) {
      setMessage('Error saving')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this technology?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/skills?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSkills(skills.filter((s) => s.id !== id))
        setMessage('Technology deleted!')
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
        <h2 className="text-2xl font-bold text-white">Skills & Technologies</h2>
        <button onClick={handleAdd} className="btn-primary">
          + Add Technology
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
        {skills.map((skill) => (
          <SkillForm
            key={skill.id}
            skill={skill}
            isEditing={editingId === skill.id}
            onEdit={() => setEditingId(skill.id)}
            onCancel={() => setEditingId(null)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

function SkillForm({
  skill,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: {
  skill: Skill
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
  onSave: (skill: Skill) => void
  onDelete: (id: string) => void
}) {
  const [formData, setFormData] = useState(skill)

  useEffect(() => {
    setFormData(skill)
  }, [skill])

  if (!isEditing) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">{skill.name || 'No name'}</h3>
          <p className="text-slate-400 text-sm">{skill.category}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30">
            Edit
          </button>
          <button onClick={() => onDelete(skill.id)} className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30">
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
          <label className="block text-sm font-semibold mb-2 text-slate-300">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Frontend, Backend, Database..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-slate-300">Icon (Image URL or emoji)</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="⚡ ili URL slike"
              />
            </div>
            <div className="w-32">
              <ImageUpload
                currentImage={formData.icon.startsWith('http') ? formData.icon : ''}
                onUpload={(url) => setFormData({ ...formData, icon: url })}
                folder="luka-portfolio"
              />
            </div>
          </div>
          {formData.icon && !formData.icon.startsWith('http') && (
            <div className="mt-2 text-4xl">{formData.icon}</div>
          )}
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

