import React, { useState } from 'react'
import {
  TrendingDown,
  TrendingUp,
  Zap,
  Droplets,
  Flame,
  Award,
  Leaf,
} from 'lucide-react'
import TinySparkline from '@/components/charts/TinySparkline'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts'

const Dashboard = () => {
  const [co2Data] = useState({
    thisWeek: 42.2,
    changePercent: -12,
  })

  const [energyReduction] = useState([
    { week: 'Week 1', value: 12 },
    { week: 'Week 2', value: 18 },
    { week: 'Week 3', value: 10 },
    { week: 'Week 4', value: 22 },
  ])

  return (
    <div className="bg-[#08120d] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Row: Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* -----------CO2 Card--------------- */}

          <div className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl"></div>

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider">
                  This Week's Impact
                </h3>
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-400" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-6xl font-bold text-white tracking-tight">
                    {co2Data.thisWeek}
                  </p>
                  <span className="text-3xl text-slate-400 font-light">Kg</span>
                </div>
                <p className="text-slate-400 text-sm">CO₂ emissions tracked</p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-green-500/15 px-4 py-2 rounded-full border border-green-500/20">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold text-base">
                    {co2Data.changePercent}%
                  </span>
                </div>
                <span className="text-slate-500 text-sm">vs last week</span>
              </div>
            </div>
          </div>

          {/* --------------Energy Usage Card---------------- */}

          <div className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden">
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider mb-6 mt-3">
              energy usage
            </h3>

            <div className="space-y-4">
              {/* Electricity */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-light text-sm">
                      Electricity
                    </span>
                    <p className="text-xs text-slate-400">
                      22 kWh today • <span className="text-green-400">-8%</span>
                    </p>
                  </div>
                </div>
                <div className="w-14 h-6 bg-slate-800/60 rounded-lg">
                  <TinySparkline
                    data={[
                      { value: 12 },
                      { value: 9 },
                      { value: 11 },
                      { value: 7 },
                      { value: 14 },
                      { value: 10 },
                    ]}
                    color="#05df72"
                  />
                </div>
              </div>

              {/* Gas */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-light text-sm">
                      Gas
                    </span>
                    <p className="text-xs text-slate-400">
                      3.4 m³ today • <span className="text-red-400">+12%</span>
                    </p>
                  </div>
                </div>
                <div className="w-14 h-6 bg-slate-800/60 rounded-lg">
                  <TinySparkline
                    data={[
                      { value: 10 },
                      { value: 8 },
                      { value: 7 },
                      { value: 6 },
                      { value: 5 },
                      { value: 14 },
                    ]}
                    color="#05df72"
                  />
                </div>
              </div>

              {/* Water */}
              <div className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Droplets className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="text-slate-200 font-light text-sm">
                      Water
                    </span>
                    <p className="text-xs text-slate-400">
                      45 L today • <span className="text-green-400">-3%</span>
                    </p>
                  </div>
                </div>
                <div className="w-14 h-6 bg-slate-800/60 rounded-lg">
                  <TinySparkline
                    data={[
                      { value: 12 },
                      { value: 9 },
                      { value: 11 },
                      { value: 7 },
                      { value: 14 },
                      { value: 10 },
                    ]}
                    color="#05df72"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="relative bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] backdrop-blur-sm rounded-3xl p-8 border border-green-500/20 shadow-2xl overflow-hidden">
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
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Card: Takes 2 columns */}
          <div className="lg:col-span-2 bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] bg-[#292d2b] backdrop-blur-sm rounded-3xl p-6 border border-slate-800/50 shadow-xl">
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider ml-20 mb-6 mt-3">
              Energy reduced this month
            </h3>

            <div className="relative h-72 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={energyReduction}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="#043919"
                    strokeOpacity={0.2}
                    vertical={false}
                  />

                  {/* X Axis shows weeks */}
                  <XAxis
                    dataKey="week"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />

                  {/* Y Axis */}
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />

                  {/* Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                    }}
                  />

                  {/* Gradient area under curve */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="url(#colorEnergy)"
                    fillOpacity={0.2}
                  />

                  <defs>
                    <linearGradient
                      id="colorEnergy"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  {/* Main line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ r: 4, stroke: '#0f172a', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-green-500/5 via-[#1a1f1d] to-[#1a1f1d] bg-[#292d2b] backdrop-blur-sm rounded-3xl p-6 border border-slate-800/50 shadow-xl">
            <h3 className="text-green-400/70 text-sm font-medium uppercase tracking-wider mb-6 mt-3">
              Quick Insight & Tips
            </h3>

            {/* Scrollable container */}
            <div className="max-h-64 overflow-y-auto space-y-4 pr-2 scrollbar-dark">
              {/* Energy Tip */}
              <div className="bg-green-900/30 rounded-2xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Electricity usage is 10% lower this month (~1.2 kWh saved,
                    ~$0.20)
                  </p>
                </div>
                <button className="text-xs text-yellow-400 hover:text-yellow-300 mt-1 self-start">
                  Track my impact →
                </button>
              </div>

              {/* Transport Tip */}
              <div className="bg-green-900/30 rounded-2xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Biking/cycling instead of driving reduces ~5kg CO₂ emissions
                  </p>
                </div>
                <button className="text-xs text-green-400 hover:text-green-300 mt-1 self-start">
                  Log my ride →
                </button>
              </div>

              {/* Add more tips here, they will scroll automatically */}
              <div className="bg-green-900/30 rounded-2xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-green-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Biking/cycling instead of driving reduces ~5kg CO₂ emissions
                  </p>
                </div>
                <button className="text-xs text-green-400 hover:text-green-300 mt-1 self-start">
                  Log my ride →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
