import React, { useState, useRef, useEffect } from 'react'
import {
  CheckCircle,
  CheckCircle2,
  Leaf,
  Zap,
  Trash2,
  Car,
  UtensilsCrossed,
  Award,
  Flame,
  Filter,
  X,
} from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

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
  {
    id: 9,
    title: 'Compost organic waste',
    duration: '30 Days',
    difficulty: 'Medium',
    category: 'Waste',
    impact: 'Divert 5 kg waste from landfills',
    dailyTask: 'Did you compost your organic waste today?',
  },
  {
    id: 10,
    title: 'Take shorter showers',
    duration: '7 Days',
    difficulty: 'Easy',
    category: 'Energy',
    impact: 'Save 50 liters of water',
    dailyTask: 'Did you keep your shower under 5 minutes today?',
  },
  {
    id: 11,
    title: 'Buy local produce only',
    duration: '7 Days',
    difficulty: 'Medium',
    category: 'Food',
    impact: 'Reduce transportation emissions',
    dailyTask: 'Did you buy only local produce today?',
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
  const Icon = categoryIcons[challenge.category] || (() => null)

  const challengeKey = `lastCompletedAt_${challenge.id}`
  const [lastCompletedAt, setLastCompletedAt] = useState(() => {
    const stored = localStorage.getItem(challengeKey)
    return stored ? Number(stored) : null
  })

  const isSameDay = (timestamp1, timestamp2) => {
    const d1 = new Date(timestamp1)
    const d2 = new Date(timestamp2)
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const isBlocked =
    lastCompletedAt !== null && isSameDay(lastCompletedAt, Date.now())

  useEffect(() => {
    // Optional: re-check when component mounts or challenge changes
    const stored = localStorage.getItem(challengeKey)
    if (stored) setLastCompletedAt(Number(stored))
  }, [challengeKey])

  return (
    <div className="bg-[#1a2b23] border border-[#10b981]/30 rounded-lg p-4">
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
          />
        </div>
      </div>

      <div className="bg-[#0f1a15] rounded-lg p-3 mb-3">
        <p className="text-xs font-medium text-gray-300 mb-1.5">Today's Task</p>
        <p className="text-sm text-gray-200">{challenge.dailyTask}</p>
      </div>

      <button
        onClick={() => {
          const timestamp = Date.now()
          setLastCompletedAt(timestamp)
          localStorage.setItem(challengeKey, String(timestamp))
          onComplete()
        }}
        disabled={isBlocked}
        className={`w-full ${
          isBlocked
            ? 'bg-gray-600 opacity-50 cursor-not-allowed'
            : 'bg-[#10b981] hover:bg-[#0ea571]'
        } text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm`}
      >
        <CheckCircle className="w-4 h-4" />
        {isBlocked ? 'Completed Today' : 'Mark as Done'}
      </button>
    </div>
  )
}

// FilterDropdown Component
const FilterDropdown = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const dropdownRef = useRef(null)
  const activeFiltersCount = [
    filters.difficulty,
    filters.duration,
    filters.category,
  ].filter(Boolean).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onToggle])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a2b23] hover:bg-[#243530] border border-gray-700 rounded-lg text-sm font-medium text-gray-300 transition-colors"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="bg-[#10b981] text-white text-xs px-1.5 py-0.5 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#1a2b23] border border-gray-700 rounded-lg shadow-xl z-10 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">
              Filter Challenges
            </h3>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">
                Difficulty
              </p>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => onFilterChange('difficulty', level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filters.difficulty === level
                        ? 'bg-[#10b981] text-white'
                        : 'bg-[#0f1a15] text-gray-300 hover:bg-[#162820] border border-gray-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">
                Duration
              </p>
              <div className="flex gap-2">
                {['1 Day', '7 Days', '30 Days'].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => onFilterChange('duration', duration)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      filters.duration === duration
                        ? 'bg-[#10b981] text-white'
                        : 'bg-[#0f1a15] text-gray-300 hover:bg-[#162820] border border-gray-700'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">
                Category
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['Energy', 'Waste', 'Transport', 'Food'].map((category) => {
                  const Icon = categoryIcons[category]
                  return (
                    <button
                      key={category}
                      onClick={() => onFilterChange('category', category)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 justify-center ${
                        filters.category === category
                          ? 'bg-[#10b981] text-white'
                          : 'bg-[#0f1a15] text-gray-300 hover:bg-[#162820] border border-gray-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  onFilterChange('clear', null)
                  onToggle()
                }}
                className="w-full text-sm text-[#10b981] hover:text-[#0ea571] font-medium py-2 hover:bg-[#0f1a15] rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="w-full bg-[#10b981] hover:bg-[#0ea571] text-white cursor-pointer font-semibold py-2 px-3 rounded-lg transition-colors text-sm">
            Start Challenge
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-[#1a2b23]">
          <AlertDialogHeader>
            <AlertDialogTitle>Start this challenge?</AlertDialogTitle>
            <AlertDialogDescription>
              Once started, you can track your progress daily until completion.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border border-green-600 text-green-700 cursor-pointer hover:bg-green-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onStart(challenge)}
              className="bg-emerald-600 cursor-pointer text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500"
            >
              Start
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// Main App Component
export default function EcoChallenge() {
  // Load active challenges from localStorage
  const [activeChallenges, setActiveChallenges] = useState(() => {
    const stored = localStorage.getItem('activeChallenges')
    return stored ? JSON.parse(stored) : []
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showTaskSuccessAlert, setShowTaskSuccessAlert] = useState(false)
  const [lastCompletedTaskTitle, setLastCompletedTaskTitle] = useState('')
  const [showCompletedChallengeTitle, setCompletedChallengeTitle] = useState()
  const [showChallengeCompleteAlert, setShowChallengeCompleteAlert] =
    useState(false)
  const [filters, setFilters] = useState({
    difficulty: null,
    duration: null,
    category: null,
  })
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false)

  // Load stats from localStorage
  const [stats, setStats] = useState(() => {
    const stored = localStorage.getItem('ecoStats')
    return stored
      ? JSON.parse(stored)
      : {
          streak: 0,
          completed: 0,
          ecoPoints: 0,
        }
  })

  // Persist active challenges whenever they change
  useEffect(() => {
    localStorage.setItem('activeChallenges', JSON.stringify(activeChallenges))
  }, [activeChallenges])

  // Persist stats whenever they change
  useEffect(() => {
    localStorage.setItem('ecoStats', JSON.stringify(stats))
  }, [stats])

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

  const handleComplete = (challengeId) => {
    setActiveChallenges((prev) => {
      const updated = prev.map((ac) => {
        if (ac.id !== challengeId) return ac

        const totalDays = parseInt(ac.duration)
        const nextDay = ac.currentDay + 1

        // Award points for completing the day
        setStats((prevStats) => ({
          ...prevStats,
          streak: prevStats.streak + 1,
          ecoPoints: prevStats.ecoPoints + 10,
        }))

        if (nextDay >= totalDays) {
          // Challenge completed!
          setCompletedChallengeTitle(ac.title)

          setStats((prevStats) => ({
            ...prevStats,
            completed: prevStats.completed + 1,
            ecoPoints: prevStats.ecoPoints + 50,
          }))

          setShowChallengeCompleteAlert(true)
          setTimeout(() => {
            setShowChallengeCompleteAlert(false)
            setCompletedChallengeTitle(null)
          }, 3000)

          return null // Remove completed challenge
        } else {
          // Progress to next day
          setLastCompletedTaskTitle(ac.title)
          setShowTaskSuccessAlert(true)
          setTimeout(() => setShowTaskSuccessAlert(false), 3000)

          return { ...ac, currentDay: nextDay }
        }
      })

      return updated.filter(Boolean) // Remove nulls
    })
  }

  const handleStartChallenge = (challenge) => {
    // Add challenge to active challenges with currentDay = 0
    setActiveChallenges((prev) => [...prev, { ...challenge, currentDay: 0 }])

    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
  }

  const filteredChallenges = challengesData.filter((challenge) => {
    // Filter out all active challenges
    if (activeChallenges.some((ac) => ac.id === challenge.id)) return false
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
      {/*     ------------Success alert message block----------      */}
      {showSuccessAlert && activeChallenges.length > 0 && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          <Alert className="border-emerald-500/50 bg-emerald-950/90 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <AlertTitle className="text-emerald-400">
              Challenge Started
            </AlertTitle>
            <AlertDescription className="text-gray-300">
              Challenge "{activeChallenges[activeChallenges.length - 1]?.title}"
              has started successfully.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/* ----------------Task success alert message block------------ */}
      {showTaskSuccessAlert && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          <Alert className="border-emerald-500/50 bg-emerald-950/90 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <AlertTitle className="text-emerald-400">Task Completed</AlertTitle>
            <AlertDescription className="text-gray-300">
              Task "{lastCompletedTaskTitle}" has completed successfully. See
              you tomorrow!
            </AlertDescription>
          </Alert>
        </div>
      )}
      {/*     ------------Challenge completed alert message block----------      */}
      {showChallengeCompleteAlert && showCompletedChallengeTitle && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
          <Alert className="border-emerald-500/50 bg-emerald-950/90 backdrop-blur-md shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <AlertTitle className="text-emerald-400">
              Challenge Completed
            </AlertTitle>
            <AlertDescription className="text-gray-300">
              🎉 Challenge completed! You've finished "
              {showCompletedChallengeTitle}"
            </AlertDescription>
          </Alert>
        </div>
      )}
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
        {activeChallenges.length > 0 && (
          <div
            className="mb-4 p-2 max-h-[400px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
          >
            <h2 className="text-base font-semibold text-white mb-3">
              Active Challenges ({activeChallenges.length})
            </h2>
            <div className="space-y-3">
              {activeChallenges.map((activeChallenge) => (
                <ActiveChallengeCard
                  key={activeChallenge.id}
                  challenge={activeChallenge}
                  currentDay={activeChallenge.currentDay}
                  onComplete={() => handleComplete(activeChallenge.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Active Challenge State */}
        {activeChallenges.length === 0 && (
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

        {/* Available Challenges */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-white">
              {activeChallenges.length > 0
                ? 'More Challenges'
                : 'Available Challenges'}
            </h2>
            <FilterDropdown
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={filterDropdownOpen}
              onToggle={() => setFilterDropdownOpen(!filterDropdownOpen)}
            />
          </div>
          {filteredChallenges.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto p-4 bg-[#0f1814] rounded-lg [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
            >
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
