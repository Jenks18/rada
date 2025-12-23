'use client'

import MiniSitePreview from '@/components/MiniSitePreview'

export default function MiniSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full bg-white">
      {/* Left Editor Panel - 50% */}
      <div className="w-1/2 overflow-y-auto bg-gray-50">
        {children}
      </div>

      {/* Right Preview Panel - 50% - PERSISTENT */}
      <div className="w-1/2 overflow-y-auto bg-white">
        <MiniSitePreview />
      </div>
    </div>
  )
}
