'use client'

import { Instagram, Twitter, Youtube, Music } from 'lucide-react'

export default function SocialLinksPage() {
  return (
    <div className="max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Social Links</h1>
        <p className="text-gray-600 mt-1">Connect your social media profiles</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Instagram</label>
          <div className="flex items-center space-x-2">
            <Instagram size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="@username"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Twitter</label>
          <div className="flex items-center space-x-2">
            <Twitter size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="@username"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">YouTube</label>
          <div className="flex items-center space-x-2">
            <Youtube size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Channel URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Spotify</label>
          <div className="flex items-center space-x-2">
            <Music size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Artist URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
