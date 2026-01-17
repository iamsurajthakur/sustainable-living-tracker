import api from './api.js'

export const getChallenges = async () => {
  return await api.get('/api/v1/challenges/getChallenges')
}
