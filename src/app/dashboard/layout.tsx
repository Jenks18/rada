'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Calendar,
  Ticket,
  Link2,
  Image,
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  User,
  LogOut
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navigation: NavSection[] = [
    {
      title: 'Mini Site',
      items: [
        { title: 'Content', href: '/dashboard', icon: Home },
        { title: 'Header', href: '/dashboard/header', icon: User },
        { title: 'Social Links', href: '/dashboard/social', icon: Link2 },
        { title: 'Theme', href: '/dashboard/theme', icon: Settings },
      ]
    },
    {
      title: '',
      items: [
        { title: 'Monetization', href: '/dashboard/monetization', icon: DollarSign },
        { title: 'Email Marketing', href: '/dashboard/email', icon: MessageSquare },
        { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { title: 'Settings', href: '/dashboard/settings', icon: Settings },
        { title: 'Refer a Friend', href: '/dashboard/refer', icon: Users },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            {!collapsed && <span className="font-bold text-xl">Rada</span>}
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div> size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg
                  transition-colors relative group
                  ${isActive 
                    ? 'bg-purple-50 text-purple-600' 
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {navigation.map((section, sectionIdx) => (
            <div key={sectionIdx} className={sectionIdx > 0 ? 'mt-6' : ''}>
              {section.title && !collapsed && (
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-3 py-2.5 rounded-lg
                        transition-colors relative group
                        ${isActive 
                          ? 'bg-purple-50 text-purple-600' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      title={collapsed ? item.title : ''}
                    >
                      <span className={isActive ? 'text-purple-600' : 'text-gray-500'}>
                        <item.icon size={20} />
                      </span>
                      {!collapsed && (
                        <>
                          <span className="flex-1 font-medium text-sm">{item.title}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-50">
                          {item.title}
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-3">
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
              IN
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Ian Njenga
                </p>
                <p className="text-xs text-gray-500 truncate">Artist</p>
              </div>
            )}
            {!collapsed && (
              <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`
          transition-all duration-300
          ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}
        `}
      >
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <MessageSquare size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <Link
              href="/artists/iannjenga"
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg"
            >
              View Page
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
