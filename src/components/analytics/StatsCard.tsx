'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: ReactNode
  trend?: number[]
}

export function StatsCard({ title, value, change, changeType = 'neutral', icon, trend }: StatsCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-6 hover:border-gray-700 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-gray-800/50">
            {icon}
          </div>
        )}
      </div>
      
      {change && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${changeColors[changeType]}`}>
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last period</span>
        </div>
      )}

      {trend && trend.length > 0 && (
        <div className="mt-4 h-12 flex items-end gap-1">
          {trend.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-purple-600/30 to-purple-600/10 rounded-t"
              style={{ height: `${(value / Math.max(...trend)) * 100}%` }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

interface MetricGridProps {
  children: ReactNode
}

export function MetricGrid({ children }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  )
}
