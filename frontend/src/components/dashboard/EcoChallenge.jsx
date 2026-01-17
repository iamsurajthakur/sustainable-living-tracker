import React, { useState, useRef, useEffect } from 'react'
import {
  CheckCircle,
  Leaf,
  Zap,
  Trash2,
  Car,
  Award,
  Flame,
  Droplet,
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
import {
  SuccessAlert,
  TaskAlert,
  ChallengeCompleteAlert,
} from '@/components/dashboard/SuccessAlert'
import { motion as Motion } from 'framer-motion'
import { getChallenges, getUserChallenges } from '@/api/challenge'

const categoryIcons = {
  Energy: Zap,
  Waste: Trash2,
  Transport: Car,
  Water: Droplet,
}

// ActiveChallengeCard Component
const ActiveChallengeCard = ({ challenge, currentDay, onComplete, index }) => {
  const totalDays = parseInt(challenge.duration)
  const progress = (currentDay / totalDays) * 100
  const Icon = categoryIcons[challenge.category] || (() => null)
  const COOLDOWN = 24 * 10 * 10 * 1000

  const challengeKey = `lastCompletedAt_${challenge.id}`
  const [lastCompletedAt, setLastCompletedAt] = useState(() => {
    const stored = localStorage.getItem(challengeKey)
    return stored ? Number(stored) : null
  })
  const [now, setNow] = useState(Date.now())
  const isBlocked = lastCompletedAt !== null && now - lastCompletedAt < COOLDOWN

  useEffect(() => {
    if (!isBlocked) return
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [isBlocked])

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }} // start invisible and below
      animate={{ opacity: 1, y: 0 }} // animate to natural position
      transition={{
        type: 'spring',
        stiffness: 100,
        duration: 0.5,
        delay: index * 0.15, // stagger animation by index
      }}
    >
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
          <p className="text-xs font-medium text-gray-300 mb-1.5">
            Today's Task
          </p>
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
    </Motion.div>
  )
}

