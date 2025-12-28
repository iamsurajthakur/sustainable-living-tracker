import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingAnimation from '../home/Loading'
import { AuthContext } from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useContext(AuthContext)

  console.log(
    '🛡️ ProtectedRoute - loading:',
    loading,
    'accessToken:',
    accessToken ? 'EXISTS' : 'NULL'
  )

  // If we're still checking refresh token, show loader
  if (loading) {
    console.log('⏳ Still loading - showing LoadingAnimation')
    return <LoadingAnimation />
  }

  // If no access token, redirect to login
  if (!accessToken) {
    console.log('❌ No access token - redirecting to login')
    return <Navigate to="/login" replace />
  }

  console.log('✅ Access token exists - rendering protected content')
  // User is authenticated, render children
  return <>{children}</>
}

export default ProtectedRoute
