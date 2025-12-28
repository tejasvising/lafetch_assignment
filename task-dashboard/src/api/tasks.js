import { api } from './axios'

export const getTasks = async () => {
  const res = await api.get('/tasks')
  return res.data
}

export const updateTask = async ({ id, payload }) => {
  const res = await api.patch(`/tasks/${id}`, payload)
  return res.data
}

export const createTask = async (payload) => {
  const res = await api.post('/tasks', payload)
  return res.data
}
