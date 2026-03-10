'use client'

import { useEffect } from 'react'
import { Palette } from 'lucide-react'
import { useMiniSite } from '@/contexts/MiniSiteContext'

export default function ThemePage() {
  const {
    themeMode,
    setThemeMode,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    overlayMode,
    setOverlayMode,
  } = useMiniSite()

  // When theme mode changes to light or dark, set default colors
  useEffect(() => {
    if (themeMode === 'light') {
      setBackgroundColor('#FFFFFF')
      setTextColor('#121212')
      setOverlayMode('darken')
    } else if (themeMode === 'dark') {
      setBackgroundColor('#000000')
      setTextColor('#ffffff')
      setOverlayMode('lighten')
    }
  }, [themeMode])

  const isCustomTheme = themeMode === 'custom'

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Theme</h1>
      </div>

      {/* Select Your Theme */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Select Your Theme</h2>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setThemeMode('light')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'light' ? '' : 'opacity-50'}`}
          >
            <div className={`w-14 h-14 bg-white border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'light' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
            }`}>
              <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-600">Light</span>
          </button>

          <button
            onClick={() => setThemeMode('dark')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'dark' ? '' : 'opacity-50'}`}
          >
            <div className={`w-14 h-14 bg-black border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
            }`}>
              <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-600">Dark</span>
          </button>

          <button
            onClick={() => setThemeMode('custom')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'custom' ? '' : 'opacity-50'}`}
          >
            <div className={`w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'custom' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
            }`}>
              <Palette className="text-white" size={20} />
            </div>
            <span className="text-xs text-gray-600">Custom</span>
          </button>
        </div>
      </div>

      {/* Colors Section */}
      <div>
        <h2 className={`text-base font-semibold mb-4 ${isCustomTheme ? 'text-gray-900' : 'text-gray-400'}`}>Colors</h2>
        
        <div className="space-y-5">
          {/* Background Color */}
          <div>
            <label className={`block text-sm mb-2 ${isCustomTheme ? 'text-gray-600' : 'text-gray-400'}`}>Background Color</label>
            <div className="flex items-center space-x-3">
              <div 
                className={`w-10 h-10 rounded-lg border-2 border-gray-300 flex-shrink-0 ${
                  isCustomTheme ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                style={{ backgroundColor }}
                onClick={() => isCustomTheme && document.getElementById('bg-color-input')?.click()}
              />
              <input
                id="bg-color-input"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                disabled={!isCustomTheme}
                className="hidden"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                disabled={!isCustomTheme}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isCustomTheme ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                }`}
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          {/* Typography & Icon Color */}
          <div>
            <label className={`block text-sm mb-2 ${isCustomTheme ? 'text-gray-600' : 'text-gray-400'}`}>Typography & Icon Color</label>
            <div className="flex items-center space-x-3">
              <div 
                className={`w-10 h-10 rounded-lg border-2 border-gray-300 flex-shrink-0 ${
                  isCustomTheme ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
                style={{ backgroundColor: textColor }}
                onClick={() => isCustomTheme && document.getElementById('text-color-input')?.click()}
              />
              <input
                id="text-color-input"
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                disabled={!isCustomTheme}
                className="hidden"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                disabled={!isCustomTheme}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isCustomTheme ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                }`}
                placeholder="#121212"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Module Overlay */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <h2 className={`text-base font-semibold ${isCustomTheme ? 'text-gray-900' : 'text-gray-400'}`}>Module Overlay</h2>
          <button className={`${isCustomTheme ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300'}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => isCustomTheme && setOverlayMode('lighten')}
            disabled={!isCustomTheme}
            className={`flex flex-col items-center space-y-2 ${
              overlayMode === 'lighten' ? '' : 'opacity-50'
            } ${!isCustomTheme ? 'cursor-not-allowed' : ''}`}
          >
            <div className={`w-14 h-14 bg-white border-2 rounded-lg flex items-center justify-center relative overflow-hidden ${
              overlayMode === 'lighten' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-lg z-10"></div>
            </div>
            <span className={`text-xs ${isCustomTheme ? 'text-gray-600' : 'text-gray-400'}`}>Lighten</span>
          </button>

          <button
            onClick={() => isCustomTheme && setOverlayMode('darken')}
            disabled={!isCustomTheme}
            className={`flex flex-col items-center space-y-2 ${
              overlayMode === 'darken' ? '' : 'opacity-50'
            } ${!isCustomTheme ? 'cursor-not-allowed' : ''}`}
          >
            <div className={`w-14 h-14 bg-gray-900 border-2 rounded-lg flex items-center justify-center relative overflow-hidden ${
              overlayMode === 'darken' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10"></div>
              <div className="w-8 h-8 bg-gray-700 rounded-lg z-10"></div>
            </div>
            <span className={`text-xs ${isCustomTheme ? 'text-gray-600' : 'text-gray-400'}`}>Darken</span>
          </button>
        </div>
      </div>
    </div>
  )
}
