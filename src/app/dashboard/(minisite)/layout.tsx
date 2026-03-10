'use client'

import { useState } from 'react'
import MiniSitePreview from '@/components/MiniSitePreview'
import { useMiniSite } from '@/contexts/MiniSiteContext'
import { Link as LinkIcon, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

function MiniSiteLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    displayName,
    showDisplayName,
    displayMode,
    coverImage,
    profileImage,
    logoImage,
    backgroundColor,
    textColor,
    overlayMode,
    socialLinks,
    modules,
    isHydrated,
    username,
    isPublished,
    publishMiniSite,
    publishStatus,
  } = useMiniSite()

  const [publishError, setPublishError] = useState<string | null>(null)

  const handlePublish = async () => {
    setPublishError(null)
    const result = await publishMiniSite()
    if (!result.ok) {
      setPublishError(result.error ?? 'Publish failed')
    }
  }

  const publicUrl = username ? `${username}.rada.bio` : null
  const displayUrl = publicUrl ?? 'Set username in Settings'

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="h-16 bg-white flex items-center justify-center px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-4">
          {/* URL pill */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <LinkIcon size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 select-all">{displayUrl}</span>
            {publicUrl && isPublished && (
              <a
                href={`https://${publicUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-gray-400 hover:text-gray-700"
                title="Open site"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Status / error */}
          {publishError && (
            <div className="flex items-center space-x-1 text-red-500 text-sm">
              <AlertCircle size={14} />
              <span>{publishError}</span>
            </div>
          )}

          {/* PUBLISH button */}
          <button
            onClick={handlePublish}
            disabled={publishStatus === 'publishing' || !username}
            title={!username ? 'Set a username first in Settings → Mini Site' : undefined}
            className={`px-6 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:cursor-not-allowed
              ${publishStatus === 'published'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : publishStatus === 'error'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50'
              }`}
          >
            {publishStatus === 'publishing' && <Loader2 size={14} className="animate-spin" />}
            {publishStatus === 'published' && <Check size={14} />}
            {publishStatus === 'error' && <AlertCircle size={14} />}
            {publishStatus === 'publishing' ? 'Publishing…'
              : publishStatus === 'published' ? 'Published!'
              : publishStatus === 'error' ? 'Retry'
              : isPublished ? 'Re-Publish'
              : 'Publish'}
          </button>
        </div>
      </div>

      {/* Split Screen - Left Editor + Right Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Editor Panel - 50% */}
        <div className="w-1/2 overflow-y-auto bg-gray-50">
          {children}
        </div>

        {/* Right Preview Panel - 50% - PERSISTENT */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <MiniSitePreview
            artistName={displayName}
            showArtistName={showDisplayName}
            displayMode={displayMode}
            coverImage={coverImage || undefined}
            profileImage={profileImage || undefined}
            logoImage={logoImage || undefined}
            backgroundColor={backgroundColor}
            textColor={textColor}
            overlayMode={overlayMode}
            socialLinks={socialLinks}
            modules={modules}
            isHydrated={isHydrated}
          />
        </div>
      </div>
    </div>
  )
}

export default function MiniSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MiniSiteLayoutContent>{children}</MiniSiteLayoutContent>
}
