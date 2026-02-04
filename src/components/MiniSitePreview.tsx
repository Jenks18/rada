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
  artistName = 'jkh',
  profileImage,
  coverImage,
  backgroundColor = '#121212',
  textColor = '#ffffff'
}: MiniSitePreviewProps) {
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'w-[340px] h-[680px]'
      case 'tablet':
        return 'w-[768px] h-[1024px]'
      case 'desktop':
        return 'w-full h-full max-h-[800px]'
      default:
        return 'w-[340px] h-[680px]'
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Preview Window */}
      <div className={`${getDeviceClass()} transition-all duration-300 bg-[#121212] rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh]`}>
        {/* Mock Artist Page */}
        <div 
          className="w-full h-full flex flex-col relative overflow-y-auto"
          style={{ backgroundColor }}
        >
          {/* Header with Gradient Background - Tall section */}
          <div className="relative h-[240px] bg-[#1e1e1e]">
            {/* Cover Image or Background */}
            {coverImage ? (
              <div className="absolute inset-0">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-[#121212]"></div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] via-[#1e1e1e] to-[#121212]"></div>
            )}

            {/* Profile Photo - positioned in the middle/lower part of tall header */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
              {profileImage ? (
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#121212]">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                    <g opacity=".3" fill="#fff">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1h36a7 7 0 0 1 7 7v30.55l-5.158-3.787a6.009 6.009 0 0 0-7.58.38 6.009 6.009 0 0 1-8.078-.03l-13.463-12.31a6.5 6.5 0 0 0-8.919.139L1 29.56V8a7 7 0 0 1 7-7zM0 8a8 8 0 0 1 8-8h36a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8z"></path>
                      <circle cx="35.995" cy="16.667" r="5.333"></circle>
                    </g>
                  </svg>
                  <span className="text-white/60 font-semibold text-xs mt-3 block text-center">Profile Photo</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Darker background for contrast */}
          <div className="flex-1 bg-[#121212] flex flex-col">
            {/* Artist Name */}
            <h1 
              className="text-3xl font-bold text-center px-4 mt-5 mb-5"
              style={{ color: textColor }}
            >
              {artistName}
            </h1>

            {/* Social Links Empty State */}
            <div className="flex justify-center mb-6 px-4">
              <div className="w-full max-w-[90%] flex flex-col items-center py-3 rounded-full bg-[#2a2a2a]">
                <span className="text-white/70 font-semibold text-sm">Social Links</span>
              </div>
            </div>

            {/* Add Module Placeholder */}
            <div className="flex-1 flex items-start justify-center px-4 pt-6">
              <div className="w-full max-w-[90%] bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl py-20 px-8 text-center">
                <span className="text-white/50 font-medium text-sm">Add a module to preview it here</span>
              </div>
            </div>

            {/* Device Selector Icons - Inside Preview at Bottom */}
            <div className="pb-6 pt-4 flex justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 inline-flex space-x-1 shadow-lg">
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-3 rounded-full transition-all ${deviceView === 'mobile' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Mobile view"
                >
                  <Smartphone size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setDeviceView('tablet')}
                  className={`p-3 rounded-full transition-all ${deviceView === 'tablet' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Tablet view"
                >
                  <Tablet size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-3 rounded-full transition-all ${deviceView === 'desktop' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  title="Desktop view"
                >
                  <Monitor size={18} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
