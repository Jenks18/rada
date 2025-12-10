'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Users,
  TrendingUp,
  Megaphone,
  Upload,
  Link as LinkIcon,
  ShoppingBag,
  Settings,
  Menu,
  X,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface StudioLayoutProps {
  children: React.ReactNode
  artist: {
    stageName: string
    slug: string
    avatar?: string
    isPro: boolean
  }
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/studio' },
  { icon: Calendar, label: 'Events', href: '/studio/events' },
  { icon: Users, label: 'Fans & CRM', href: '/studio/fans' },
  { icon: TrendingUp, label: 'Analytics', href: '/studio/analytics' },
  { icon: LinkIcon, label: 'Channel Manager', href: '/studio/channels' },
  { icon: Upload, label: 'Drops', href: '/studio/drops' },
  { icon: Megaphone, label: 'Broadcasts', href: '/studio/broadcasts' },
  { icon: ShoppingBag, label: 'Merch', href: '/studio/merch' },
  { icon: Settings, label: 'Settings', href: '/studio/settings' },
]

export function StudioLayout({ children, artist }: StudioLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <Link href="/studio" className="text-xl font-bold">
              RADA <span className="text-xs text-gray-500">STUDIO</span>
            </Link>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src={artist.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">
              {artist.stageName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-72 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/studio" className="text-2xl font-bold block">
              RADA <span className="text-xs text-gray-500">STUDIO</span>
            </Link>
          </div>

          {/* Artist Info */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={artist.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600">
                  {artist.stageName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white truncate">{artist.stageName}</p>
                  {artist.isPro && <Crown className="h-4 w-4 text-yellow-500" />}
                </div>
                <p className="text-sm text-gray-400">rada.to/{artist.slug}</p>
              </div>
            </div>
            <Link href={`/${artist.slug}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Public Page
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer",
                        isActive
                          ? "bg-white text-black font-semibold"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Pro Badge */}
          {!artist.isPro && (
            <div className="p-4 border-t border-gray-800">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
                <Crown className="h-6 w-6 text-yellow-500 mb-2" />
                <h4 className="font-semibold text-white mb-1">Upgrade to Pro</h4>
                <p className="text-xs text-gray-400 mb-3">
                  Unlock advanced features and remove branding
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
