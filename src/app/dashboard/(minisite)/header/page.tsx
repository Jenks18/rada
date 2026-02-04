'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function HeaderPage() {
  const [displayMode, setDisplayMode] = useState<'text' | 'logo'>('text')
  const [displayName, setDisplayName] = useState('jkh')
  const [showDisplayName, setShowDisplayName] = useState(true)

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
      {/* Image Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Image</h2>
        
        <div>
          <label className="block text-sm text-gray-700 mb-2">Upload</label>
          <div className="border-2 border-red-500 rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-2 text-gray-700">
              <Plus size={20} />
              <span className="font-medium">Upload a file</span>
            </div>
          </div>
          <button className="text-red-500 text-sm mt-2 hover:underline">
            Upload an image
          </button>
        </div>
      </div>

      {/* Display Name or Logo Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Display Name or Logo</h2>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showDisplayName}
              onChange={(e) => setShowDisplayName(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            <span className="ml-2 text-sm font-medium text-green-600">ON</span>
          </label>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          You can add a display name manually or update a custom logo to suit your branding
        </p>

        {/* Text/Logo Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setDisplayMode('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
              displayMode === 'text'
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-2xl">Aa</span>
            <span className="text-sm font-medium text-gray-700">Text</span>
          </button>
          <button
            onClick={() => setDisplayMode('logo')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
              displayMode === 'logo'
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Logo</span>
          </button>
        </div>

        {/* Text Input */}
        {displayMode === 'text' && (
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Text</h3>
            <p className="text-sm text-gray-600 mb-3">
              Type your display name into the field below
            </p>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="jkh"
            />
          </div>
        )}

        {/* Logo Upload */}
        {displayMode === 'logo' && (
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Logo</h3>
            <p className="text-sm text-gray-600 mb-3">
              Upload your custom logo image
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <Plus size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload logo</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
