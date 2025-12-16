import React, { useState } from 'react'
import {
  CheckCircle,
  Leaf,
  Zap,
  Trash2,
  Car,
  UtensilsCrossed,
  Award,
  Flame,
} from 'lucide-react'

// Sample data
const challengesData = [
  {
    id: 1,
    title: 'Use reusable bags for all shopping',
    duration: '7 Days',
    difficulty: 'Easy',
    category: 'Waste',
    impact: 'Save 7 plastic bags',
    dailyTask: 'Did you use reusable bags for your shopping today?',
  },
  {
    id: 2,
    title: 'Unplug devices when not in use',
    duration: '30 Days',
    difficulty: 'Easy',
    category: 'Energy',
    impact: 'Reduce 5% energy consumption',
    dailyTask: 'Did you unplug unused devices today?',
  },
  {
    id: 3,
    title: 'Bike or walk for short trips',
    duration: '7 Days',
    difficulty: 'Medium',
    category: 'Transport',
    impact: 'Reduce 10 kg CO2',
    dailyTask: 'Did you bike or walk instead of driving today?',
  },
  {
    id: 4,
    title: 'Eat plant-based meals',
    duration: '1 Day',
    difficulty: 'Easy',
    category: 'Food',
    impact: 'Save 2.5 kg CO2',
    dailyTask: 'Did you eat only plant-based meals today?',
  },
  {
    id: 5,
    title: 'Zero single-use plastics',
    duration: '30 Days',
    difficulty: 'Hard',
    category: 'Waste',
    impact: 'Eliminate 50+ plastic items',
    dailyTask: 'Did you avoid all single-use plastics today?',
  },
  {
    id: 6,
    title: 'Switch off lights when leaving rooms',
    duration: '7 Days',
    difficulty: 'Easy',
    category: 'Energy',
    impact: 'Save 3 kWh',
    dailyTask: 'Did you turn off lights when leaving rooms today?',
  },
  {
    id: 7,
    title: 'Use public transport only',
    duration: '7 Days',
    difficulty: 'Medium',
    category: 'Transport',
    impact: 'Reduce 15 kg CO2',
    dailyTask: 'Did you use only public transport today?',
  },
  {
    id: 8,
    title: 'Meal prep to reduce food waste',
    duration: '30 Days',
    difficulty: 'Medium',
    category: 'Food',
    impact: 'Save 2 kg food waste/week',
    dailyTask: 'Did you prep meals and avoid food waste today?',
  },
]

const categoryIcons = {
  Energy: Zap,
  Waste: Trash2,
  Transport: Car,
  Food: UtensilsCrossed,
}

