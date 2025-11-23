'use client'

import { useEffect, useState } from 'react'

interface ContactData {
  title: string
  subtitle: string
}

export default function ContactEditor() {
  const [data, setData] = useState<ContactData>({
    title: '',
    subtitle: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/contact')
      const contactData = await response.json()
      setData(contactData)
    } catch (error) {
      console.error('Error loading contact:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/contact', {
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
      <h2 className="text-2xl font-bold text-white mb-6">Contact Section</h2>

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

