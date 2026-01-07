import api from './api'

export const getActionsByCategory = async (category) => {
  return await api.get('/api/v1/action/getAction', {
    params: { category },
  })
}
