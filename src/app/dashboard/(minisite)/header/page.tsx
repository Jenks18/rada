'use client'

import { useState, useRef } from 'react'
import { Plus, X } from 'lucide-react'

export default function HeaderPage() {
  const [displayMode, setDisplayMode] = useState<'text' | 'logo'>('text')
  const [displayName, setDisplayName] = useState('jkh')
  const [showDisplayName, setShowDisplayName] = useState(true)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [cropSize, setCropSize] = useState(50)
  const [cropRatio, setCropRatio] = useState<'portrait' | 'square' | 'landscape'>('portrait')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setTempImage(e.target?.result as string)
        setShowCropModal(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCropDone = () => {
    if (tempImage) {
      setCoverImage(tempImage)
    }
    setShowCropModal(false)
    setTempImage(null)
  }

  const handleCropCancel = () => {
    setShowCropModal(false)
    setTempImage(null)
  }

  return (
    <>
      <div className="max-w-3xl mx-auto p-8 space-y-8">
        {/* Image Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Image</h2>
          
          <div>
            <label className="block text-sm text-gray-700 mb-2">Upload</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div 
              onClick={handleUploadClick}
              className="border-2 border-red-500 rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center">
                  <Plus size={20} className="text-gray-700" />
                </div>
                <span className="font-medium">Upload a file</span>
              </div>
            </div>
            <button 
              onClick={handleUploadClick}
              className="text-red-500 text-sm mt-2 hover:underline"
            >
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

      {/* Crop Image Modal */}
      {showCropModal && tempImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Crop Image</h2>
              <button
                onClick={handleCropCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Image Preview with Crop Overlay */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6 flex items-center justify-center" style={{ height: '400px' }}>
                <img 
                  src={tempImage} 
                  alt="Crop preview" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'brightness(0.5)' }}
                />
                {/* Crop Overlay */}
                <div 
                  className="absolute bg-white/10 border-4 border-white shadow-lg transition-all duration-200"
                  style={{
                    width: cropRatio === 'portrait' ? '180px' : 
                           cropRatio === 'square' ? '220px' : 
                           '280px',
                    height: cropRatio === 'portrait' ? '280px' : 
                            cropRatio === 'square' ? '220px' : 
                            '180px'
                  }}
                >
                  {/* Inner bright area showing selected crop */}
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: `url(${tempImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>
                </div>
              </div>

              {/* Size Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cropSize}
                  onChange={(e) => setCropSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
              </div>

              {/* Ratio Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Ratio</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ratio"
                      value="portrait"
                      checked={cropRatio === 'portrait'}
                      onChange={() => setCropRatio('portrait')}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Portrait</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ratio"
                      value="square"
                      checked={cropRatio === 'square'}
                      onChange={() => setCropRatio('square')}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Square</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ratio"
                      value="landscape"
                      checked={cropRatio === 'landscape'}
                      onChange={() => setCropRatio('landscape')}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">Landscape</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={handleCropCancel}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCropDone}
                className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
