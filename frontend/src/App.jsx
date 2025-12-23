import * as React from 'react'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingAnimation from '@/components/home/Loading'

const Home = lazy(() => import('./pages/Home'))
const Layout = lazy(() => import('./pages/Layout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="login" element={<Login />} />

        {/* Optional: Catch-all route for 404 */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Suspense>
  )
}

export default App
