'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { useMiniSite } from '@/contexts/MiniSiteContext'

export default function HeaderPage() {
  const {
    displayName,
    setDisplayName,
    showDisplayName,
    setShowDisplayName,
    coverImage,
    setCoverImage,
  } = useMiniSite()
  
  const [displayMode, setDisplayMode] = useState<'text' | 'logo'>('text')
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [cropSize, setCropSize] = useState(0)
  const [cropRatio, setCropRatio] = useState<'portrait' | 'square' | 'landscape'>('portrait')
  const [imageError, setImageError] = useState<string | null>(null)
  
  // Dynamic container dimensions - calculated from image aspect ratio
  const [containerDims, setContainerDims] = useState({ width: 0, height: 0 })
  
  // 2D Dragging State (X and Y)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  
  const dragStartRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
  const initialOffsetRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Derived Scale: 0 -> 1x, 100 -> 3x
  const scale = 1 + (cropSize / 100) * 2

  // Max container size - reference uses 592.596px
  const MAX_CONTAINER_SIZE = 592.596

  // Crop window dimensions (the white border box)
  const CROP_WIDTH = 273.811
  
  const getCropHeight = () => {
    if (cropRatio === 'portrait') return 342.264
    if (cropRatio === 'square') return 273.811
    return 219.049 // landscape
  }

  // Reset drag position when ratio changes
  useEffect(() => {
    setOffset({ x: 0, y: 0 })
  }, [cropRatio])

  // Calculate container dimensions based on image aspect ratio
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    const aspect = naturalWidth / naturalHeight
    
    // Validate minimum size
    if (naturalWidth < 512 || naturalHeight < 512) {
      setImageError('Image too small, recommended size is 512 x 512 px')
    } else {
      setImageError(null)
    }
    
    let calcWidth, calcHeight

    // If portrait (taller than wide)
    if (naturalHeight > naturalWidth) {
      calcHeight = MAX_CONTAINER_SIZE
      calcWidth = calcHeight * aspect
      // Example: 592 * 0.8 = 474px
    } 
    // If landscape (wider than tall)
    else {
      calcWidth = MAX_CONTAINER_SIZE
      calcHeight = calcWidth / aspect
      // Example: 592 / 1.25 = 474px
    }

    setContainerDims({ width: calcWidth, height: calcHeight })
    setOffset({ x: 0, y: 0 })
    setCropSize(0)
  }

  // Clamp offset to prevent white space
  const clampOffset = (x: number, y: number, currentScale: number) => {
    const scaledW = containerDims.width * currentScale
    const scaledH = containerDims.height * currentScale
    
    const cropH = getCropHeight()

    const maxOffsetX = Math.max(0, (scaledW - CROP_WIDTH) / 2)
    const maxOffsetY = Math.max(0, (scaledH - cropH) / 2)

    return {
      x: Math.max(-maxOffsetX, Math.min(x, maxOffsetX)),
      y: Math.max(-maxOffsetY, Math.min(y, maxOffsetY))
    }
  }

  // Auto-clamp position when zooming or changing ratio
  useEffect(() => {
    setOffset(prev => clampOffset(prev.x, prev.y, scale))
  }, [cropSize, cropRatio, scale, containerDims])

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

  const handleRemoveImage = () => {
    setCoverImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    dragStartRef.current = { x: clientX, y: clientY }
    initialOffsetRef.current = { ...offset }
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const deltaX = clientX - dragStartRef.current.x
    const deltaY = clientY - dragStartRef.current.y
    
    const rawX = initialOffsetRef.current.x + deltaX
    const rawY = initialOffsetRef.current.y + deltaY

    setOffset(clampOffset(rawX, rawY, scale))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
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
            
            {coverImage ? (
              /* Show uploaded image with remove button */
              <div className="border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                    <img src={coverImage} alt="Uploaded" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Header Image
                    </p>
                    <p className="text-xs text-gray-500">Uploaded</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveImage}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                  title="Remove image"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>
            ) : (
              /* Show upload button */
              <>
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
              </>
            )}
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
                Replace your display name with a custom logo.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                    <Plus size={24} className="text-white" />
                  </div>
                  <p className="text-base font-semibold text-gray-900 mb-2">Add your Logo</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Use an size that's at least 564 pixels<br />
                    wide and 6MB or less. For best results,<br />
                    use an image with transparent<br />
                    background.
                  </p>
                </div>
              </div>
              <p className="text-sm text-red-500 mt-2">Please upload a logo</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden image to calculate dimensions */}
      {tempImage && (
        <img 
          src={tempImage} 
          onLoad={handleImageLoad}
          className="hidden fixed -z-50"
          alt="dimension calculator" 
        />
      )}

      {/* Crop Image Modal */}
      {showCropModal && tempImage && containerDims.width > 0 && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchEnd={handleMouseUp}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full my-auto" style={{ maxWidth: '625px' }}>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white">
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
              {/* Image size warning */}
              {imageError && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  {imageError}
                </div>
              )}
              
              {/* Image Preview with Crop Overlay */}
              <div 
                className={`relative overflow-hidden rounded-lg shadow-sm mx-auto select-none mb-6 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ 
                  width: `${containerDims.width}px`, 
                  height: `${containerDims.height}px`,
                  backgroundColor: '#1a1a1a'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
              >
                {/* Single image (the one being moved) */}
                <img 
                  src={tempImage} 
                  alt="Crop preview"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    willChange: 'transform',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* The shadow overlay trick - creates dimmed background around crop window */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-4 border-white"
                  style={{
                    width: `${CROP_WIDTH}px`,
                    height: `${getCropHeight()}px`,
                    boxShadow: '0 0 0 9999px rgba(107, 114, 128, 0.75)'
                  }}
                />
              </div>


              {/* Zoom Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
                
                {/* Custom Slider Container */}
                <div className="relative h-6 flex items-center select-none touch-none">
                  
                  {/* 1. The Rail (Background Line) */}
                  <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
                  
                  {/* 2. The Track (Active Progress Line) */}
                  <div 
                    className="absolute h-1 bg-black rounded-full"
                    style={{ width: `${cropSize}%` }}
                  ></div>
                  
                  {/* 3. The Knob (Handle) */}
                  <div 
                    className="absolute h-4 w-4 bg-white border border-gray-300 shadow-sm rounded-full cursor-grab"
                    style={{ left: `${cropSize}%`, transform: 'translateX(-50%)' }}
                  ></div>

                  {/* 4. The Interactive Input (Invisible Overlay) */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={cropSize}
                    onChange={(e) => setCropSize(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
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
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 bg-white">
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
