'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  currentImage: string
  onUpload: (url: string) => void
  folder?: string
}

export default function ImageUpload({ currentImage, onUpload, folder = 'luka-portfolio' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.url) {
        onUpload(data.url)
      } else {
        setError(data.error || 'Upload error')
      }
    } catch (err) {
      setError('Upload error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-white/10">
          <Image
            src={currentImage}
            alt="Current"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div>
        <label className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-center text-slate-300">
          {uploading ? 'Uploading...' : currentImage ? 'Change Image' : 'Select Image'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {currentImage && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-300">
            Image URL
          </label>
          <input
            type="text"
            value={currentImage}
            onChange={(e) => onUpload(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      )}
    </div>
  )
}

