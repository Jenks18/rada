'use client'

import { useState } from 'react'
import { Palette } from 'lucide-react'

export default function ThemePage() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'custom'>('dark')
  const [backgroundColor, setBackgroundColor] = useState('#121212')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [overlayMode, setOverlayMode] = useState<'lighten' | 'darken'>('lighten')

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Theme</h1>
        <p className="text-gray-600 mt-1">Customize the look and feel of your page</p>
      </div>

      {/* Select Your Theme */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Theme</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setThemeMode('light')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'light' ? '' : 'opacity-60'}`}
          >
            <div className={`w-16 h-16 bg-white border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'light' ? 'border-purple-600' : 'border-gray-300'
            }`}>
              <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-700">Light</span>
          </button>

          <button
            onClick={() => setThemeMode('dark')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'dark' ? '' : 'opacity-60'}`}
          >
            <div className={`w-16 h-16 bg-black border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'dark' ? 'border-purple-600' : 'border-gray-300'
            }`}>
              <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-700">Dark</span>
          </button>

          <button
            onClick={() => setThemeMode('custom')}
            className={`flex flex-col items-center space-y-2 ${themeMode === 'custom' ? '' : 'opacity-60'}`}
          >
            <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 border-2 rounded-lg flex items-center justify-center ${
              themeMode === 'custom' ? 'border-purple-600' : 'border-gray-300'
            }`}>
              <Palette className="text-white" size={24} />
            </div>
            <span className="text-sm text-gray-700">Custom</span>
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Colors</h2>
        
        {/* Background Color */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Background Color</label>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor }}
              onClick={() => document.getElementById('bg-color-input')?.click()}
            />
            <input
              id="bg-color-input"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="hidden"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="#121212"
            />
          </div>
        </div>

        {/* Typography & Icon Color */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Typography & Icon Color</label>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              style={{ backgroundColor: textColor }}
              onClick={() => document.getElementById('text-color-input')?.click()}
            />
            <input
              id="text-color-input"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="hidden"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* Module Overlay */}
      <div className="mt-8">
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Module Overlay</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOverlayMode('lighten')}
            className={`flex flex-col items-center space-y-2 ${overlayMode === 'lighten' ? '' : 'opacity-60'}`}
          >
            <div className={`w-16 h-16 bg-white border-2 rounded-lg flex items-center justify-center relative overflow-hidden ${
              overlayMode === 'lighten' ? 'border-purple-600' : 'border-gray-300'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg z-10"></div>
            </div>
            <span className="text-sm text-gray-700">Lighten</span>
          </button>

          <button
            onClick={() => setOverlayMode('darken')}
            className={`flex flex-col items-center space-y-2 ${overlayMode === 'darken' ? '' : 'opacity-60'}`}
          >
            <div className={`w-16 h-16 bg-gray-900 border-2 rounded-lg flex items-center justify-center relative overflow-hidden ${
              overlayMode === 'darken' ? 'border-purple-600' : 'border-gray-300'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10"></div>
              <div className="w-10 h-10 bg-gray-700 rounded-lg z-10"></div>
            </div>
            <span className="text-sm text-gray-700">Darken</span>
          </button>
        </div>
      </div>
    </div>
  )
}
