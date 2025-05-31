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

  // LOGIN: call backend, store token + user, update state
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
    } finally {
      setLoading(false)
    }
  }

  // REGISTER: call backend, store token + user, update state
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
    } finally {
      setLoading(false)
    }
  }

  // LOGOUT: clear stored token and reset state
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
