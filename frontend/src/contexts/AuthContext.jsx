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

  // On mount: load any saved token (no /me request)
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
    }
    setLoading(false)
  }, [])

  // Login action
  const login = async ({ email, password }) => {
    // authApi.login returns { token, user }
    const { token: newToken, user: newUser } = await authApi.login({ email, password })

    localStorage.setItem('token', newToken)
    apiClient.defaults.headers.Authorization = `Bearer ${newToken}`
    setToken(newToken)
    setUser(newUser)
  }

  // Register action
  const register = async ({ email, password }) => {
    // authApi.register returns { token, user }
    const { token: newToken, user: newUser } = await authApi.register({ email, password })

    localStorage.setItem('token', newToken)
    apiClient.defaults.headers.Authorization = `Bearer ${newToken}`
    setToken(newToken)
    setUser(newUser)
  }

  // Logout action
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
