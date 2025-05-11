import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const habitService = {
  list: () => api.get('/habits'),
  create: data => api.post('/habits', data),
  update: (id, data) => api.put(`/habits/${id}`, data),
  getOne: id => api.get(`/habits/${id}`),
  delete: id => api.delete(`api/habits/${id}`),
  complete: id => api.post(`api/habits/${id}/complete`),
  getTemplates: () => api.get('/habits/templates')
}

export const userService = {
  getProgress: () => api.get('/users/me/progress')
}

// Add auth interceptor to handle token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
