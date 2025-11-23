'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import HeroEditor from '@/components/admin/HeroEditor'
import AboutEditor from '@/components/admin/AboutEditor'
import ProjectsEditor from '@/components/admin/ProjectsEditor'
import SkillsEditor from '@/components/admin/SkillsEditor'
import ContactEditor from '@/components/admin/ContactEditor'
import SocialEditor from '@/components/admin/SocialEditor'

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('hero')
  const [migrating, setMigrating] = useState(false)
  const [migrationResults, setMigrationResults] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify')
      const data = await response.json()
      if (data.authenticated) {
        setAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
    } catch {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleMigrate = async () => {
    if (!confirm('This will migrate existing data to the new language-specific format with automatic translation to Serbian using Google Translate. This may take a few minutes. Continue?')) {
      return
    }

    setMigrating(true)
    setMigrationResults(null)

    try {
      const response = await fetch('/api/admin/migrate', {
        method: 'POST',
      })
      const result = await response.json()
      
      if (response.ok) {
        setMigrationResults(result.results)
        alert(`Migration completed!\n\nAll data has been automatically translated to Serbian and saved.\n\nCheck the results below.`)
      } else {
        alert(`Migration failed: ${result.error}`)
      }
    } catch (error) {
      alert('Migration error: ' + (error as Error).message)
    } finally {
      setMigrating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'about', label: 'About Section' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills & Technologies' },
    { id: 'contact', label: 'Contact Section' },
    { id: 'social', label: 'Social Networks' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-black text-gradient">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleMigrate}
                disabled={migrating}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/50 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Migrate existing data to language-specific format with automatic translation to Serbian"
              >
                {migrating ? 'Migrating...' : 'Migrate Data'}
              </button>
              <Link
                href="/"
                target="_blank"
                className="text-slate-300 hover:text-white transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setActiveTab(tab.id)
                    // Close migration results when switching tabs
                    if (migrationResults) {
                      setMigrationResults(null)
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-white border border-purple-500/50'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  } cursor-pointer`}
                  type="button"
                  aria-pressed={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            {migrationResults && (
              <div className="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Migration Results</h3>
                  <button
                    onClick={() => setMigrationResults(null)}
                    className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-1 rounded hover:bg-white/5"
                    type="button"
                  >
                    ✕ Close
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(migrationResults).map(([key, result]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-300 font-medium capitalize">{key}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          result.status === 'Migrated successfully' 
                            ? 'text-green-400' 
                            : result.status === 'Already migrated'
                            ? 'text-blue-400'
                            : result.status === 'No existing data'
                            ? 'text-slate-400'
                            : 'text-red-400'
                        }`}>
                          {result.status}
                        </span>
                        {result.details && (
                          <span className="text-xs text-slate-500">({result.details})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              {activeTab === 'hero' && <HeroEditor key="hero" />}
              {activeTab === 'social' && <SocialEditor key="social" />}
              {activeTab === 'about' && <AboutEditor key="about" />}
              {activeTab === 'projects' && <ProjectsEditor key="projects" />}
              {activeTab === 'skills' && <SkillsEditor key="skills" />}
              {activeTab === 'contact' && <ContactEditor key="contact" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