const ActiveChallenges = () => {
  const [userChallenges, setUserChallenges] = useState([])
  const [currentDay] = useState(1) // Or calculate from startDate

  useEffect(() => {
    const fetchUserChallenges = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const res = await getUserChallenges(userId, 'active')
      setUserChallenges(res.data.data)
    }
    fetchUserChallenges()
  }, [])

  const handleComplete = (challengeId) => {
    console.log('Challenge completed:', challengeId)
    // Optionally: update backend or refetch challenges
  }

  return (
    <div className="grid gap-4">
      {userChallenges.map((uc, index) => (
        <ActiveChallengeCard
          key={uc._id}
          challenge={uc.challengeId} // pass the inner challenge object
          currentDay={currentDay} // you could calculate days from startDate
          onComplete={() => handleComplete(uc._id)}
          index={index}
        />
      ))}
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

  const durationOptions = [
    { label: '1 Day', value: 1 },
    { label: '7 Days', value: 7 },
    { label: '14 Days', value: 14 },
    { label: '21 Days', value: 21 },
    { label: '30 Days', value: 30 },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a2b23] border border-gray-700 rounded-lg text-sm text-gray-300"
      >
        Filters
        {activeFiltersCount > 0 && (
          <span className="bg-[#10b981] text-white text-xs px-1.5 rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#1a2b23] border border-gray-700 rounded-lg p-4 z-10">
          {/* Difficulty */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Difficulty</p>
            <div className="flex gap-2">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => onFilterChange('difficulty', level)}
                  className={`px-3 py-1.5 rounded text-xs ${
                    filters.difficulty === level
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#0f1a15] text-gray-300 border border-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Duration</p>
            <div className="flex gap-2 flex-wrap">
              {durationOptions.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onFilterChange('duration', value)}
                  className={`px-3 py-1.5 rounded text-xs ${
                    filters.duration === value
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#0f1a15] text-gray-300 border border-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="mb-3">
            <p className="text-xs text-gray-400 mb-1">Category</p>
            <div className="grid grid-cols-2 gap-2">
              {['Energy', 'Waste', 'Transport', 'Water'].map((category) => (
                <button
                  key={category}
                  onClick={() => onFilterChange('category', category)}
                  className={`px-3 py-1.5 rounded text-xs ${
                    filters.category === category
                      ? 'bg-[#10b981] text-white'
                      : 'bg-[#0f1a15] text-gray-300 border border-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => onFilterChange('clear')}
              className="w-full text-sm text-[#10b981]"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ChallengeCard Component
const ChallengeCard = ({ challenge, onStart, index }) => {
  const Icon = categoryIcons[challenge.category]
  const difficultyColors = {
    Easy: 'bg-green-900/40 text-green-400',
    Medium: 'bg-yellow-900/40 text-yellow-400',
    Hard: 'bg-red-900/40 text-red-400',
  }

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="bg-[#1a2b23] border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-1">
            <Icon className="w-4 h-4 text-[#10b981]" />
            <span className="text-xs text-gray-400">{challenge.category}</span>
          </div>
          <span
            className={`px-2 py-0.5 text-xs rounded ${difficultyColors[challenge.difficulty]}`}
          >
            {challenge.difficulty}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-white mb-2">
          {challenge.title}
        </h3>

        <div className="flex gap-3 text-xs text-gray-400 mb-3">
          <span>🕒 {challenge.duration} days</span>
          <span>🌱 {challenge.co2Saved} kg CO₂</span>
        </div>

        <button
          onClick={() => onStart(challenge)}
          className="w-full bg-[#10b981] text-white py-2 rounded"
        >
          Start Challenge
        </button>
      </div>
    </Motion.div>
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
  const [challenges, setChallenges] = useState([])
  const [userChallenges, setUserChallenges] = useState([])

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

  // Fetch challenges from the backend
  useEffect(() => {
    const fetchChallenges = async () => {
      const res = await getChallenges()
      setChallenges(res.data.data)
    }

    fetchChallenges()
  }, [])

  // Fetch user challenges from the backend
  useEffect(() => {
    const fetchUserChallenges = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.user._id

      const res = await getUserChallenges(userId, 'active')
      setUserChallenges(res.data.data)
    }
    fetchUserChallenges()
  })

  const handleFilterChange = (type, value) => {
    if (type === 'clear') {
      setFilters({
        difficulty: null,
        duration: null,
        category: null,
      })
      return
    }

    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }))
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

  const filteredChallenges = challenges.filter((challenge) => {
    if (filters.difficulty && challenge.difficulty !== filters.difficulty) {
      return false
    }

    if (filters.category && challenge.category !== filters.category) {
      return false
    }

    if (filters.duration && challenge.duration !== filters.duration) {
      return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/*     ------------Success alert message block----------      */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 w-[90vw] sm:w-auto">
        {/* Challenge Started */}
        <SuccessAlert
          show={showSuccessAlert && activeChallenges.length > 0}
          onClose={() => setShowSuccessAlert(false)}
          title="Challenge Started"
          message={`Challenge "${activeChallenges[activeChallenges.length - 1]?.title}" has started successfully.`}
          autoClose
          duration={3000}
        />
        {/* Task Completed */}
        <TaskAlert
          show={showTaskSuccessAlert}
          onClose={() => setShowTaskSuccessAlert(false)}
          title="Task Completed"
          message={`Task "${lastCompletedTaskTitle}" has completed successfully. See you tomorrow!`}
          autoClose
          duration={3000}
        />
        {/* Challenge Completed */}
        <ChallengeCompleteAlert
          show={showChallengeCompleteAlert && showCompletedChallengeTitle}
          onClose={() => setShowChallengeCompleteAlert(false)}
          title="Challenge Completed"
          message={`🎉 Challenge completed! You've finished "${showCompletedChallengeTitle}"`}
          autoClose
          duration={3000}
        />
      </div>

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
        {userChallenges.length > 0 && (
          <div
            className="mb-4 p-2 max-h-[400px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]
             [-webkit-mask-image:linear-gradient(to_bottom,black_calc(100%-40px),transparent_100%)]"
          >
            <h2 className="text-base font-semibold text-white mb-3">
              Active Challenges ({userChallenges.length})
            </h2>
            <div className="space-y-3">
              {userChallenges.map((userChallenge) => (
                <ActiveChallenges
                  key={userChallenge._id}
                  challenge={userChallenge}
                  currentDay={userChallenge.currentDay}
                  onComplete={() => handleComplete(userChallenge.id)}
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
              {filteredChallenges.map((challenge, idx) => (
                <ChallengeCard
                  key={`${challenge._id}-${filters.difficulty}-${filters.duration}-${filters.category}`}
                  index={idx}
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
