import * as React from 'react'
import { lazy, Suspense, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import LoadingAnimation from '@/components/home/Loading'
import ProtectedRoute from './components/secure/ProtectedRoute'
import { AuthContext } from './components/secure/AuthContext'
import { SidebarProvider } from '@/components/ui/sidebar'

const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const { loading } = useContext(AuthContext)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="dark"
        closeOnClick
        newestOnTop={false}
        rtl={false}
      />

      {loading ? (
        <LoadingAnimation />
      ) : (
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
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Suspense>
      )}
    </>
  )
}

export default App
