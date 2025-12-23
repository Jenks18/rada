'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ModulesNewPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Module</h1>
          <p className="text-gray-600 mt-1">Build your mini-site from scratch</p>
        </div>
      </div>

      {/* Module Type Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Module Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-semibold text-gray-900 mb-1">Link</h3>
            <p className="text-sm text-gray-600">Add a custom link to any URL</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="font-semibold text-gray-900 mb-1">Event</h3>
            <p className="text-sm text-gray-600">Promote an upcoming event</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">👕</div>
            <h3 className="font-semibold text-gray-900 mb-1">Merchandise</h3>
            <p className="text-sm text-gray-600">Sell your merch</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">🎵</div>
            <h3 className="font-semibold text-gray-900 mb-1">Music</h3>
            <p className="text-sm text-gray-600">Embed Spotify, Apple Music, etc.</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">📹</div>
            <h3 className="font-semibold text-gray-900 mb-1">Video</h3>
            <p className="text-sm text-gray-600">Embed YouTube, TikTok, etc.</p>
          </button>

          <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:shadow-lg transition-all text-left">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900 mb-1">Text</h3>
            <p className="text-sm text-gray-600">Add custom text content</p>
          </button>
        </div>
      </div>
    </div>
  )
}
