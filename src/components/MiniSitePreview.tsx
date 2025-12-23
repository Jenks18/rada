'use client'

import { useState } from 'react'
import { Monitor, Tablet, Smartphone, X } from 'lucide-react'

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
    <div className="h-full bg-gray-50 flex items-center justify-center p-6 relative">
      {/* Preview Window */}
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

      {/* Device Selector - Bottom Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-lg shadow-xl p-1 inline-flex border border-gray-200">
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-3 rounded transition-colors ${deviceView === 'mobile' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            title="Mobile view"
          >
            <Smartphone size={20} className={deviceView === 'mobile' ? 'text-gray-900' : 'text-gray-500'} />
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-3 rounded transition-colors ${deviceView === 'tablet' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            title="Tablet view"
          >
            <Tablet size={20} className={deviceView === 'tablet' ? 'text-gray-900' : 'text-gray-500'} />
          </button>
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-3 rounded transition-colors ${deviceView === 'desktop' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            title="Desktop view"
          >
            <Monitor size={20} className={deviceView === 'desktop' ? 'text-gray-900' : 'text-gray-500'} />
          </button>
        </div>
      </div>
    </div>
  )
}
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
