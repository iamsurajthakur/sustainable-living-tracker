import React, { createContext, useState, useEffect } from 'react'
import { refreshAccessToken } from '../../api/auth.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔄 Checking authentication...')
      try {
        const res = await refreshAccessToken()
        console.log('✅ Refresh token successful:', res.data)

        const token = res.data.data?.accessToken || res.data.accessToken
        console.log('🎯 Setting accessToken to:', token)

        setAccessToken(token)
      } catch (error) {
        console.error(
          '❌ Refresh token failed:',
          error.response?.data || error.message
        )
        setAccessToken(null)
      } finally {
        setLoading(false)
        console.log('✨ Loading complete')
      }
    }
    checkAuth()
  }, [])

  console.log('📍 Current accessToken state:', accessToken)
  console.log('📍 Current loading state:', loading)

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
