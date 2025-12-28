import { api } from './axios'

export const loginApi = async ({ email, password }) => {
  // Try to find a user by email (mocked auth)
  const res = await api.get('/users', { params: { email } })
  const users = res.data
  if (!users || users.length === 0) {
    throw new Error('Invalid credentials')
  }
  const user = users[0]
  // Simple password check (mock)
  if (user.password !== password) {
    throw new Error('Invalid credentials')
  }

  return { token: 'mock-token-123', user: { id: user.id, name: user.name, email: user.email, role: user.role } }
}
