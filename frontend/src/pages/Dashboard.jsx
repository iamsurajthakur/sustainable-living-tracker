import { useState, useEffect, lazy, Suspense } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import { AnimatePresence, motion as Motion } from 'framer-motion'

// Lazy-load dashboard sub-components
const Overview = lazy(() => import('@/components/dashboard/Overview'))
const LogActivities = lazy(() => import('@/components/dashboard/LogActivities'))
const EcoChallenge = lazy(() => import('@/components/dashboard/EcoChallenge'))
const History = lazy(() => import('@/components/dashboard/History'))
const RecentActivity = lazy(
  () => import('@/components/dashboard/RecentActivity')
)

const Dashboard = () => {
  const [active, setActive] = useState(
    () => localStorage.getItem('dashboard-tab') || 'overview'
  )

  useEffect(() => {
    localStorage.setItem('dashboard-tab', active)
  }, [active])

  const renderContent = () => {
    switch (active) {
      case 'log':
        return <LogActivities />
      case 'challenge':
        return <EcoChallenge />
      case 'history':
        return <History />
      case 'recent':
        return <RecentActivity />
      default:
        return <Overview />
    }
  }

  return (
    <div className="">
      <Sidebar active={active} onSelect={setActive} />

      <main className="">
        <Suspense fallback={<div>Loading tab...</div>}>
          <AnimatePresence mode="wait">
            <Motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </Motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  )
}

export default Dashboard
