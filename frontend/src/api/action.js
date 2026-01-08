import api from './api'

export const getActionsByCategory = async (category) => {
  return await api.get('/api/v1/action/getAction', {
    params: { category },
  })
}

export const postUserLog = async (data) => {
  return await api.post('/api/v1/action/addUserLog', data)
}

export const getUserLogs = async ({
  userId,
  startDate,
  endDate,
  category,
} = {}) => {
  return await api.get('/api/v1/action/getUserLogs', {
    params: { userId, startDate, endDate, category },
  })
}
