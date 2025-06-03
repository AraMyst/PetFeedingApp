// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as authApi from '../api/auth'

/**
 * AuthContext provides:
 *  - user: { id, email } | null
 *  - token: JWT string | null
 *  - loading: boolean (true while an auth request is in progress)
 *  - login({ email, password }): attempts login, stores token/user on success, or throws Error(message)
 *  - register({ email, password }): attempts registration, stores token/user on success, or throws Error(message)
 *  - logout(): clears stored token and user
 */
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

  // On component mount:
  //  - Check localStorage for an existing token
  //  - If found, set token state (you could fetch /auth/me here to get the user)
  //  - Then mark loading as false
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      // OPTIONAL: If you have a /auth/me endpoint, fetch current user here:
      // authApi
      //   .getCurrentUser() // e.g., apiClient.get('/auth/me')
      //   .then(res => setUser(res.data.user))
      //   .catch(() => {
      //     // If token is invalid or fetch fails, clear token
      //     logout()
      //   })
      //   .finally(() => setLoading(false))
    }
    setLoading(false)
  }, [])

  /**
   * LOGIN: calls backend, stores token + user, updates state.
   * On success: resolves.
   * On failure: throws Error with server-provided message.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<void>}
   * @throws {Error} e.g. "Email not registered" or "Incorrect password"
   */
  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      // authApi.login throws Error(message) if login fails
      const { token: newToken, user: newUser } = await authApi.login({ email, password })

      // Save JWT to localStorage so apiClient can include it on subsequent requests
      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(newUser)
    } catch (err) {
      // Re-throw so that the component can catch and display err.message
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * REGISTER: calls backend, stores token + user, updates state.
   * On success: resolves.
   * On failure: throws Error with server-provided message.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<void>}
   * @throws {Error} e.g. "User already exists"
   */
  const register = async ({ email, password }) => {
    setLoading(true)
    try {
      // authApi.register throws Error(message) if registration fails
      const { token: newToken, user: newUser } = await authApi.register({ email, password })

      localStorage.setItem('token', newToken)
      setToken(newToken)
      setUser(newUser)
    } catch (err) {
      // Re-throw so that the component can catch and display err.message
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

/**
 * useAuth returns the value of AuthContext.
 * Components can call useAuth() to get { user, token, loading, login, register, logout }.
 */
export function useAuth() {
  return useContext(AuthContext)
}
