import React, { useEffect, useState } from 'react'
import { Droplet, Trash2, Zap, Car, Heart } from 'lucide-react'
import { motion as Motion } from 'framer-motion'
import { getRecentActivities } from '@/api/stats'

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
  Lifestyle: {
    icon: Heart,
    color: 'text-emerald-400',
  },
}

const humanizeAction = (actionKey, quantity, unit) => {
  const map = {
    localproduct: `Local Product ( ${quantity} ${unit || ''})`,
    cycle: `Cycled ( ${quantity} ${unit || ''})`,
    rainwatercollection: `Rainwater Collection ( ${quantity} ${unit || ''})`,
    reusedItem: `Reused Items (${quantity} ${unit || ''})`,
    shorterShower: `Shorter Shower ( ${quantity} ${unit || ''})`,
    publicTransit: `Public Transit ( ${quantity} ${unit || ''})`,
    ev: `Electric Vehicle ( ${quantity} ${unit || ''})`,
    carpool: `Carpooled ( ${quantity} ${unit || ''})`,
    repairedItem: `Repaired Item ( ${quantity} ${unit || ''})`,
    turnedOffDevices: `Turned Off Devices ( ${quantity} ${unit || ''})`,
    reusedWater: `Reused Water ( ${quantity} ${unit || ''})`,
    rainwaterCollection: `Rainwater Collection ( ${quantity} ${unit || ''})`,
    fixLeak: `Fixed Leak ( ${quantity} ${unit || ''})`,
    compost: `Composted ( ${quantity} ${unit || ''})`,
    recycle: `Recycled ( ${quantity} ${unit || ''})`,
    zeroWasteShopping: `Zero Waste Shopping ( ${quantity} ${unit || ''})`,
    ledLight: `Used LED Lights ( ${quantity} ${unit || ''})`,
    solarPower: `Used Solar Power ( ${quantity} ${unit || ''})`,
    naturalLighting: `Used Natural Lighting ( ${quantity} ${unit || ''})`,
    localProduct: `Local Product ( ${quantity} ${unit || ''})`,
    Donate: `Donated ( ${quantity} ${unit || ''})`,
    plantMeal: `Plant Based Meal ( ${quantity} ${unit || ''})`,
    walk: `Walked ( ${quantity} ${unit || ''})`,
  }

  return map[actionKey] || actionKey
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

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
const filterActivities = (activities = [], filter) => {
  if (!Array.isArray(activities)) return []

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  if (filter === 'today') {
    return activities.filter((a) => a.timestamp >= todayStart)
  }

  if (filter === 'week') {
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
  const [filter] = useState('all')
  const [recentActivities, setRecentActivities] = useState([])
  const activities = filterActivities(recentActivities, filter)

  // Fetch recent activities from the backend
  useEffect(() => {
    const fetchRecentActivities = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const res = await getRecentActivities(userId)

      const normalized = (res.data || []).map((log) => ({
        _id: log._id,
        title: humanizeAction(log.actionKey, log.quantity, log.unit),
        timestamp: new Date(log.activityDate),
        category: capitalize(log.category),
        impact: `${log.co2.toFixed(2)} kg CO₂ saved`,
      }))

      setRecentActivities(normalized)
    }
    fetchRecentActivities()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Header */}
      <div className="bg-[#0a0f0d] border-b border-gray-800">
        <div className="px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-100 mb-3">
            Recent Activity
          </h1>
        </div>
      </div>

      {/* Activity List */}
      <div className="max-w-6xl mx-auto p-4">
        {activities.length > 0 ? (
          <div className="bg-[#0f1612] border border-gray-800 rounded-lg overflow-hidden">
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity._id}
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
