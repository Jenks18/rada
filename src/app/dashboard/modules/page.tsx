'use client'

import Link from 'next/link'
import { FileText, Smartphone } from 'lucide-react'

export default function ModulesPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
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
            <Link
              href="/dashboard/modules/templates"
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
            </Link>

            {/* Start from Scratch */}
            <Link
              href="/dashboard/modules/new"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