// ActiveChallengeCard Component
const ActiveChallengeCard = ({ challenge, currentDay, onComplete }) => {
  const totalDays = parseInt(challenge.duration)
  const progress = (currentDay / totalDays) * 100
  const Icon = categoryIcons[challenge.category]

  return (
    <div className="bg-[#1a2b23] border border-[#10b981]/30 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Icon className="w-4 h-4 text-[#10b981]" />
            <span className="text-xs font-medium text-[#10b981]">
              {challenge.category}
            </span>
          </div>
          <h2 className="text-base font-bold text-white mb-1">
            {challenge.title}
          </h2>
          <p className="text-xs text-gray-400">{challenge.impact}</p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-gray-300">
            Day {currentDay} of {totalDays}
          </span>
          <span className="text-xs font-medium text-[#10b981]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-[#0f1a15] rounded-full h-2">
          <div
            className="bg-[#10b981] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-[#0f1a15] rounded-lg p-3 mb-3">
        <p className="text-xs font-medium text-gray-300 mb-1.5">Today's Task</p>
        <p className="text-sm text-gray-200">{challenge.dailyTask}</p>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#10b981] hover:bg-[#0ea571] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <CheckCircle className="w-4 h-4" />
        Mark as Done
      </button>
    </div>
  )
}

// FilterBar Component
const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="mb-4 space-y-2.5">
      <div>
        <p className="text-xs font-medium text-gray-400 mb-1.5">Difficulty</p>
        <div className="flex gap-2">
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <button
              key={level}
              onClick={() => onFilterChange('difficulty', level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.difficulty === level
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#1a2b23] text-gray-300 hover:bg-[#243530] border border-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400 mb-1.5">Duration</p>
        <div className="flex gap-2">
          {['1 Day', '7 Days', '30 Days'].map((duration) => (
            <button
              key={duration}
              onClick={() => onFilterChange('duration', duration)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.duration === duration
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#1a2b23] text-gray-300 hover:bg-[#243530] border border-gray-700'
              }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-400 mb-1.5">Category</p>
        <div className="flex gap-2 flex-wrap">
          {['Energy', 'Waste', 'Transport', 'Food'].map((category) => {
            const Icon = categoryIcons[category]
            return (
              <button
                key={category}
                onClick={() => onFilterChange('category', category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  filters.category === category
                    ? 'bg-[#10b981] text-white'
                    : 'bg-[#1a2b23] text-gray-300 hover:bg-[#243530] border border-gray-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {(filters.difficulty || filters.duration || filters.category) && (
        <button
          onClick={() => onFilterChange('clear', null)}
          className="text-xs text-[#10b981] hover:text-[#0ea571] font-medium"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}

// ChallengeCard Component
const ChallengeCard = ({ challenge, onStart }) => {
  const Icon = categoryIcons[challenge.category]

  const difficultyColors = {
    Easy: 'bg-green-900/40 text-green-400 border border-green-700/30',
    Medium: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/30',
    Hard: 'bg-red-900/40 text-red-400 border border-red-700/30',
  }

  return (
    <div className="bg-[#1a2b23] border border-gray-700/50 rounded-lg p-4 hover:border-[#10b981]/40 transition-all">
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-[#10b981]" />
          <span className="text-xs font-medium text-gray-400">
            {challenge.category}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[challenge.difficulty]}`}
        >
          {challenge.difficulty}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white mb-2">
        {challenge.title}
      </h3>

      <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
        <span>🕒 {challenge.duration}</span>
        <span>🌱 {challenge.impact}</span>
      </div>

      <button
        onClick={() => onStart(challenge)}
        className="w-full bg-[#10b981] hover:bg-[#0ea571] text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
      >
        Start Challenge
      </button>
    </div>
  )
}

// Main App Component
export default function EcoChallenge() {
  const [activeChallenge, setActiveChallenge] = useState(challengesData[0])
  const [currentDay, setCurrentDay] = useState(3)
  const [filters, setFilters] = useState({
    difficulty: null,
    duration: null,
    category: null,
  })
  const [stats, setStats] = useState({
    streak: 3,
    completed: 12,
    ecoPoints: 340,
  })

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ difficulty: null, duration: null, category: null })
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev[filterType] === value ? null : value,
      }))
    }
  }

  const handleComplete = () => {
    const totalDays = parseInt(activeChallenge.duration)
    if (currentDay < totalDays) {
      setCurrentDay((prev) => prev + 1)
      setStats((prev) => ({
        ...prev,
        streak: prev.streak + 1,
        ecoPoints: prev.ecoPoints + 10,
      }))
      alert('Great job! Task marked as complete. See you tomorrow!')
    } else {
      setStats((prev) => ({
        ...prev,
        completed: prev.completed + 1,
        ecoPoints: prev.ecoPoints + 50,
      }))
      alert(
        `🎉 Challenge completed! You've finished "${activeChallenge.title}"`
      )
      setActiveChallenge(null)
      setCurrentDay(1)
    }
  }

  const handleStartChallenge = (challenge) => {
    setActiveChallenge(challenge)
    setCurrentDay(1)
    alert(`Challenge started: ${challenge.title}`)
  }

  const filteredChallenges = challengesData.filter((challenge) => {
    if (activeChallenge && challenge.id === activeChallenge.id) return false
    if (filters.difficulty && challenge.difficulty !== filters.difficulty)
      return false
    if (filters.duration && challenge.duration !== filters.duration)
      return false
    if (filters.category && challenge.category !== filters.category)
      return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      <div className="max-w-6xl mx-auto p-3 md:p-4">
        {/* Header & Stats Combined */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-0.5">
              Eco Challenges
            </h1>
            <p className="text-sm text-gray-400">
              Take daily actions for a sustainable future
            </p>
          </div>

          {/* Compact Stats */}
          <div className="hidden md:flex items-center gap-4 bg-[#1a2b23] border border-gray-700/50 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-lg font-bold text-white leading-none">
                  {stats.streak}
                </p>
                <p className="text-xs text-gray-400">streak</p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-700/50"></div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#10b981]" />
              <div>
                <p className="text-lg font-bold text-white leading-none">
                  {stats.completed}
                </p>
                <p className="text-xs text-gray-400">completed</p>
              </div>
            </div>
            <div className="w-px h-8 bg-gray-700/50"></div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-lg font-bold text-white leading-none">
                  {stats.ecoPoints}
                </p>
                <p className="text-xs text-gray-400">points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats - Compact horizontal */}
        <div className="md:hidden mb-4 bg-[#1a2b23] border border-gray-700/50 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white leading-none">
                {stats.streak}
              </p>
              <p className="text-xs text-gray-400">streak</p>
            </div>
            <div className="text-center">
              <Award className="w-4 h-4 text-[#10b981] mx-auto mb-1" />
              <p className="text-lg font-bold text-white leading-none">
                {stats.completed}
              </p>
              <p className="text-xs text-gray-400">completed</p>
            </div>
            <div className="text-center">
              <Leaf className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-white leading-none">
                {stats.ecoPoints}
              </p>
              <p className="text-xs text-gray-400">points</p>
            </div>
          </div>
        </div>

        {/* Active Challenge Section */}
        {activeChallenge && (
          <ActiveChallengeCard
            challenge={activeChallenge}
            currentDay={currentDay}
            onComplete={handleComplete}
          />
        )}

        {/* No Active Challenge State */}
        {!activeChallenge && (
          <div className="bg-[#1a2b23] border border-[#10b981]/30 rounded-lg p-4 mb-4 text-center">
            <Leaf className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
            <h2 className="text-base font-semibold text-white mb-0.5">
              No Active Challenge
            </h2>
            <p className="text-sm text-gray-400">
              Choose a challenge below to get started
            </p>
          </div>
        )}

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Available Challenges */}
        <div className="mb-4">
          <h2 className="text-base font-semibold text-white mb-3">
            {activeChallenge ? 'More Challenges' : 'Available Challenges'}
          </h2>
          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onStart={handleStartChallenge}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No challenges match your filters. Try adjusting your selection.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
