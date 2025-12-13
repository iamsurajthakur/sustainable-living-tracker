import { useState, useEffect } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Overview from '@/components/dashboard/Overview'
import LogActivities from '@/components/dashboard/LogActivities'
import EcoChallenge from '@/components/dashboard/EcoChallenge'
import History from '@/components/dashboard/History'
import RecentActivity from '@/components/dashboard/RecentActivity'
import { AnimatePresence, motion as Motion } from 'framer-motion'

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
      </main>
    </div>
  )
}

export default Dashboard
