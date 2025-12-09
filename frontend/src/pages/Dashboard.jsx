import React, { useState } from 'react'
import { TrendingDown, Zap, Droplets, Flame, Award, Leaf } from 'lucide-react'

const Dashboard = () => {
  const [co2Data] = useState({
    thisWeek: 42.2,
    changePercent: -12,
  })

  const [energyReduction] = useState([
    { month: 'Week 1', value: 85 },
    { month: 'Week 2', value: 90 },
    { month: 'Week 3', value: 110 },
    { month: 'Week 4', value: 95 },
    { month: 'Week 5', value: 88 },
    { month: 'Week 6', value: 75 },
    { month: 'Week 7', value: 70 },
    { month: 'Week 8', value: 65 },
  ])

  const maxValue = Math.max(...energyReduction.map((d) => d.value))

  return (
    <div className="bg-gray-900 p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* --------------Top Row: Stats Cards--------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CO2 Card */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="space-y-2">
              <h3 className="text-gray-400 text-sm font-light">
                this week CO2
              </h3>
              <div className="flex items-end gap-4">
                <p className="text-4xl font-light text-white">
                  {co2Data.thisWeek}Kg
                </p>
                <div className="flex items-center gap-1 pb-1">
                  <span className="text-gray-400 text-xs">
                    change vs last week
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-green-500 font-medium">
                  {co2Data.changePercent}%
                </span>
              </div>
            </div>
          </div>

          {/* -----------Energy Usage Card------------- */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-light mb-4">
              energy usage
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-light">electricity</span>
              </div>
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-white font-light">gas</span>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="text-white font-light">water</span>
              </div>
            </div>
          </div>

          {/* -----------------------Achievements Card------------------ */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-light mb-4">
              sustainable action completed
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-green-500" />
                <span className="text-white font-light">
                  eco-challenge completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* -----------------Bottom Row------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --------------Chart Card: Takes 2 columns-------------- */}
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-light mb-6">
              how much energy reduced over this month
            </h3>
            <div className="relative h-64">
              <svg
                className="w-full h-full"
                viewBox="0 0 600 250"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  points={energyReduction
                    .map((d, i) => {
                      const x = (i / (energyReduction.length - 1)) * 580 + 10
                      const y = 240 - (d.value / maxValue) * 200
                      return `${x},${y}`
                    })
                    .join(' ')}
                />
              </svg>
            </div>
          </div>

          {/* --------------Tips Card------------------ */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-gray-400 text-sm font-light mb-4">
              Quick Insight & Tips
            </h3>
            <div className="bg-gray-900 rounded-xl p-4 space-y-6 border border-gray-700">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm font-light">
                    your electricity usuage is less by 10% this month
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm font-light">
                    try biking or cycling to reduce carbon waste by 5kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
