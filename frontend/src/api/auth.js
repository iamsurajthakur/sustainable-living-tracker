import api from './api.js'

export const registerUser = async (data) => {
  return await api.post('/api/v1/auth/register', data)
}

export const loginUser = async (data) => {
  return await api.post('/api/v1/auth/login', data)
}

export const logoutUser = async () => {
  return await api.post('/api/v1/auth/logout')
}

export const refreshAccessToken = async () => {
  return await api.post('/api/v1/auth/refresh-token')
}
