// src/components/Auth/LoginForm.jsx
import React, { useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // We keep a ref to the password input so we can focus it after a failed attempt
  const passwordRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Attempt login; if email/password is wrong, this will throw
      await login({ email, password })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      // 1) Preserve the email field (do not clear it)
      // 2) Clear only the password field
      setPassword('')
      // 3) Show the error message thrown by authApi (e.g., "Email not registered" or "Incorrect password")
      const message = err.message || 'Login failed'
      setError(message)
      // 4) Focus on the password field for retry
      if (passwordRef.current) {
        passwordRef.current.focus()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 320, margin: '0 auto' }}
      className="space-y-6"
    >
      {/* Display error message */}
      {error && (
        <div className="text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {/* Email input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full border border-gray-300 rounded-md py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Submit button */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '1.5rem' }}
          className="block mx-auto w-3/4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Sign In'}
        </button>
      </div>
    </form>
  )
}
