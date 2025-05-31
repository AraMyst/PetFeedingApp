// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'
import { apiClient } from '../utils/apiClient'

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount: load any saved token and optionally fetch user profile
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)

      // Attach the token to apiClient for future requests
      apiClient.defaults = apiClient.defaults || {}
      apiClient.defaults.headers = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${storedToken}`,
      }

      // Optionally fetch current user info from /auth/me endpoint
      // Uncomment the following block if you have /auth/me implemented:
      //
      // apiClient
      //   .get('/auth/me')
      //   .then((res) => setUser(res.user))
      //   .catch(() => {
      //     console.error('Failed to fetch current user')
      //     logout()
      //   })
      //   .finally(() => setLoading(false))

      // If you do not fetch user info on mount, simply finish loading
      setLoading(false)
    } else {
      // No token in storage, mark loading complete
      setLoading(false)
    }
  }, [])

  /**
   * LOGIN: calls backend, stores token + user, updates state.
   * On success, returns; on failure, throws Error with message from server.
   */
  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      // authApi.login returns { token, user }
      const { token: newToken, user: newUser } = await authApi.login({ email, password })
      localStorage.setItem('token', newToken)

      apiClient.defaults = apiClient.defaults || {}
      apiClient.defaults.headers = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${newToken}`,
      }

      setToken(newToken)
      setUser(newUser)
    } catch (err) {
      // Re-throw so the calling component can display err.message
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * REGISTER: calls backend, stores token + user, updates state.
   * On success, returns; on failure, throws Error with message from server.
   */
  const register = async ({ email, password }) => {
    setLoading(true)
    try {
      // authApi.register returns { token, user }
      const { token: newToken, user: newUser } = await authApi.register({ email, password })
      localStorage.setItem('token', newToken)

      apiClient.defaults = apiClient.defaults || {}
      apiClient.defaults.headers = {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${newToken}`,
      }

      setToken(newToken)
      setUser(newUser)
    } catch (err) {
      // Re-throw so the calling component can display err.message
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * LOGOUT: clears stored token and resets state.
   */
  const logout = () => {
    localStorage.removeItem('token')
    if (apiClient.defaults && apiClient.defaults.headers) {
      delete apiClient.defaults.headers.Authorization
    }
    setToken(null)
    setUser(null)
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  return useContext(AuthContext)
}
