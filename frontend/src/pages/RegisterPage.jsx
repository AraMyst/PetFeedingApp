// src/pages/RegisterPage.jsx
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import RegisterForm from '../components/Auth/RegisterForm'

export default function RegisterPage() {
  const { token, loading } = useAuth()
  const navigate = useNavigate()

  // If already logged in, send straight to dashboard
  useEffect(() => {
    if (!loading && token) {
      navigate('/dashboard', { replace: true })
    }
  }, [token, loading, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Verifying session…</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <RegisterForm />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
