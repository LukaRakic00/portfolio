'use client'

import { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

interface AboutData {
  title: string
  subtitle: string
  paragraphs: string[]
  profileImage: string
}

export default function AboutEditor() {
  const [data, setData] = useState<AboutData>({
    title: '',
    subtitle: '',
    paragraphs: [''],
    profileImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/about')
      const aboutData = await response.json()
      setData(aboutData)
    } catch (error) {
      console.error('Error loading about:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage('Saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error saving')
      }
    } catch (error) {
      setMessage('Error saving')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setData({ ...data, profileImage: url })
  }

  const addParagraph = () => {
    setData({ ...data, paragraphs: [...data.paragraphs, ''] })
  }

  const removeParagraph = (index: number) => {
    setData({
      ...data,
      paragraphs: data.paragraphs.filter((_, i) => i !== index),
    })
  }

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...data.paragraphs]
    newParagraphs[index] = value
    setData({ ...data, paragraphs: newParagraphs })
  }

  if (loading) {
    return <div className="text-slate-400">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">About Section</h2>

      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">
          Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">
          Subtitle
        </label>
        <input
          type="text"
          value={data.subtitle}
          onChange={(e) => setData({ ...data, subtitle: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-300">
          Profile Image
        </label>
        <ImageUpload
          currentImage={data.profileImage}
          onUpload={handleImageUpload}
          folder="luka-portfolio"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-slate-300">
            Paragraphs
          </label>
          <button
            onClick={addParagraph}
            className="px-3 py-1 text-sm bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30"
          >
            + Add Paragraph
          </button>
        </div>
        {data.paragraphs.map((paragraph, index) => (
          <div key={index} className="mb-4 flex gap-2">
            <textarea
              value={paragraph}
              onChange={(e) => updateParagraph(index, e.target.value)}
              rows={3}
              className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
            {data.paragraphs.length > 1 && (
              <button
                onClick={() => removeParagraph(index)}
                className="px-3 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {message && (
        <div className={`px-4 py-2 rounded-lg ${
          message.includes('successfully') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-primary disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}

