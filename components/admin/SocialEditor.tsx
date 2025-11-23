'use client'

import { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

interface SocialData {
  linkedin: { url: string; icon: string }
  researchgate: { url: string; icon: string }
}

export default function SocialEditor() {
  const [data, setData] = useState<SocialData>({
    linkedin: { url: '', icon: '💼' },
    researchgate: { url: '', icon: '🔬' },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/social')
      const socialData = await response.json()
      setData(socialData)
    } catch (error) {
      console.error('Error loading social:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/social', {
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

  if (loading) {
    return <div className="text-slate-400">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Social Networks</h2>

      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">LinkedIn</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                URL
              </label>
              <input
                type="url"
                value={data.linkedin.url}
                onChange={(e) => setData({ ...data, linkedin: { ...data.linkedin, url: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                Icon (emoji or image URL)
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={data.linkedin.icon}
                  onChange={(e) => setData({ ...data, linkedin: { ...data.linkedin, icon: e.target.value } })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="💼 or image URL"
                />
                {data.linkedin.icon && !data.linkedin.icon.startsWith('http') && (
                  <div className="text-4xl">{data.linkedin.icon}</div>
                )}
                <div className="text-sm text-slate-400 mb-2">Or upload an image:</div>
                <ImageUpload
                  currentImage={data.linkedin.icon.startsWith('http') ? data.linkedin.icon : ''}
                  onUpload={(url) => setData({ ...data, linkedin: { ...data.linkedin, icon: url } })}
                  folder="luka-portfolio"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">ResearchGate</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                URL
              </label>
              <input
                type="url"
                value={data.researchgate.url}
                onChange={(e) => setData({ ...data, researchgate: { ...data.researchgate, url: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://researchgate.net/profile/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-300">
                Icon (emoji or image URL)
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={data.researchgate.icon}
                  onChange={(e) => setData({ ...data, researchgate: { ...data.researchgate, icon: e.target.value } })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="🔬 or image URL"
                />
                {data.researchgate.icon && !data.researchgate.icon.startsWith('http') && (
                  <div className="text-4xl">{data.researchgate.icon}</div>
                )}
                <div className="text-sm text-slate-400 mb-2">Or upload an image:</div>
                <ImageUpload
                  currentImage={data.researchgate.icon.startsWith('http') ? data.researchgate.icon : ''}
                  onUpload={(url) => setData({ ...data, researchgate: { ...data.researchgate, icon: url } })}
                  folder="luka-portfolio"
                />
              </div>
            </div>
          </div>
        </div>
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

