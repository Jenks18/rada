'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { useMiniSite } from '@/contexts/MiniSiteContext'
import { useUser } from '@clerk/nextjs'
import Cropper, { Area } from 'react-easy-crop'

/** Canvas-based crop using the pixel area from react-easy-crop */
async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    pixelCrop.width, pixelCrop.height,
  )
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas toBlob failed'))
    }, 'image/jpeg', 0.9)
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', (e) => reject(e))
    img.src = url
  })
}

export default function HeaderPage() {
  const {
    displayName,
    setDisplayName,
    showDisplayName,
    setShowDisplayName,
    displayMode,
    setDisplayMode,
    coverImage,
    setCoverImage,
    logoImage,
    setLogoImage,
  } = useMiniSite()
  const { user } = useUser()
  const userId = user?.id ?? null

  // Crop modal state
  const [tempImage, setTempImage] = useState<string | null>(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropRatio, setCropRatio] = useState<'portrait' | 'square' | 'landscape'>('portrait')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<string | null>(null)

  const [isUploadingCover, setIsUploadingCover] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [coverUploadError, setCoverUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const logoFileRef = useRef<File | null>(null)

  // Aspect ratio for each mode
  const getAspect = () => {
    if (cropRatio === 'portrait') return 4 / 5
    if (cropRatio === 'square') return 1
    return 5 / 4
  }

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  // Zoom slider mapped to 0-100 range
  const zoomPercent = Math.round(((zoom - 1) / 2) * 100) // zoom 1-3 → 0-100

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          if (img.naturalWidth < 512 || img.naturalHeight < 512) {
            setImageError('Image too small, recommended size is 512 x 512 px')
          } else {
            setImageError(null)
          }
          setTempImage(e.target?.result as string)
          setCrop({ x: 0, y: 0 })
          setZoom(1)
          setShowCropModal(true)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleCropDone = async () => {
    if (!tempImage || !croppedAreaPixels) return
    if (!userId) {
      setCoverUploadError('You must be signed in to upload images.')
      return
    }

    setIsUploadingCover(true)
    setCoverUploadError(null)
    try {
      const blob = await getCroppedBlob(tempImage, croppedAreaPixels)
      const formData = new FormData()
      formData.append('file', blob, 'cover.jpg')
      const res = await fetch('/api/minisite/upload-cover', {
        method: 'POST',
        body: formData,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Upload failed')
      setCoverImage(json.url)
      setShowCropModal(false)
      setTempImage(null)
    } catch (err) {
      console.error('Cover upload error:', err)
      setCoverUploadError(
        err instanceof Error ? err.message : 'Upload failed — please try again.'
      )
    } finally {
      setIsUploadingCover(false)
    }
  }

  const handleCropCancel = () => {
    setShowCropModal(false)
    setTempImage(null)
  }

  const handleRemoveImage = async () => {
    setCoverImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    fetch('/api/minisite/upload-cover', { method: 'DELETE' }).catch(() => null)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 6 * 1024 * 1024) {
      setLogoError('File size must be 6MB or less')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = async () => {
        if (img.width < 564) {
          setLogoError('Image must be at least 564 pixels wide')
          return
        }
        if (!userId) {
          setLogoError('You must be signed in to upload images.')
          return
        }
        setLogoError(null)
        setIsUploadingLogo(true)
        try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await fetch('/api/minisite/upload-logo', {
            method: 'POST',
            body: formData,
          })
          const json = await res.json()
          if (!res.ok) throw new Error(json.error || 'Upload failed')
          setLogoImage(json.url)
        } catch {
          setLogoError('Upload failed — please try again.')
        } finally {
          setIsUploadingLogo(false)
        }
      }
      img.src = e.target?.result as string
    }
    logoFileRef.current = file
    reader.readAsDataURL(file)
  }

  const handleLogoClick = () => {
    logoInputRef.current?.click()
  }

  const handleRemoveLogo = () => {
    setLogoImage(null)
    setLogoError(null)
    logoFileRef.current = null
    if (logoInputRef.current) logoInputRef.current.value = ''
    fetch('/api/minisite/upload-logo', { method: 'DELETE' }).catch(() => null)
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
              <span className={`ml-2 text-sm font-medium ${showDisplayName ? 'text-green-600' : 'text-gray-500'}`}>{showDisplayName ? 'ON' : 'OFF'}</span>
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
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              
              {logoImage ? (
                /* Show uploaded logo with remove button AND replace option */
                <>
                  <div className="border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                        <img src={logoImage} alt="Logo" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Logo Image
                        </p>
                        <p className="text-xs text-gray-500">Uploaded</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveLogo}
                      className="p-1.5 hover:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                      title="Remove logo"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Replace Logo Section */}
                  <div className="mt-4">
                    <div 
                      onClick={isUploadingLogo ? undefined : handleLogoClick}
                      className={`border-2 border-dashed border-blue-400 rounded-lg p-8 flex items-center justify-center transition-colors ${isUploadingLogo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}`}
                    >
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-3">
                          {isUploadingLogo ? <Loader2 size={20} className="text-white animate-spin" /> : <Plus size={20} className="text-white" />}
                        </div>
                        <p className="text-base font-semibold text-gray-900 mb-1">{isUploadingLogo ? 'Uploading…' : 'Replace Logo'}</p>
                        <p className="text-sm text-gray-600">
                          Use an size that's at least 564 pixels<br />
                          wide and 6MB or less. For best results,<br />
                          use an image with transparent<br />
                          background.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Show upload prompt */
                <>
                  <div 
                    onClick={isUploadingLogo ? undefined : handleLogoClick}
                    className={`border-2 border-dashed border-gray-300 rounded-lg p-12 flex items-center justify-center transition-colors ${isUploadingLogo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-4">
                        {isUploadingLogo ? <Loader2 size={24} className="text-white animate-spin" /> : <Plus size={24} className="text-white" />}
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
                  {logoError ? (
                    <p className="text-sm text-red-500 mt-2">{logoError}</p>
                  ) : (
                    <p className="text-sm text-red-500 mt-2">Please upload a logo</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Crop Image Modal */}
      {showCropModal && tempImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
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
              {imageError && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  {imageError}
                </div>
              )}

              {/* react-easy-crop container */}
              <div className="relative w-full mx-auto mb-6 rounded-lg overflow-hidden" style={{ height: '350px' }}>
                <Cropper
                  image={tempImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={getAspect()}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  minZoom={1}
                  maxZoom={3}
                  objectFit="contain"
                  style={{
                    containerStyle: { borderRadius: '8px', background: '#1a1a1a' },
                    cropAreaStyle: { border: '4px solid white' },
                  }}
                />
              </div>

              {/* Zoom Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
                <div className="relative h-6 flex items-center select-none touch-none">
                  <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
                  <div
                    className="absolute h-1 bg-black rounded-full"
                    style={{ width: `${zoomPercent}%` }}
                  ></div>
                  <div
                    className="absolute h-4 w-4 bg-white border border-gray-300 shadow-sm rounded-full cursor-grab"
                    style={{ left: `${zoomPercent}%`, transform: 'translateX(-50%)' }}
                  ></div>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
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

            {/* Upload error */}
            {coverUploadError && (
              <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {coverUploadError}
              </div>
            )}

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3 bg-white">
              <button
                onClick={handleCropCancel}
                disabled={isUploadingCover}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCropDone}
                disabled={isUploadingCover}
                className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {isUploadingCover && <Loader2 size={16} className="animate-spin" />}
                {isUploadingCover ? 'Uploading…' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
