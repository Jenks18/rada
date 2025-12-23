'use client'

import { useState } from 'react'
import { Monitor, Tablet, Smartphone, X, Link as LinkIcon } from 'lucide-react'

interface MiniSitePreviewProps {
  artistName?: string
  profileImage?: string
  coverImage?: string
  backgroundColor?: string
  textColor?: string
}

export default function MiniSitePreview({
  artistName = 'Ian Njenga',
  profileImage,
  coverImage,
  backgroundColor = '#1a1a1a',
  textColor = '#ffffff'
}: MiniSitePreviewProps) {
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'w-[375px] h-[667px]'
      case 'tablet':
        return 'w-[768px] h-[1024px]'
      case 'desktop':
        return 'w-full h-full max-h-[800px]'
      default:
        return 'w-[375px] h-[667px]'
    }
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
          <LinkIcon size={14} className="text-gray-400" />
          <span className="text-xs text-gray-600">yazzy.komi.io</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">Saving...</span>
          <button className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            PUBLISH
          </button>
        </div>
      </div>

      {/* Device Selector */}
      <div className="flex items-center justify-center py-4 bg-white border-b border-gray-200">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-2 rounded transition-colors ${deviceView === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Mobile view"
          >
            <Smartphone size={18} className="text-gray-700" />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-2 rounded transition-colors ${deviceView === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Tablet view"
          >
            <Tablet size={18} className="text-gray-700" />
          </button>
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-2 rounded transition-colors ${deviceView === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            title="Desktop view"
          >
            <Monitor size={18} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Preview Window */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
        <div className={`${getDeviceClass()} transition-all duration-300 bg-white rounded-2xl shadow-2xl overflow-hidden relative`}>
          {/* Preview Badge */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2 z-50">
            <span className="text-xs font-medium text-gray-700">👁️ This is a preview</span>
            <button className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>

          {/* Mock Artist Page */}
          <div 
            className="w-full h-full flex flex-col items-center justify-center relative"
            style={{ backgroundColor }}
          >
            {/* Cover Image Area */}
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center space-y-6 px-6">
              {/* Profile Photo */}
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Artist Name */}
              <h1 
                className="text-2xl font-bold text-center"
                style={{ color: textColor }}
              >
                {artistName}
              </h1>

              {/* Social Links Button */}
              <button 
                className="px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
                style={{ 
                  backgroundColor: `${textColor}20`,
                  color: textColor 
                }}
              >
                Social Links
              </button>

              {/* Add Module Placeholder */}
              <div 
                className="mt-8 text-center"
                style={{ color: `${textColor}60` }}
              >
                <p className="text-xs">Add a module to preview it here</p>
              </div>
            </div>

            {/* Device Frame Icons (for mobile/tablet) */}
            {deviceView !== 'desktop' && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <div className="w-8 h-8 rounded bg-white/10"></div>
                <div className="w-8 h-8 rounded bg-white/10"></div>
                <div className="w-8 h-8 rounded bg-white/10"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
