import React, { useState } from 'react'
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { motion as Motion } from 'framer-motion'

const EnergyChart = () => {
  const [timePeriod, setTimePeriod] = useState('1month')

  // Sample data for different time periods
  const allData = {
    '1month': [
      { week: 'Week 1', value: 420 },
      { week: 'Week 2', value: 380 },
      { week: 'Week 3', value: 350 },
      { week: 'Week 4', value: 320 },
    ],
    '3months': [
      { week: 'Jan', value: 450 },
      { week: 'Feb', value: 400 },
      { week: 'Mar', value: 350 },
      { week: 'Apr', value: 320 },
      { week: 'May', value: 300 },
      { week: 'Jun', value: 280 },
    ],
    '6months': [
      { week: 'Jan', value: 480 },
      { week: 'Feb', value: 450 },
      { week: 'Mar', value: 420 },
      { week: 'Apr', value: 390 },
      { week: 'May', value: 360 },
      { week: 'Jun', value: 330 },
      { week: 'Jul', value: 310 },
      { week: 'Aug', value: 290 },
    ],
    '1year': [
      { week: 'Jan', value: 500 },
      { week: 'Feb', value: 480 },
      { week: 'Mar', value: 460 },
      { week: 'Apr', value: 440 },
      { week: 'May', value: 420 },
      { week: 'Jun', value: 400 },
      { week: 'Jul', value: 380 },
      { week: 'Aug', value: 360 },
      { week: 'Sep', value: 340 },
      { week: 'Oct', value: 320 },
      { week: 'Nov', value: 300 },
      { week: 'Dec', value: 280 },
    ],
  }

  const energyReduction = allData[timePeriod]

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const periods = [
    { id: '1month', label: '1M' },
    { id: '3months', label: '3M' },
    { id: '6months', label: '6M' },
    { id: '1year', label: '1Y' },
  ]

  return (
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.2, ease: 'easeIn' }}
      className="lg:col-span-2 bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] bg-[#292d2b] backdrop-blur-sm rounded-3xl p-6 border border-slate-800/50 shadow-xl"
    >
      {/* Header with title and period selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-green-400/80 text-xs md:text-sm font-semibold uppercase tracking-wider">
            Energy Reduction
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Track your energy savings over time
          </p>
        </div>

        {/* Time period selector */}
        <div className="flex gap-1 bg-slate-900/50 p-1 rounded-lg border border-slate-800/50">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setTimePeriod(period.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                timePeriod === period.id
                  ? 'bg-green-500/20 text-green-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div className="relative h-64 md:h-72 lg:h-80 w-full">
        <ResponsiveContainer width="100%" height={288}>
          <LineChart
            data={energyReduction}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#043919"
              strokeOpacity={0.2}
              vertical={false}
            />

            {/* X Axis */}
            <XAxis
              dataKey="week"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickLine={false} />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />

            {/* Gradient area under curve */}
            <defs>
              <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              fill="url(#colorEnergy)"
              fillOpacity={0.2}
            />

            {/* Main line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{
                r: 4,
                stroke: '#0f172a',
                strokeWidth: 2,
                fill: '#22c55e',
              }}
              activeDot={{
                r: 6,
                stroke: '#22c55e',
                strokeWidth: 2,
                fill: '#0f172a',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/50 flex flex-wrap gap-4 md:gap-6">
        <div>
          <p className="text-slate-500 text-xs">Total Saved</p>
          <p className="text-green-400 text-lg md:text-xl font-semibold mt-0.5">
            {energyReduction.reduce((acc, item) => acc + item.value, 0)} kWh
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Average</p>
          <p className="text-slate-300 text-lg md:text-xl font-semibold mt-0.5">
            {Math.round(
              energyReduction.reduce((acc, item) => acc + item.value, 0) /
                energyReduction.length
            )}{' '}
            kWh
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-xs">Trend</p>
          <p className="text-green-400 text-lg md:text-xl font-semibold mt-0.5 flex items-center gap-1">
            <span className="text-sm">↓</span> 12%
          </p>
        </div>
      </div>
    </Motion.div>
  )
}

export default EnergyChart
