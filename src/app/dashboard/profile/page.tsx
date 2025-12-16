'use client'

import { useState } from 'react'
import { Camera, Instagram, Twitter, Youtube, Music, MapPin, Phone } from 'lucide-react'

export default function ProfilePage() {
  const [saving, setSaving] = useState(false)

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your artist profile and public page settings</p>
      </div>

      {/* Cover & Profile Image */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 relative">
          <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors">
            <Camera size={16} />
            <span>Change Cover</span>
          </button>
        </div>
        
        <div className="px-6 pb-6">
          <div className="-mt-16 relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white"></div>
            <button className="absolute bottom-0 right-0 bg-white hover:bg-gray-50 p-2 rounded-full border border-gray-200 transition-colors">
              <Camera size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stage Name *
            </label>
            <input
              type="text"
              defaultValue="Ian Njenga"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              defaultValue="Award-winning Kenyan artist and songwriter."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  defaultValue="Nairobi, Kenya"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="tel"
                  defaultValue="254712345678"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genres
            </label>
            <div className="flex flex-wrap gap-2">
              {['Afro-Pop', 'R&B', 'Soul'].map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {genre} ×
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:border-purple-600 hover:text-purple-600">
                + Add Genre
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Social Links</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="@yourusername"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="@yourusername"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="https://youtube.com/@yourchannel"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spotify Artist URL
            </label>
            <div className="relative">
              <Music className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="https://open.spotify.com/artist/..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
          Save Changes
        </button>
      </div>
    </div>
  )
}
