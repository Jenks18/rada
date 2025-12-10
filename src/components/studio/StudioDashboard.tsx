'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatsCard, MetricGrid } from '@/components/analytics/StatsCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  Eye,
  Music,
  Ticket,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { motion } from 'framer-motion'

interface DashboardData {
  overview: {
    totalRevenue: number
    revenueChange: string
    totalFans: number
    fansChange: string
    pageViews: number
    pageViewsChange: string
    upcomingEvents: number
  }
  recentEvents: Array<{
    id: string
    title: string
    date: string
    venue: string
    soldTickets: number
    totalCapacity: number
    revenue: number
  }>
  topFans: Array<{
    id: string
    name: string
    totalSpent: number
    avatar?: string
  }>
  recentActivities: Array<{
    id: string
    type: string
    description: string
    timestamp: string
  }>
}

interface StudioDashboardProps {
  data: DashboardData
}

export function StudioDashboard({ data }: StudioDashboardProps) {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening with your music.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/studio/events/new">
            <Button variant="primary" className="gap-2">
              <Calendar className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
          <Link href="/studio/drops/new">
            <Button variant="secondary" className="gap-2">
              <Plus className="h-4 w-4" />
              New Drop
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <MetricGrid>
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(data.overview.totalRevenue)}
          change={data.overview.revenueChange}
          changeType="positive"
          icon={<DollarSign className="h-6 w-6 text-green-400" />}
        />
        <StatsCard
          title="Total Fans"
          value={formatNumber(data.overview.totalFans)}
          change={data.overview.fansChange}
          changeType="positive"
          icon={<Users className="h-6 w-6 text-purple-400" />}
        />
        <StatsCard
          title="Page Views"
          value={formatNumber(data.overview.pageViews)}
          change={data.overview.pageViewsChange}
          changeType="positive"
          icon={<Eye className="h-6 w-6 text-blue-400" />}
        />
        <StatsCard
          title="Upcoming Events"
          value={data.overview.upcomingEvents}
          icon={<Calendar className="h-6 w-6 text-pink-400" />}
        />
      </MetricGrid>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Track your event performance</CardDescription>
              </div>
              <Link href="/studio/events">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-white">{event.title}</h4>
                      <Badge variant="primary" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{event.venue}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                      <Ticket className="h-4 w-4" />
                      <span>{event.soldTickets}/{event.totalCapacity}</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {formatCurrency(event.revenue)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Fans */}
        <Card>
          <CardHeader>
            <CardTitle>Top Supporters</CardTitle>
            <CardDescription>Your biggest fans this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topFans.map((fan, i) => (
                <motion.div
                  key={fan.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-sm">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{fan.name}</p>
                    <p className="text-sm text-gray-400">{formatCurrency(fan.totalSpent)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link href="/studio/fans">
              <Button variant="ghost" size="sm" className="w-full mt-4">
                View All Fans
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to grow your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/studio/broadcasts/new">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Music className="h-6 w-6" />
                <span>Send Broadcast</span>
              </Button>
            </Link>
            <Link href="/studio/drops/new">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Create Drop</span>
              </Button>
            </Link>
            <Link href="/studio/analytics">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </Link>
            <Link href="/studio/settings/page">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Eye className="h-6 w-6" />
                <span>Edit Page</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
