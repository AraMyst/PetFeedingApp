// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'
import { apiClient } from '../utils/apiClient'

const AuthContext = createContext({
  user: null,
  token: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

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

      // Although apiClient.request always reads token from localStorage,
      // we set defaults here in case you switch to axios in the future:
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
