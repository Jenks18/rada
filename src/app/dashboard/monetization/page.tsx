'use client'

import { 
  Calendar, 
  FileText, 
  Link as LinkIcon, 
  GraduationCap, 
  Image as ImageIcon, 
  ShoppingBag,
  Users
} from 'lucide-react'

const monetizationOptions = [
  {
    icon: <Calendar size={24} />,
    title: '1 to 1 Session',
    description: 'Sell 1 to 1 experiences, such as coaching sessions',
    href: '/dashboard/monetization/sessions'
  },
  {
    icon: <GraduationCap size={24} />,
    title: 'Course',
    description: 'Sell your expertise with a course and earn revenue',
    href: '/dashboard/monetization/courses'
  },
  {
    icon: <Users size={24} />,
    title: 'Affiliate Product',
    description: 'Earn commission on products you recommend',
    href: '/dashboard/monetization/affiliates'
  },
  {
    icon: <FileText size={24} />,
    title: 'Document',
    description: 'Sell guides, eBooks and PDFs',
    href: '/dashboard/monetization/documents'
  },
  {
    icon: <LinkIcon size={24} />,
    title: 'Link',
    description: 'Sell access to any file format',
    href: '/dashboard/monetization/links'
  },
  {
    icon: <ImageIcon size={24} />,
    title: 'Media File',
    description: 'Sell images, videos and audio files',
    href: '/dashboard/monetization/media'
  }
]

const tutorials = [
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
    title: 'Getting Started: Earn Like the World\'s Top Creators',
    category: 'Getting Started'
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
    title: 'From Corporate Career to $20K/Month Creator',
    category: 'Success Stories'
  }
]

export default function MonetizationPage() {
  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Monetization</h1>
        <p className="text-gray-600 mt-1">Start earning from your audience</p>
      </div>

      {/* Start Selling Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Start Selling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monetizationOptions.map((option, index) => (
            <button
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-600 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                  {option.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Get Started Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Get started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
                <img 
                  src={tutorial.image} 
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                  {tutorial.category}
                </p>
                <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State for Existing Products */}
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">
            Start selling by creating your first digital product
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
            Create Your First Product
          </button>
        </div>
      </div>
    </div>
  )
}
