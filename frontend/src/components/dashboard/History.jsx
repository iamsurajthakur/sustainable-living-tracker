import React, { useState } from 'react'

const History = () => {
  const [activeFilter, setActiveFilter] = useState('week')

  const periodSummary = {
    totalActivities: 23,
    co2Saved: 12.4,
    mostFrequentCategory: 'Transportation',
  }

  // Mock data - Activity History
  const activities = [
    {
      date: '2024-12-22',
      items: [
        {
          id: 1,
          name: 'Cycled to work',
          category: 'Transport',
          impact: 2.3,
          time: '08:30 AM',
        },
        {
          id: 2,
          name: 'Used reusable bag',
          category: 'Waste',
          impact: 0.5,
          time: '06:15 PM',
        },
      ],
    },
    {
      date: '2024-12-21',
      items: [
        {
          id: 3,
          name: 'Composted food scraps',
          category: 'Waste',
          impact: 1.2,
          time: '07:00 PM',
        },
        {
          id: 4,
          name: 'Public transport commute',
          category: 'Transport',
          impact: 1.8,
          time: '05:30 PM',
        },
        {
          id: 5,
          name: 'Meatless meal',
          category: 'Food',
          impact: 3.1,
          time: '12:00 PM',
        },
      ],
    },
    {
      date: '2024-12-20',
      items: [
        {
          id: 6,
          name: 'Recycled electronics',
          category: 'Waste',
          impact: 5.0,
          time: '03:00 PM',
        },
        {
          id: 7,
          name: 'Used solar charger',
          category: 'Energy',
          impact: 0.8,
          time: '10:00 AM',
        },
      ],
    },
  ]

  // Mock data - Challenge History
  const challenges = [
    {
      id: 1,
      name: 'Zero-Waste Week',
      completedDate: 'Dec 15, 2024',
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Plant-Based Month',
      completedDate: 'Nov 30, 2024',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Car-Free Challenge',
      completedDate: 'Dec 10, 2024',
      status: 'Failed',
    },
    {
      id: 4,
      name: 'Energy Saver Sprint',
      completedDate: 'In Progress',
      status: 'Ongoing',
    },
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCategoryIcon = (category) => {
    const icons = {
      Transport: '🚗',
      Waste: '♻️',
      Food: '🍽️',
      Energy: '⚡',
    }
    return icons[category] || '📊'
  }

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
      <div className="min-h-screen bg-[#0a0a0a] text-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-white mb-2">History</h1>
            <p className="text-gray-400">Review your sustainable actions</p>
          </div>

          {/* Date Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveFilter('today')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'today'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveFilter('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'week'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveFilter('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'month'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]'
              }`}
            >
              This Month
            </button>
          </div>

          {/* Period Summary */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Activities</p>
                <p className="text-3xl font-semibold text-white">
                  {periodSummary.totalActivities}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">CO₂ Saved</p>
                <p className="text-3xl font-semibold text-emerald-400">
                  {periodSummary.co2Saved} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Most Frequent</p>
                <p className="text-3xl font-semibold text-white">
                  {periodSummary.mostFrequentCategory}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div
            className="mb-6 max-h-[500px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
          >
            <h2 className="text-xl font-medium text-white mb-4">
              Activity Timeline
            </h2>
            <div className="space-y-4">
              {activities.map((day, dayIndex) => (
                <div key={day.date}>
                  <div className="text-sm font-medium text-gray-400 mb-2 ml-1">
                    {formatDate(day.date)}
                  </div>
                  <div className="space-y-2">
                    {day.items.map((activity, itemIndex) => (
                      <div
                        key={activity.id}
                        className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#252525] transition-colors animate-slideIn"
                        style={{
                          animationDelay: `${dayIndex * 0.1 + itemIndex * 0.05}s`,
                          opacity: 0,
                          animationFillMode: 'forwards',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl">
                              {getCategoryIcon(activity.category)}
                            </span>
                            <div>
                              <h3 className="font-medium text-white">
                                {activity.name}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {activity.category} • {activity.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-emerald-400">
                              {activity.impact} kg
                            </p>
                            <p className="text-xs text-gray-500">CO₂ saved</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge History */}
          <div
            className="max-h-[300px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
          >
            <h2 className="text-xl font-medium text-white mb-4">
              Challenge History
            </h2>
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
              {challenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className={`p-4 hover:bg-[#252525] transition-colors ${
                    index !== challenges.length - 1
                      ? 'border-b border-gray-800'
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white mb-1">
                        {challenge.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {challenge.completedDate}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        challenge.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : challenge.status === 'Failed'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {challenge.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default History
