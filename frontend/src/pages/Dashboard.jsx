import { useState, useEffect, lazy, Suspense } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import LoadingAnimation from '@/components/home/Loading'
import { Leaf } from 'lucide-react'

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

  const userData = JSON.parse(localStorage.getItem('user'))

  function getFirstName(fullName) {
    if (!fullName || typeof fullName !== 'string') return ''
    return fullName.trim().split(/\s+/)[0]
  }

  const firstName = getFirstName(userData.user.fullName)

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
    <>
      <Sidebar active={active} onSelect={setActive} />

      <SidebarInset>
        {/* Fixed Header and made responsive*/}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-green-500/20 bg-[#0A0F0C] px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-gray-400 hover:text-green-400 -ml-2" />
            <div className="flex items-center gap-2 sm:gap-3 text-green-400 max-w-full">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />

              <h1
                className="
      text-sm sm:text-base
      font-medium
      truncate
      leading-tight
    "
              >
                Welcome back, {firstName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="
      flex items-center gap-2
      rounded-lg
      bg-green-500/10
      px-2 py-1 sm:px-3 sm:py-1.5
      ring-1 ring-green-500/20
      max-w-full
    "
            >
              <img
                src="/logo.png"
                alt="logo"
                className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0"
              />

              <div className="flex flex-col min-w-0">
                <span className="text-[11px] sm:text-xs font-semibold text-green-400 leading-tight">
                  Sustainify
                </span>

                <span
                  className="
          text-[10px] sm:text-[11px]
          text-gray-400
          truncate
        "
                >
                  {firstName}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] bg-[#050A07] p-6">
          <Suspense fallback={<LoadingAnimation />}>
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
      </SidebarInset>
    </>
  )
}

export default Dashboard
