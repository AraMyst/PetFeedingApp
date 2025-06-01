// src/pages/PetsCreatePage.jsx
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePets } from '../hooks/usePets'
import { useFoods } from '../hooks/useFoods'
import { useAuth } from '../contexts/AuthContext'
import PetForm from '../components/Pets/PetForm'

/**
 * PetsCreatePage renders a centered form to add a new pet.
 * After submitting, it navigates back to /pets and refetches the list.
 */
export default function PetsCreatePage() {
  const { createPet, fetchPets } = usePets()
  const { foods, fetchFoods, loading: foodsLoading } = useFoods()
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Load available foods for the dropdown
  useEffect(() => {
    fetchFoods()
  }, [fetchFoods])

  // Handle form submission: create then refetch + redirect
  const handleSubmit = async (data) => {
    try {
      await createPet(data)
      await fetchPets()
      navigate('/pets', { replace: true })
    } catch (err) {
      console.error('Error creating pet:', err)
    }
  }

  // Handle logout and redirect to login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* Fixed header with logo linking to Dashboard and logout button */}
      <header className="fixed top-0 left-0 w-full bg-[#DBF3F6] shadow-sm z-10 h-16">
        <div className="h-full flex items-center justify-between px-4">
          {/* Logo that links back to Dashboard */}
          <Link to="/dashboard">
            <img
              src="/assets/images/logo.png"
              alt="PetPaunch App Logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </Link>

          {/* Discreet logout button in turquoise-blue */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main container for form, pushed below fixed header */}
      <main className="pt-16 flex flex-col items-center px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Add Pet</h2>

          {foodsLoading ? (
            <p className="text-center text-gray-500">Loading available foods...</p>
          ) : (
            <PetForm
              foods={foods}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/pets')}
            />
          )}
        </div>
      </main>
    </div>
  )
}
