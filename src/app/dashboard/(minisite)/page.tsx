'use client'

import { useState } from 'react'
import { FileText, Smartphone, Plus } from 'lucide-react'

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hasContent, setHasContent] = useState(false)

  const handleStartFromScratch = () => {
    setShowOnboarding(false)
    setHasContent(true)
  }

  const handleStartWithTemplates = () => {
    setShowOnboarding(false)
    setHasContent(true)
    // In future: navigate to template picker
  }

  // Onboarding Modal
  if (showOnboarding && !hasContent) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50/50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
          {/* Modal Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              How would you like to create content for your mini-site?
            </h2>
          </div>

          {/* Modal Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start with Templates */}
              <button
                onClick={handleStartWithTemplates}
                className="group text-left p-6 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <FileText size={24} className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      Start with templates
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Browse our recommend templates to quickly create an engaging mini-site
                    </p>
                  </div>
                </div>
              </button>

              {/* Start from Scratch */}
              <button
                onClick={handleStartFromScratch}
                className="group text-left p-6 border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                    <Smartphone size={24} className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      Start from scratch
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Begin with a blank page and customize your mini-site to fit your needs
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty State (after choosing an option)
  return (
    <div className="h-full flex items-center justify-center bg-gray-50/50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No content yet</h2>
        <p className="text-gray-600 mb-6">
          Click the button below to get started
        </p>
        <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span className="font-medium">Add Content</span>
        </button>
      </div>
    </div>
  )
}
