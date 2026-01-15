import { getTotalActivities, getUserTimeline } from '@/api/stats'
import { getUserCo2 } from '@/api/action'
import React, { useEffect, useState } from 'react'

const History = () => {
  const [activeFilter, setActiveFilter] = useState('week')
  const [userTimeline, setUserTimeline] = useState([])
  const [, setLoading] = useState(false)
  const [, setError] = useState(null)
  const [co2Saved, setCo2Saved] = useState(0)
  const [totalActivities, setTotalActivities] = useState(0)

  //fetch user co2 from backend
  useEffect(() => {
    const fetchCO2 = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const res = await getUserCo2(userId)
      setCo2Saved(res.data.data.totalCO2.toFixed(2))
    }
    fetchCO2()
  }, [])

  // Fetch user timeline data from backend
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true)
        setError(null)

        const userData = JSON.parse(localStorage.getItem('user'))
        const userId = userData.user._id

        const res = await getUserTimeline(userId)

        const formatted = res.data.map((day) => ({
          date: new Date(day._id).toLocaleDateString(), // convert ISO -> human date
          items: day.items.map((item) => ({
            ...item,
            name: humanizeAction(item.actionKey, item.quantity, item.unit),
            time: new Date(item.time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        }))

        setUserTimeline(formatted)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch timeline')
      } finally {
        setLoading(false)
      }
    }

    fetchTimeline()
  }, [])

  // Fetch user total activities from backend
  useEffect(() => {
    const fetchTotalActivities = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const res = await getTotalActivities(userId)
      setTotalActivities(res.data)
    }
    fetchTotalActivities()
  }, [])

  function humanizeAction(actionKey, quantity, unit) {
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

  const getCategoryIcon = (category) => {
    const icons = {
      transport: '🚗',
      waste: '♻️',
      food: '🍽️',
      energy: '⚡',
      water: '💧',
      lifestyle: '🌿',
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
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#141414] rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 border border-gray-800/50 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {/* Total Activities */}
              <div className="group bg-gradient-to-br from-[#202020] to-[#1a1a1a] rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-800/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                    Total Activities
                  </p>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg sm:text-xl">📊</span>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {totalActivities}
                </p>
                <div className="mt-2 h-1 w-12 sm:w-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>

              {/* CO₂ Saved */}
              <div className="group bg-gradient-to-br from-[#202020] to-[#1a1a1a] rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-800/30 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                    CO₂ Saved
                  </p>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg sm:text-xl">🌱</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 sm:gap-1.5">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400">
                    {co2Saved}
                  </p>
                  <span className="text-sm sm:text-base font-semibold text-emerald-400/70">
                    kg
                  </span>
                </div>
                <div className="mt-2 h-1 w-12 sm:w-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              </div>

              {/* Most Frequent */}
              <div className="group bg-gradient-to-br from-[#202020] to-[#1a1a1a] rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-800/30 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">
                    Most Frequent
                  </p>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg sm:text-xl">⭐</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white capitalize truncate">
                  Transportation
                </p>
                <div className="mt-2 h-1 w-12 sm:w-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div
            className="mb-6 max-h-[500px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
          >
            <h2 className="sticky top-0 z-20 text-xl font-medium text-white mb-4 bg-[#0a0a0a] p-4">
              Activity Timeline
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {userTimeline.map((day, dayIndex) => (
                <div key={day.date} className="space-y-2 sm:space-y-3">
                  {/* Date Header with divider */}
                  <div className="flex items-center gap-2 sm:gap-3 px-0.5 sm:px-1">
                    <div className="text-xs sm:text-sm font-semibold text-gray-400 tracking-wide whitespace-nowrap">
                      {day.date}
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
                  </div>

                  {/* Activity Cards */}
                  <div className="space-y-2 sm:space-y-3">
                    {day.items.map((activity, itemIndex) => (
                      <div
                        key={activity.id}
                        className="group bg-gradient-to-br from-[#1a1a1a] to-[#141414] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-gray-800/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer animate-slideIn"
                        style={{
                          animationDelay: `${dayIndex * 0.1 + itemIndex * 0.05}s`,
                          opacity: 0,
                          animationFillMode: 'forwards',
                        }}
                      >
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                          {/* Left Section: Icon + Details */}
                          <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 flex-1 min-w-0">
                            {/* Icon Container */}
                            <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-xl sm:text-2xl">
                                {getCategoryIcon(activity.category)}
                              </span>
                            </div>

                            {/* Text Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1 truncate">
                                {activity.name}
                              </h3>
                              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                                <span className="capitalize font-medium text-emerald-400/80">
                                  {activity.category}
                                </span>
                                <span className="text-gray-600 hidden xs:inline">
                                  •
                                </span>
                                <span className="font-mono text-xs sm:text-sm">
                                  {activity.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Section: CO2 Impact */}
                          <div className="flex-shrink-0 text-right">
                            <div className="flex items-baseline gap-0.5 sm:gap-1 justify-end mb-0.5 sm:mb-1">
                              <span className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-400">
                                {activity.co2}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-emerald-400/70">
                                kg
                              </span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wide whitespace-nowrap">
                              CO₂ saved
                            </p>
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
            <h2 className="sticky top-0 z-20 text-xl font-medium text-white mb-4 bg-[#0a0a0a] p-4">
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
