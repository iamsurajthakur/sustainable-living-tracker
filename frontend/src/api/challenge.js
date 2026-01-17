import api from './api.js'

export const getChallenges = async () => {
  return await api.get('/api/v1/challenges/getChallenges')
}

export const getUserChallenges = async (userId, status) => {
  const config = {
    params: {},
  }

  if (status) {
    config.params.status = status
  }

  return await api.get(`/api/v1/challenges/getUserChallenges/${userId}`, config)
}
