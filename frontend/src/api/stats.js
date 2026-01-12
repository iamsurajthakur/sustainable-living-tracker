import api from './api'

export const getEnergyStats = async (userId) => {
  const res = await api.get(`/api/v1/stats/getEnergyStats?userId=${userId}`)
  return res.data
}
