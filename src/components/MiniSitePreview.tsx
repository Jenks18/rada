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
          className="w-full h-full flex flex-col items-center relative"
          style={{ backgroundColor }}
        >
          {/* Cover Image Area */}
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full px-6 pt-12">
            {/* Profile Photo */}
            <div className="w-32 h-32 bg-gray-700 rounded-2xl flex items-center justify-center mb-6">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>

            {/* Artist Name */}
            <h1 
              className="text-4xl font-bold text-center mb-8 tracking-tight"
              style={{ color: textColor }}
            >
              {artistName}
            </h1>

            {/* Social Links Button */}
            <button 
              className="w-full max-w-[90%] py-4 rounded-full font-medium transition-all hover:opacity-90 text-base"
              style={{ 
                backgroundColor: '#3a3a3a',
                color: textColor 
              }}
            >
              Social Links
            </button>

            {/* Add Module Placeholder */}
            <div 
              className="mt-auto mb-24 w-full max-w-[90%] bg-gray-800/50 rounded-3xl p-12 text-center backdrop-blur-sm"
              style={{ marginTop: '3rem' }}
            >
              <p className="text-lg font-medium" style={{ color: `${textColor}70` }}>
                Add a module to preview it here
              </p>
            </div>
          </div>

          {/* Device Selector Icons - Inside Preview at Bottom */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md rounded-full p-2 inline-flex space-x-1">
            <button
              onClick={() => setDeviceView('mobile')}
              className={`p-3 rounded-full transition-all ${deviceView === 'mobile' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Mobile view"
            >
              <Smartphone size={20} className="text-white" />
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`p-3 rounded-full transition-all ${deviceView === 'tablet' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Tablet view"
            >
              <Tablet size={20} className="text-white" />
            </button>
            <button
              onClick={() => setDeviceView('desktop')}
              className={`p-3 rounded-full transition-all ${deviceView === 'desktop' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              title="Desktop view"
            >
              <Monitor size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
