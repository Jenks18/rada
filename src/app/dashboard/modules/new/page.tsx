'use client'

import { ArrowLeft, Link as LinkIcon, Image, Type, Calendar, DollarSign, FileText, Music, Radio, Youtube, ShoppingBag, Ticket, Mail, Tag, Lock, CreditCard } from 'lucide-react'
import Link from 'next/link'

const contentModules = [
  { icon: LinkIcon, title: 'External Link', description: 'Link an external website of your choice' },
  { icon: Image, title: 'Media Gallery', description: 'Showcase your photos and videos' },
  { icon: Type, title: 'Text', description: 'Add a free text box' },
]

const monetizationModules = [
  { icon: Calendar, title: '1 to 1 Session', description: 'Sell 1 to 1 experiences, such as coaching sessions' },
  { icon: FileText, title: 'Course', description: 'Sell your expertise with a course and earn revenue' },
  { icon: DollarSign, title: 'Affiliate Product', description: 'Earn commission on products you recommend' },
  { icon: FileText, title: 'Document', description: 'Sell guides, eBooks and PDFs' },
  { icon: LinkIcon, title: 'Link', description: 'Sell access to any file format' },
  { icon: Image, title: 'Media File', description: 'Sell images, videos and audio files' },
]

const commerceModules = [
  { icon: ShoppingBag, title: 'Custom Product', description: 'Link your products on an external store' },
]

const audioModules = [
  { icon: Music, title: 'Music', description: 'Smart Link, Pre-Save and Custom Pre-Save' },
  { icon: Radio, title: 'Podcast', description: 'Add a single or a collection of podcast episodes' },
]

const videoModules = [
  { icon: Youtube, title: 'YouTube', description: 'Add a single video or a playlist or a channel', iconColor: 'text-red-600' },
  { icon: Youtube, title: 'YouTube Shorts', description: 'Add a single Short video or a playlist or a channel', iconColor: 'text-red-600' },
  { icon: Music, title: 'TikTok', description: 'Add videos from a TikTok channel', iconColor: 'text-gray-900' },
]

const eventModules = [
  { icon: Ticket, title: 'Custom Event', description: 'Add a link to tickets for your concerts and events' },
  { icon: Ticket, title: 'BandsInTown', description: 'Link your products on an external store', iconColor: 'text-cyan-500' },
  { icon: Calendar, title: 'Seated', description: 'Automatically add all your events from Seated', iconColor: 'text-gray-900' },
]

const dataCaptureModules = [
  { icon: Mail, title: 'Contact Form', description: 'Create a form for fan and business inquiries' },
  { icon: FileText, title: 'Free Download', description: 'Give away a free download and collect contact details' },
  { icon: Mail, title: 'Email/SMS Signup', description: 'Collect fan emails and phone number' },
  { icon: LinkIcon, title: 'Secret Link', description: 'Give access to exclusive content and collect contact details' },
  { icon: Tag, title: 'Secret Code', description: 'Give access to exclusive promotions and collect contact details' },
]

const tipsModules = [
  { icon: CreditCard, title: 'PayPal', description: 'Add your PayPal link', iconColor: 'text-blue-600' },
  { icon: CreditCard, title: 'Venmo', description: 'Add your Venmo link', iconColor: 'text-blue-500' },
  { icon: CreditCard, title: 'Cash App', description: 'Add your Cash App link', iconColor: 'text-green-600' },
  { icon: CreditCard, title: 'Patreon', description: 'Add your Patreon link', iconColor: 'text-orange-600' },
]

interface ModuleCardProps {
  icon: any
  title: string
  description: string
  iconColor?: string
}

function ModuleCard({ icon: Icon, title, description, iconColor = 'text-gray-700' }: ModuleCardProps) {
  return (
    <button className="flex items-start space-x-4 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all text-left w-full">
      <Icon size={24} className={`flex-shrink-0 mt-1 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-tight">{description}</p>
      </div>
    </button>
  )
}

interface ModuleSectionProps {
  title: string
  modules: Array<{ icon: any; title: string; description: string; iconColor?: string }>
}

function ModuleSection({ title, modules }: ModuleSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module, idx) => (
          <ModuleCard key={idx} {...module} />
        ))}
      </div>
    </div>
  )
}

export default function ModulesNewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/dashboard/modules"
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Add Content</h1>
        </div>

        {/* Module Sections */}
        <div className="space-y-8">
          <ModuleSection title="CONTENT" modules={contentModules} />
          <ModuleSection title="MONETIZATION" modules={monetizationModules} />
          <ModuleSection title="COMMERCE" modules={commerceModules} />
          <ModuleSection title="AUDIO" modules={audioModules} />
          <ModuleSection title="VIDEO" modules={videoModules} />
          <ModuleSection title="EVENT" modules={eventModules} />
          <ModuleSection title="DATA CAPTURE" modules={dataCaptureModules} />
          <ModuleSection title="TIPS" modules={tipsModules} />
        </div>
      </div>
    </div>
  )
}
