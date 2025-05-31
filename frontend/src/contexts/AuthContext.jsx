// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'

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

  // On mount: load any saved token, set state, then finish loading
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      // If you have an /auth/me endpoint, you could fetch current user here
      // Example:
      // apiClient.get('/auth/me')
      //   .then(res => setUser(res.user))
      //   .catch(() => logout())
      //   .finally(() => setLoading(false))
    }
    setLoading(false)
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
      // Save JWT to localStorage so apiClient can pick it up
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(newUser)
    } catch (err) {
      // Re‐throw so calling component can display err.message
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
      setToken(newToken)
      setUser(newUser)
    } catch (err) {
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
