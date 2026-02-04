'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'

const socialPlatforms = [
  // Social Media
  { id: 'discord', name: 'Discord', icon: '🎮', category: 'social' },
  { id: 'facebook', name: 'Facebook', icon: '👤', category: 'social' },
  { id: 'instagram', name: 'Instagram', icon: '📷', category: 'social' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', category: 'social' },
  { id: 'medium', name: 'Medium', icon: '✍️', category: 'social' },
  { id: 'messenger', name: 'Messenger', icon: '💬', category: 'social' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌', category: 'social' },
  { id: 'reddit', name: 'Reddit', icon: '🤖', category: 'social' },
  { id: 'telegram', name: 'Telegram', icon: '✈️', category: 'social' },
  { id: 'threads', name: 'Threads', icon: '🧵', category: 'social' },
  { id: 'twitter', name: 'X (Twitter)', icon: '❌', category: 'social' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', category: 'social' },
  { id: 'snapchat', name: 'Snapchat', icon: '👻', category: 'social' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💚', category: 'social' },
  
  // Streaming
  { id: 'amazon-music', name: 'Amazon Music', icon: '🎵', category: 'streaming' },
  { id: 'apple-music', name: 'Apple Music', icon: '🎵', category: 'streaming' },
  { id: 'beatport', name: 'Beatport', icon: '🎧', category: 'streaming' },
  { id: 'deezer', name: 'Deezer', icon: '🎵', category: 'streaming' },
  { id: 'soundcloud', name: 'SoundCloud', icon: '☁️', category: 'streaming' },
  { id: 'spotify', name: 'Spotify', icon: '🎵', category: 'streaming' },
  { id: 'tidal', name: 'Tidal', icon: '🌊', category: 'streaming' },
  { id: 'twitch', name: 'Twitch', icon: '🎮', category: 'streaming' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', category: 'streaming' },
  { id: 'youtube-music', name: 'YouTube Music', icon: '🎵', category: 'streaming' },
  
  // Other
  { id: 'amazon', name: 'Amazon', icon: '📦', category: 'other' },
  { id: 'bandsintown', name: 'Bandsintown', icon: '🎤', category: 'other' },
  { id: 'email', name: 'Email', icon: '✉️', category: 'other' },
  { id: 'imdb', name: 'IMDb', icon: '🎬', category: 'other' },
  { id: 'substack', name: 'Substack', icon: '📰', category: 'other' },
  { id: 'custom', name: 'Custom Website', icon: '🌐', category: 'other' },
]

export default function SocialLinksPage() {
  const [selectedLinks, setSelectedLinks] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [linkInputs, setLinkInputs] = useState<Record<string, string>>({})

  const toggleLink = (platformId: string) => {
    setSelectedLinks(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId)
      } else {
        if (prev.length >= 7) {
          alert('You can add up to 7 social profile links to your page.')
          return prev
        }
        return [...prev, platformId]
      }
    })
  }

  const handleInputChange = (platformId: string, value: string) => {
    setLinkInputs(prev => ({
      ...prev,
      [platformId]: value
    }))
  }

  const handleDone = () => {
    setShowModal(false)
  }

  const selectedPlatforms = socialPlatforms.filter(p => selectedLinks.includes(p.id))
  const socialMediaPlatforms = socialPlatforms.filter(p => p.category === 'social')
  const streamingPlatforms = socialPlatforms.filter(p => p.category === 'streaming')
  const otherPlatforms = socialPlatforms.filter(p => p.category === 'other')

  return (
    <div className="max-w-3xl mx-auto p-8">
      {/* Info Text */}
      <p className="text-gray-600 text-sm mb-6">
        You can add up to 7 social profile links to your page.
      </p>

      {/* Add Links Button */}
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        <Plus size={18} />
        <span>Add Links</span>
      </button>

      {/* Selected Links List */}
      {selectedPlatforms.length > 0 && (
        <div className="mt-8 space-y-3">
          {selectedPlatforms.map((platform) => (
            <div key={platform.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-2xl">{platform.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{platform.name}</div>
                  <input
                    type="text"
                    placeholder={`Enter your ${platform.name} username or URL`}
                    value={linkInputs[platform.id] || ''}
                    onChange={(e) => handleInputChange(platform.id, e.target.value)}
                    className="mt-1 w-full text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  toggleLink(platform.id)
                  const newInputs = { ...linkInputs }
                  delete newInputs[platform.id]
                  setLinkInputs(newInputs)
                }}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Add Social Link</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm text-gray-600 mb-6">
                You can add up to 7 social profile links to your page.
              </p>

              {/* Social Media Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Social Media</h3>
                <div className="flex flex-wrap gap-2">
                  {socialMediaPlatforms.map((platform) => {
                    const isSelected = selectedLinks.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Streaming Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Streaming</h3>
                <div className="flex flex-wrap gap-2">
                  {streamingPlatforms.map((platform) => {
                    const isSelected = selectedLinks.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Other Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Other</h3>
                <div className="flex flex-wrap gap-2">
                  {otherPlatforms.map((platform) => {
                    const isSelected = selectedLinks.includes(platform.id)
                    return (
                      <button
                        key={platform.id}
                        onClick={() => toggleLink(platform.id)}
                        className={`
                          inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                          ${isSelected 
                            ? 'bg-gray-100 border-gray-900' 
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        <span className="text-lg">{platform.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                        {isSelected && <X size={14} className="text-gray-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={handleDone}
                className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
