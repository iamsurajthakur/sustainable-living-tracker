import React, { createContext, useEffect, useState } from 'react'
import { refreshAccessToken } from '../../api/auth.js'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshAccessToken()
        const token = res.data.data?.accessToken || res.data.accessToken

        setAccessToken(token)
        setIsAuthenticated(true)
      } catch {
        setAccessToken(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        setAccessToken,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
