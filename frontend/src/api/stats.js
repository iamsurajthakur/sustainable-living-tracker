import api from './api'

export const getEnergyStats = async (userId) => {
  const res = await api.get(`/api/v1/stats/getEnergyStats?userId=${userId}`)
  return res.data
}

export const getUserTimeline = async (userId) => {
  const res = await api.get(`/api/v1/stats/getUserTimeline/${userId}`)
  return res.data
}

export const getTotalActivities = async (userId) => {
  const res = await api.get(`/api/v1/stats/getTotalActivities/${userId}`)
  return res.data
}
