import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from 'recharts'
import { motion as Motion } from 'framer-motion'
import { TrendingDown, Zap, Calendar } from 'lucide-react'
import { getChartData } from '@/api/stats'

const EnergyChart = () => {
  const [energyReduction, setEnergyReduction] = useState([])
  const [loading, setLoading] = useState(true)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const fillMissingDays = (data) => {
    if (data.length === 0) return []

    const start = new Date(data[0].week)
    const end = new Date(data[data.length - 1].week)

    const map = {}
    data.forEach((d) => (map[d.week] = d.value))

    const filled = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
      filled.push({ week: key, value: map[key] || 0 })
    }

    return filled
  }

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true)
        const userData = JSON.parse(localStorage.getItem('user'))
        const userId = userData.user._id

        const res = await getChartData(userId)
        const chartData = fillMissingDays(
          res.data.map((item) => ({
            week: new Date(item.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            value: item.value,
          }))
        )
        setEnergyReduction(chartData)
      } catch (error) {
        console.error('Error fetching chart data:', error)
        setEnergyReduction([])
      } finally {
        setLoading(false)
      }
    }
    fetchChartData()
  }, [])

  const totalSaved = energyReduction.reduce((acc, item) => acc + item.value, 0)
  const averageSaved =
    energyReduction.length > 0
      ? Math.round(totalSaved / energyReduction.length)
      : 0
  const peakSaving =
    energyReduction.length > 0
      ? Math.max(...energyReduction.map((item) => item.value))
      : 0

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-emerald-950/95 backdrop-blur-sm border border-green-500/30 rounded-xl p-3 shadow-2xl">
          <p className="text-emerald-200 text-xs font-medium mb-1.5">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <p className="text-green-400 text-sm font-bold">
              {payload[0].value.toFixed(2)} kWh
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="lg:col-span-2 bg-[#1a2520] backdrop-blur-sm rounded-2xl p-6 border border-emerald-900/30 shadow-2xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">
              Energy Reduction Over Time
            </h3>
            <p className="text-emerald-200/60 text-sm mt-0.5">
              Track your daily CO₂ savings and environmental impact
            </p>
          </div>
        </div>
      </div>

      {/* Chart container */}
      {loading ? (
        <div className="h-72 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-emerald-200/60 text-sm">Loading your data...</p>
          </div>
        </div>
      ) : energyReduction.length === 0 ? (
        <div className="h-72 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-800/30 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-emerald-600/60" />
            </div>
            <h4 className="text-emerald-100 text-lg font-semibold mb-2">
              No Data Available Yet
            </h4>
            <p className="text-emerald-200/60 text-sm">
              Start tracking your energy savings today. Your data will appear
              here as you make progress.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-72 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={energyReduction}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#065f46"
                  strokeOpacity={0.15}
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="week"
                  tick={{ fill: '#86efac', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#065f46', strokeWidth: 1 }}
                  dy={10}
                />

                <YAxis
                  tick={{ fill: '#86efac', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#065f46', strokeWidth: 1 }}
                  label={{
                    value: 'kWh Saved',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: '#86efac', fontSize: 12 },
                  }}
                />

                <Tooltip content={<CustomTooltip />} />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fill="url(#colorEnergy)"
                  dot={{
                    r: 4,
                    stroke: '#22c55e',
                    strokeWidth: 2,
                    fill: '#0f172a',
                  }}
                  activeDot={{
                    r: 6,
                    stroke: '#22c55e',
                    strokeWidth: 3,
                    fill: '#0f172a',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats footer */}
          <div className="pt-5 border-t border-emerald-900/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <p className="text-white-300/70 text-xs font-medium uppercase tracking-wide">
                    Total Saved
                  </p>
                </div>
                <p className="text-white-400 text-2xl font-bold">
                  {totalSaved.toFixed(1)}
                  <span className="text-sm font-normal text-emerald-300/60 ml-1">
                    kWh
                  </span>
                </p>
              </div>

              <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400/50"></div>
                  <p className="text-white-300/70 text-xs font-medium uppercase tracking-wide">
                    Daily Avg
                  </p>
                </div>
                <p className="text-emerald-100 text-2xl font-bold">
                  {averageSaved}
                  <span className="text-sm font-normal text-emerald-300/60 ml-1">
                    kWh
                  </span>
                </p>
              </div>

              <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-400/50"></div>
                  <p className="text-white-300/70 text-xs font-medium uppercase tracking-wide">
                    Peak Day
                  </p>
                </div>
                <p className="text-emerald-100 text-2xl font-bold">
                  {peakSaving.toFixed(1)}
                  <span className="text-sm font-normal text-emerald-300/60 ml-1">
                    kWh
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </Motion.div>
  )
}

export default EnergyChart
