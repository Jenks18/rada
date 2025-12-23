'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  
  // Check if user has content (in future: check from database)
  const hasContent = false // TODO: Replace with actual check from Supabase

  useEffect(() => {
    // If no content, show the modules modal overlay
    if (!hasContent) {
      router.push('/dashboard/modules')
    }
  }, [hasContent, router])

  // Empty State - Show background content (will be overlaid by /modules)
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No content yet</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to get started
        </p>
        <button 
          onClick={() => router.push('/dashboard/modules')}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus size={20} />
          <span>Add Content</span>
        </button>
      </div>
    </div>
  )
}
