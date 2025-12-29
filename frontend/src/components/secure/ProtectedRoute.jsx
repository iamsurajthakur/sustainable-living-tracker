import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingAnimation from '../home/Loading'
import { AuthContext } from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useContext(AuthContext)

  // if still checking refresh token, show loader
  if (loading) {
    return <LoadingAnimation />
  }

  // If no access token, redirect to login
  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  // User is authenticated render children
  return <>{children}</>
}

export default ProtectedRoute
