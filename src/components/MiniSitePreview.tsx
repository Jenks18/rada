'use client'

import { useState } from 'react'
import { Monitor, Tablet, Smartphone, X } from 'lucide-react'
import PreviewBrandIcon from './PreviewBrandIcon'

interface SocialLink {
  id: string
  url: string
}

interface Module {
  id: string
  type: string
  title: string
  data?: any
}

interface MiniSitePreviewProps {
  artistName?: string
  showArtistName?: boolean
  displayMode?: 'text' | 'logo'
  profileImage?: string
  coverImage?: string
  logoImage?: string
  backgroundColor?: string
  textColor?: string
  overlayMode?: 'lighten' | 'darken'
  socialLinks?: SocialLink[]
  modules?: Module[]
  isHydrated?: boolean
}

export default function MiniSitePreview({
  artistName = 'jkh',
  showArtistName = true,
  displayMode = 'text',
  profileImage,
  coverImage,
  logoImage,
  backgroundColor = '#FFFFFF',
  textColor = '#121212',
  overlayMode = 'darken',
  socialLinks = [],
  modules = [],
  isHydrated = false
}: MiniSitePreviewProps) {
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  // Calculate overlay color based on background and overlay mode
  const getOverlayColor = () => {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    if (overlayMode === 'lighten') {
      // Add white overlay
      return `rgba(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)}, 0.5)`
    } else {
      // Add black overlay
      return `rgba(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)}, 0.5)`
    }
  }

  // Calculate a contrasting border color
  const getBorderColor = () => {
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    
    if (overlayMode === 'lighten') {
      return `rgba(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)}, 0.3)`
    } else {
      return `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 0.3)`
    }
  }

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
      <div className={`${getDeviceClass()} transition-all duration-300 rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh]`} style={{ backgroundColor }}>
        {/* Mock Artist Page */}
        <div 
          className="w-full h-full flex flex-col relative overflow-y-auto"
          style={{ backgroundColor }}
        >
          {/* Header with Gradient Background - Large cover section - FIXED HEIGHT */}
          <div className="relative h-[350px] flex-shrink-0" style={{ backgroundColor: getOverlayColor() }}>
            {/* Cover Image or Background */}
            {isHydrated && coverImage ? (
              <div className="absolute inset-0">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                {/* Gradient overlay on image - darker at top and bottom */}
                <div 
                  className="absolute inset-0" 
                  style={{ 
                    background: `linear-gradient(to bottom, ${backgroundColor}66, ${backgroundColor}33, ${backgroundColor})`
                  }}
                ></div>
              </div>
            ) : (
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `linear-gradient(to bottom, ${getOverlayColor()}, ${backgroundColor})`
                }}
              ></div>
            )}

            {/* Profile Photo - positioned in the middle/lower part of tall header - only show if profileImage exists */}
            {isHydrated && profileImage && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
                <div 
                  className="w-24 h-24 rounded-2xl overflow-hidden border-4" 
                  style={{ borderColor: backgroundColor }}
                >
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Content Section - Uses background color */}
          <div className="flex-1 flex flex-col" style={{ backgroundColor }}>
            {/* Artist Name or Logo - Only show if enabled AND hydrated */}
            {isHydrated && showArtistName && (
              displayMode === 'logo' && logoImage ? (
                /* Show Logo at natural size (max width 90% of container) */
                <div className="flex justify-center px-4 mt-5 mb-5">
                  <div className="max-w-[90%] flex items-center justify-center">
                    <img src={logoImage} alt="Logo" className="max-w-full h-auto object-contain" style={{ maxHeight: '120px' }} />
                  </div>
                </div>
              ) : (
                /* Show Text Display Name */
                <h1 
                  className="text-3xl font-bold text-center px-4 mt-5 mb-5"
                  style={{ color: textColor }}
                >
                  {artistName}
                </h1>
              )
            )}

            {/* Social Links */}
            <div className={`flex justify-center mb-6 px-4 ${!showArtistName ? 'mt-5' : ''}`}>
              {isHydrated && socialLinks.filter(l => l.url).length > 0 ? (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {socialLinks.filter(l => l.url).map((link) => (
                    <a
                      key={link.id}
                      href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                      style={{ backgroundColor: getOverlayColor() }}
                      title={link.id}
                    >
                      <PreviewBrandIcon id={link.id} color={textColor} />
                    </a>
                  ))}
                </div>
              ) : (
                <div 
                  className="w-full max-w-[90%] flex flex-col items-center py-3 rounded-full" 
                  style={{ backgroundColor: getOverlayColor() }}
                >
                  <span className="font-semibold text-sm" style={{ color: textColor, opacity: 0.7 }}>Social Links</span>
                </div>
              )}
            </div>

            {/* Module Cards */}
            <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-2 gap-3 overflow-y-auto">
              {isHydrated && modules.length > 0 ? (
                modules.map((module) => (
                  <div
                    key={module.id}
                    className="w-full max-w-[90%] rounded-xl py-4 px-5 border text-center"
                    style={{
                      backgroundColor: getOverlayColor(),
                      borderColor: getBorderColor(),
                    }}
                  >
                    <span
                      className="font-semibold text-sm block"
                      style={{ color: textColor }}
                    >
                      {module.title}
                    </span>
                    <span
                      className="text-xs mt-1 block capitalize"
                      style={{ color: textColor, opacity: 0.5 }}
                    >
                      {module.type.replace(/-/g, ' ')}
                    </span>
                  </div>
                ))
              ) : (
                <div
                  className="w-full max-w-[90%] rounded-2xl py-20 px-8 text-center border"
                  style={{
                    backgroundColor: getOverlayColor(),
                    borderColor: getBorderColor(),
                  }}
                >
                  <span
                    className="font-medium text-sm"
                    style={{ color: textColor, opacity: 0.5 }}
                  >
                    Add a module to preview it here
                  </span>
                </div>
              )}
            </div>

            {/* Device Selector Icons - Inside Preview at Bottom */}
            <div className="pb-6 pt-4 flex justify-center">
              <div 
                className="backdrop-blur-sm rounded-full p-2 inline-flex space-x-1 shadow-lg" 
                style={{ 
                  backgroundColor: overlayMode === 'lighten' ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)'
                }}
              >
                <button
                  onClick={() => setDeviceView('mobile')}
                  className={`p-3 rounded-full transition-all ${
                    deviceView === 'mobile' 
                      ? overlayMode === 'lighten' ? 'bg-gray-200' : 'bg-gray-700' 
                      : overlayMode === 'lighten' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}
                  title="Mobile view"
                >
                  <Smartphone 
                    size={18} 
                    style={{ color: overlayMode === 'lighten' ? '#374151' : '#E5E7EB' }} 
                  />
                </button>
                <button
                  onClick={() => setDeviceView('tablet')}
                  className={`p-3 rounded-full transition-all ${
                    deviceView === 'tablet' 
                      ? overlayMode === 'lighten' ? 'bg-gray-200' : 'bg-gray-700' 
                      : overlayMode === 'lighten' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}
                  title="Tablet view"
                >
                  <Tablet 
                    size={18} 
                    style={{ color: overlayMode === 'lighten' ? '#374151' : '#E5E7EB' }} 
                  />
                </button>
                <button
                  onClick={() => setDeviceView('desktop')}
                  className={`p-3 rounded-full transition-all ${
                    deviceView === 'desktop' 
                      ? overlayMode === 'lighten' ? 'bg-gray-200' : 'bg-gray-700' 
                      : overlayMode === 'lighten' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}
                  title="Desktop view"
                >
                  <Monitor 
                    size={18} 
                    style={{ color: overlayMode === 'lighten' ? '#374151' : '#E5E7EB' }} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
