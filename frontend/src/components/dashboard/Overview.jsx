/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  TrendingUp,
  Zap,
  Droplets,
  Flame,
  Award,
  Leaf,
  AlertCircle,
} from 'lucide-react'
import TinySparkline from '@/components/charts/TinySparkline'
import EnergyChart from '@/components/dashboard/ChartCard'
import { getUserCo2 } from '@/api/action'
import { getEnergyStats } from '@/api/stats'

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
}
const specialCard = {
  hidden: { opacity: 0, rotate: -3, y: 20 },
  show: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}
const statConfig = {
  energy: { label: 'Electricity', icon: Zap, color: 'yellow' },
  water: { label: 'Water', icon: Droplets, color: 'blue' },
  transport: { label: 'Transport', icon: Flame, color: 'orange' },
}
const insights = [
  {
    id: 'energy',
    icon: Zap,
    color: 'yellow',
    title: 'Energy awareness',
    text: 'Energy use adds up quietly. Reviewing how and when you use electricity is often the easiest place to start reducing impact.',
  },
  {
    id: 'transport',
    icon: Leaf,
    color: 'green',
    title: 'Everyday travel',
    text: 'Short, frequent trips usually create more emissions than people expect. Small changes here tend to have outsized effects.',
  },
  {
    id: 'consistency',
    icon: TrendingUp,
    color: 'blue',
    title: 'Build the habit',
    text: 'Tracking regularly matters more than being perfect. Even rough inputs help build a clearer picture over time.',
  },
  {
    id: 'missed-data',
    icon: AlertCircle,
    color: 'orange',
    title: 'Incomplete picture',
    text: 'Some areas aren’t being tracked yet. Filling in missing activities makes future insights more accurate and useful.',
  },
]

const Overview = () => {
  const [co2Saved, setCo2Saved] = useState(0)
  const [stats, setStats] = useState([])

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

  //fetch user energy stats from backend
  useEffect(() => {
    const fetchEnergyStats = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const data = await getEnergyStats(userId)
      setStats(data.data)
    }
    fetchEnergyStats()
  }, [])

  const categories = ['energy', 'water', 'transport']
  const mappedStats = categories.map((cat) => {
    const item = stats.find((s) => s.category === cat) // use 'category' instead of '_id'
    return {
      category: cat,
      count: item?.count || 0,
      totalQuantity: item?.totalQuantity || 0,
      trend: item?.trend || [], // include trend for TinySparkline
    }
  })

  return (
    <div className="bg-[#08120d] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Row: Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* -----------CO2 Card--------------- */}
          <Motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden"
          >
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider">
                  Total CO₂ saved
                </h3>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-6xl font-bold text-white tracking-tight">
                    {co2Saved}
                  </p>
                  <span className="text-3xl text-slate-400 font-light">Kg</span>
                </div>
                <p className="text-slate-400 text-sm">CO₂ emissions tracked</p>
              </div>

              <div
                className="
    flex flex-col sm:flex-row
    items-start sm:items-center
    gap-2 sm:gap-3
    pt-2
    max-w-full
  "
              >
                <div
                  className="
      flex items-center gap-2
      bg-green-500/15
      px-3 py-1.5 sm:px-4 sm:py-2
      rounded-full
      border border-green-500/20
      w-fit
      flex-shrink-0
    "
                >
                  <img
                    src="/logo.png"
                    alt="logo"
                    className="h-4 w-4 sm:h-6 sm:w-6"
                  />

                  <span
                    className="
        text-green-400
        font-semibold
        text-sm sm:text-base
        leading-tight
        whitespace-nowrap
      "
                  >
                    All-time
                  </span>
                </div>

                <span
                  className="
      text-slate-500
      text-xs sm:text-sm
      leading-tight
      max-w-full
    "
                >
                  total CO₂ saved so far
                </span>
              </div>
            </div>
          </Motion.div>
          {/* --------------Energy Usage Card---------------- */}

          <Motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: 'easeIn' }}
            className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden"
          >
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider mb-6 mt-3">
              Energy Usage
            </h3>

            <div className="space-y-4">
              {mappedStats.map((stat) => {
                const Icon = statConfig[stat.category].icon
                const color = statConfig[stat.category].color
                const label = statConfig[stat.category].label

                return (
                  <div
                    key={stat.category}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-${color}-500/10 flex items-center justify-center group-hover:bg-${color}-500/20 transition-colors`}
                      >
                        <Icon className={`w-4 h-4 text-${color}-400`} />
                      </div>
                      <div>
                        <span className="text-slate-200 font-light text-sm">
                          {label}
                        </span>
                        <p className="text-xs text-slate-400">
                          {stat.totalQuantity} today •{' '}
                          <span className="text-green-400">{stat.count}</span>
                        </p>
                      </div>
                    </div>

                    {/* Use real trend data from API */}
                    <div className="w-14 h-6 bg-slate-800/60 rounded-lg">
                      <TinySparkline
                        data={stat.trend.map((d) => ({ value: d.value }))} // now uses real trend
                        color="#05df72"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Motion.div>

          {/* Achievements Card */}
          <Motion.div
            variants={cardVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.9, ease: 'easeIn' }}
            className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden"
          >
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider mb-6 mt-3">
              sustainable action completed
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-green-400" />
                </div>

                <div>
                  <span className="text-slate-200 font-light text-sm">
                    Eco-challenges completed
                  </span>
                  <p className="text-xs text-slate-400">
                    12 this month • <span className="text-green-400">+15%</span>
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400/80"
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  65% of monthly goal
                </p>
              </div>

              {/* Streak */}
              <p className="text-xs text-slate-400 flex gap-2 items-center">
                <TrendingUp className="w-3 h-3 text-green-400" />
                4-day streak — keep it going!
              </p>

              {/* Suggested Next Action */}
              <button className="text-xs text-slate-400 hover:text-slate-200 transition mt-3">
                Suggested challenge: “No-plastic day” →
              </button>
            </div>
          </Motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Card: Takes 2 columns */}
          <EnergyChart />

          {/* Tips Card */}
          <Motion.div
            variants={specialCard}
            initial="hidden"
            animate="show"
            className="bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] bg-[#292d2b] backdrop-blur-sm rounded-3xl p-6 border border-slate-800/50 shadow-xl"
          >
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider mb-6 mt-3">
              Quick Insight & Tips
            </h3>

            {/* Scrollable container */}
            <div
              className="max-h-110 overflow-y-auto space-y-4 pr-2 scrollbar-dark [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
            >
              {/* Energy Tip */}
              {insights.map(({ id, icon: Icon, color, text, action }) => (
                <div
                  key={id}
                  className="bg-green-900/30 rounded-2xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors flex flex-col gap-2"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0 mt-0.5`}
                    >
                      <Icon className={`w-4 h-4 text-${color}-400`} />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {text}
                    </p>
                  </div>
                  <button
                    className={`text-xs text-${color}-400 hover:text-${color}-300 self-start`}
                  >
                    {action}
                  </button>
                </div>
              ))}
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  )
}

export default Overview
