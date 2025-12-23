'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Music, Youtube, Mail, Calendar, Link as LinkIcon } from 'lucide-react'

interface Module {
  id: string
  type: string
  title: string
  data?: any
}

export default function DashboardPage() {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for selected goals from templates
    const selectedGoalsRaw = localStorage.getItem('selectedGoals')
    if (selectedGoalsRaw) {
      const selectedGoals = JSON.parse(selectedGoalsRaw)
      const prefilledModules = generatePrefilledModules(selectedGoals)
      setModules(prefilledModules)
      localStorage.removeItem('selectedGoals')
      setIsLoading(false)
      return
    }

    // Check for selected module type from scratch
    const selectedModuleType = localStorage.getItem('selectedModuleType')
    if (selectedModuleType) {
      const emptyModule = generateEmptyModule(selectedModuleType)
      setModules([emptyModule])
      localStorage.removeItem('selectedModuleType')
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }, [])

  const generatePrefilledModules = (goals: string[]): Module[] => {
    const modulesMap: Record<string, Module> = {
      'music': {
        id: 'music-1',
        type: 'music',
        title: '🎵 Latest Single - "Nakupenda"',
        data: { url: 'https://open.spotify.com/track/example', platform: 'Spotify' }
      },
      'youtube': {
        id: 'youtube-1',
        type: 'youtube',
        title: '📹 Latest Music Video',
        data: { url: 'https://youtube.com/watch?v=example', videoId: 'example' }
      },
      'tiktok': {
        id: 'tiktok-1',
        type: 'tiktok',
        title: '🎬 TikTok Channel',
        data: { username: '@artistname', url: 'https://tiktok.com/@artistname' }
      },
      'contacts': {
        id: 'contacts-1',
        type: 'contact-form',
        title: '✉️ Get in Touch',
        data: { fields: ['name', 'email', 'message'] }
      },
      'tickets': {
        id: 'tickets-1',
        type: 'custom-event',
        title: '🎤 Upcoming Show - Dec 31',
        data: { eventName: 'New Years Concert', ticketUrl: 'https://example.com/tickets' }
      },
      'products': {
        id: 'products-1',
        type: 'affiliate-product',
        title: '⭐ My Favorite Gear',
        data: { items: ['Studio Headphones', 'Microphone', 'Audio Interface'] }
      },
    }

    return goals.map(goal => modulesMap[goal]).filter(Boolean)
  }

  const generateEmptyModule = (moduleType: string): Module => {
    return {
      id: `${moduleType}-${Date.now()}`,
      type: moduleType,
      title: `New ${moduleType.replace(/-/g, ' ')}`,
      data: {}
    }
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (modules.length === 0) {
    // Empty State
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No content yet</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to get started
          </p>
          <button 
            onClick={() => router.push('/dashboard/modules')}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={20} />
            <span>Add Content</span>
          </button>
        </div>
      </div>
    )
  }

  // Content with modules
  return (
    <div className="p-6 space-y-4 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Content</h1>
        <button 
          onClick={() => router.push('/dashboard/modules/new')}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          <span>Add Module</span>
        </button>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-purple-600 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {module.type.includes('music') && <Music size={20} className="text-purple-600" />}
                  {module.type.includes('youtube') && <Youtube size={20} className="text-red-600" />}
                  {module.type.includes('contact') && <Mail size={20} className="text-blue-600" />}
                  {module.type.includes('event') && <Calendar size={20} className="text-green-600" />}
                  {!module.type.match(/(music|youtube|contact|event)/) && <LinkIcon size={20} className="text-gray-600" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-500 capitalize">{module.type.replace(/-/g, ' ')}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
