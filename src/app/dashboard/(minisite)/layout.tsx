'use client'

import MiniSitePreview from '@/components/MiniSitePreview'
import { Link as LinkIcon } from 'lucide-react'

export default function MiniSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar - Spans entire width */}
      <div className="h-16 bg-white flex items-center justify-center px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <LinkIcon size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">yazzy.komi.io</span>
          </div>
          <span className="text-sm text-gray-500">Saving...</span>
          <button className="px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            PUBLISH
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
        <div className="w-1/2 overflow-y-auto bg-white relative">
          <MiniSitePreview />
        </div>
      </div>
    </div>
  )
}
