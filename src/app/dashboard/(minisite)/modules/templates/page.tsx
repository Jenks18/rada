'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const templates = [
  {
    id: 1,
    name: 'Musician Starter',
    description: 'Perfect for artists promoting music and events',
    modules: ['Social Links', 'Latest Single', 'Upcoming Events', 'Merch'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Event Promoter',
    description: 'Focus on ticket sales and event details',
    modules: ['Featured Event', 'Ticket Types', 'Venue Map', 'Contact'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Merch Shop',
    description: 'Showcase and sell your merchandise',
    modules: ['Featured Products', 'Product Grid', 'Testimonials', 'Social Links'],
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Fan Engagement',
    description: 'Build community with interactive content',
    modules: ['Fan Wall', 'Challenges', 'Exclusive Content', 'Newsletter'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
  }
]

export default function ModulesTemplatesPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Choose a Template</h1>
          <p className="text-gray-600 mt-1">Start with a pre-designed layout</p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-purple-600 hover:shadow-lg transition-all cursor-pointer group"
          >
            {/* Template Preview Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>

              {/* Module Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.modules.map((module, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full"
                  >
                    {module}
                  </span>
                ))}
              </div>

              {/* Use Template Button */}
              <button className="w-full px-4 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                Use This Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Start from Scratch Option */}
      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Don't see what you're looking for?
        </h3>
        <p className="text-gray-600 mb-4">
          Start with a blank canvas and build exactly what you need
        </p>
        <Link
          href="/dashboard/modules/new"
          className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-medium rounded-lg hover:border-gray-900 hover:shadow-lg transition-all"
        >
          Start from Scratch
        </Link>
      </div>
    </div>
  )
}
