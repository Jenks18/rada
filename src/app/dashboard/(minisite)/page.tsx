'use client'

import { Users, Calendar, Ticket, TrendingUp, DollarSign, Eye } from 'lucide-react'

const stats = [
  {
    title: 'Page Views',
    value: '2,847',
    change: '+12.5%',
    icon: <Eye size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Total Fans',
    value: '1,234',
    change: '+8.2%',
    icon: <Users size={24} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    title: 'Upcoming Events',
    value: '3',
    change: '2 this month',
    icon: <Calendar size={24} />,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    title: 'Tickets Sold',
    value: '432',
    change: '+23.1%',
    icon: <Ticket size={24} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  },
  {
    title: 'Revenue',
    value: 'KES 864K',
    change: '+18.9%',
    icon: <DollarSign size={24} />,
    color: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  {
    title: 'Growth Rate',
    value: '15.3%',
    change: 'vs last month',
    icon: <TrendingUp size={24} />,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  }
]

const recentEvents = [
  {
    title: 'Nviiri Live at The Alchemist',
    date: 'Dec 15, 2025',
    venue: 'The Alchemist Bar',
    sold: 85,
    capacity: 200,
    revenue: 'KES 170K'
  },
  {
    title: 'Nairobi Jazz Festival',
    date: 'Dec 28, 2025',
    venue: 'KICC Grounds',
    sold: 234,
    capacity: 500,
    revenue: 'KES 468K'
  },
  {
    title: 'New Year\'s Eve Concert',
    date: 'Dec 31, 2025',
    venue: 'Two Rivers Mall',
    sold: 113,
    capacity: 300,
    revenue: 'KES 226K'
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Ian! 👋</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your artist page</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentEvents.map((event, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.date} • {event.venue}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">
                        {event.sold} / {event.capacity} tickets sold
                      </span>
                      <span className="font-medium text-gray-900">
                        {Math.round((event.sold / event.capacity) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 text-right">
                  <p className="text-2xl font-bold text-gray-900">{event.revenue}</p>
                  <p className="text-sm text-gray-600 mt-1">Revenue</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow">
          <Calendar size={32} className="mb-3" />
          <h3 className="font-bold text-lg">Create Event</h3>
          <p className="text-sm text-purple-100 mt-1">Set up a new event and start selling tickets</p>
        </button>

        <button className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-purple-600 hover:shadow-lg transition-all">
          <Users size={32} className="mb-3 text-purple-600" />
          <h3 className="font-bold text-lg text-gray-900">Send Broadcast</h3>
          <p className="text-sm text-gray-600 mt-1">Message your fans via SMS or WhatsApp</p>
        </button>

        <button className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-purple-600 hover:shadow-lg transition-all">
          <TrendingUp size={32} className="mb-3 text-purple-600" />
          <h3 className="font-bold text-lg text-gray-900">View Analytics</h3>
          <p className="text-sm text-gray-600 mt-1">Deep dive into your performance metrics</p>
        </button>
      </div>
    </div>
  )
}
