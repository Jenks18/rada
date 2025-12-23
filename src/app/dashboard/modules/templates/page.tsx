'use client'

import { useState } from 'react'
import { Music, Youtube, Mail, Ticket, Tag, Radio, Gift, ShoppingBag, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const goalOptions = [
  { icon: Music, label: 'Share your music', id: 'music' },
  { icon: Youtube, label: 'Share your YouTube videos', id: 'youtube' },
  { icon: Music, label: 'Share your TikTok videos', id: 'tiktok' },
  { icon: Mail, label: 'Collect contacts', id: 'contacts' },
  { icon: Ticket, label: 'Sell your event tickets', id: 'tickets' },
  { icon: ShoppingBag, label: 'Recommend your favorite products', id: 'products' },
  { icon: Tag, label: 'Share your discount codes', id: 'discounts' },
  { icon: Radio, label: 'Share your podcast', id: 'podcast' },
  { icon: Gift, label: 'Sell your products', id: 'sell-products' },
  { icon: Radio, label: 'Highlight your brand partners', id: 'partners' },
  { icon: Mail, label: 'Accept business inquiries', id: 'inquiries' },
]

export default function ModulesTemplatesPage() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    )
  }

  const handleNext = () => {
    if (selectedGoals.length === 0) return
    
    // Store selected goals in localStorage for the content page to use
    localStorage.setItem('selectedGoals', JSON.stringify(selectedGoals))
    
    // Redirect to content page
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            What do you want to do with your mini-site?
          </h1>
          <p className="text-gray-600">
            Select as many options and we'll help you build it.
          </p>
        </div>

        {/* Goal Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {goalOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedGoals.includes(option.id)
            
            return (
              <button
                key={option.id}
                onClick={() => toggleGoal(option.id)}
                className={`
                  flex items-center space-x-3 p-4 rounded-lg border-2 transition-all text-left bg-white
                  ${isSelected 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <Icon size={20} className="text-gray-700 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <Link
            href="/dashboard/modules"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium bg-white"
          >
            Previous
          </Link>
          
          <button
            onClick={handleNext}
            disabled={selectedGoals.length === 0}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-colors
              ${selectedGoals.length > 0
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
