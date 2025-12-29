import * as React from 'react'
import { lazy, Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingAnimation from '@/components/home/Loading'
import ProtectedRoute from './components/secure/ProtectedRoute'
import { AuthContext } from './components/secure/AuthContext'
import { SidebarProvider } from '@/components/ui/sidebar'

const Home = lazy(() => import('./pages/Home'))
// const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  const { loading } = useContext(AuthContext)

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <Suspense fallback={<LoadingAnimation />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <Dashboard />
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  )
}

export default App
