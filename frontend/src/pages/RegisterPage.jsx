// src/pages/RegisterPage.jsx
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import RegisterForm from '../components/Auth/RegisterForm'

export default function RegisterPage() {
  const { token, loading } = useAuth()
  const navigate = useNavigate()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && token) {
      navigate('/dashboard', { replace: true })
    }
  }, [token, loading, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Checking authentication…</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#DBF3F6' }} // match your logo background
    >
      <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
        <img
          src="/assets/images/logo.png"
          alt="App Logo"
          className="block mx-auto mb-6"
          style={{ width: 250, height: 250 }}
        />

        <RegisterForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
