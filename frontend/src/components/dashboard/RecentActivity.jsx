import React, { useState } from 'react'
import { Droplet, Trash2, Zap, Car } from 'lucide-react'
import { motion as Motion } from 'framer-motion'

// Mock data - replace with actual API data
const mockActivities = [
  {
    id: 1,
    title: 'Took 5-minute shower',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: 'Water',
    impact: 'Saved ~40L water',
  },
  {
    id: 2,
    title: 'Turned off unused devices',
    timestamp: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000
    ), // Yesterday
    category: 'Energy',
    impact: 'Saved ~0.5 kWh',
  },
  {
    id: 3,
    title: 'Composted food scraps',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    category: 'Waste',
    impact: 'Diverted 0.3kg from landfill',
  },
  {
    id: 4,
    title: 'Used reusable water bottle',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    category: 'Waste',
    impact: 'Avoided 1 plastic bottle',
  },
  {
    id: 5,
    title: 'Carpooled with colleagues',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    category: 'Transport',
    impact: 'Saved 2kg CO₂',
  },
  {
    id: 6,
    title: 'Fixed leaking faucet',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    category: 'Water',
    impact: 'Prevented 20L daily waste',
  },
]

// Category configuration - Dark theme
const categoryConfig = {
  Waste: {
    icon: Trash2,
    color: 'text-green-400',
  },
  Water: {
    icon: Droplet,
    color: 'text-blue-400',
  },
  Energy: {
    icon: Zap,
    color: 'text-yellow-400',
  },
  Transport: {
    icon: Car,
    color: 'text-emerald-400',
  },
}

// Helper function to get relative time
const getRelativeTime = (timestamp) => {
  const now = new Date()
  const diffMs = now - timestamp
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) {
    return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`
  } else if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return timestamp.toLocaleDateString()
  }
}

// Filter function
const filterActivities = (activities, filter) => {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  if (filter === 'today') {
    return activities.filter((a) => a.timestamp >= todayStart)
  } else if (filter === 'week') {
    return activities.filter((a) => a.timestamp >= weekStart)
  }
  return activities
}

// ActivityItem Component
const ActivityItem = ({ activity, index }) => {
  const config = categoryConfig[activity.category]
  const Icon = config.icon

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex items-start gap-3 p-4 border-b border-gray-700 hover:bg-green-900/10 transition-colors"
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full ${config.bg} flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white-200 leading-tight mb-1">
          {activity.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-[#999aa6]">
          <span>{getRelativeTime(activity.timestamp)}</span>
          {activity.impact && (
            <>
              <span>•</span>
              <span className="text-green-400">{activity.impact}</span>
            </>
          )}
        </div>
      </div>
    </Motion.div>
  )
}

// RecentActivity Component
const RecentActivity = () => {
  const [filter, setFilter] = useState('all')
  const activities = filterActivities(mockActivities, filter)

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Header */}
      <div className="bg-[#0a0f0d] border-b border-gray-800">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-100 mb-3">
            Recent Activity
          </h1>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['all', 'today', 'week'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {f === 'all' ? 'All' : f === 'today' ? 'Today' : 'This Week'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="max-w-6xl mx-auto p-4">
        {activities.length > 0 ? (
          <div className="bg-[#0f1612] border border-gray-800 rounded-lg overflow-hidden">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <Droplet className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-gray-300 text-center font-medium">
              {filter === 'today'
                ? 'No activity today yet'
                : filter === 'week'
                  ? 'No activity this week yet'
                  : 'No recent activity yet'}
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Start tracking your sustainable actions!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentActivity
