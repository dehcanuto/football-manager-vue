import api from './api'

export const authService = {
  login(credentials: { email: string; password: string }) {
    return api.post('/auth/login', credentials)
  },

  fetchUser() {
    return api.get('/users/me')
  },
}
