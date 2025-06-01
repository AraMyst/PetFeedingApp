// src/pages/PetsPage.jsx
import React, { useEffect } from 'react'
import { usePets } from '../hooks/usePets'
import PetList from '../components/Pets/PetList'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * PetsPage displays:
 *   - A fixed header with a logo linking to Dashboard and a logout button
 *   - Below the header: a Pet illustration + “Add New Pet” button (always visible)
 *   - If there was an error fetching, show an error message
 *   - If no pets exist (and no error), show “No pets registered.”
 *   - Otherwise, show a responsive grid of PetItem cards
 *   - Only “Add” and “Delete” actions (no “Edit”)
 */
export default function PetsPage() {
  const { pets, loading, error, deletePet, fetchPets } = usePets()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Whenever the path is /pets (or changes), reload the list
  useEffect(() => {
    fetchPets()
  }, [location.pathname, fetchPets])

  // Navigate to the create‐pet form
  const handleAddNew = () => {
    navigate('/pets/new')
  }

  // Delete a pet after confirmation, then reload the list
  const handleDelete = async (id) => {
    const message = 'PetPaunch App: Are you sure you want to delete this pet?'
    if (window.confirm(message)) {
      await deletePet(id)
      await fetchPets()
    }
  }

  // Handle logout and redirect to login
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  // While data is loading, show “Loading pets…”
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading pets...</p>
      </div>
    )
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

          {/* Discreet logout button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content (with top padding so header doesn’t overlap) */}
      <main className="main-content px-4 pb-8 max-w-5xl mx-auto">
        {/* Always‐visible section: illustration + “Add New Pet” button */}
        <div className="flex flex-col items-center mb-16">
          <img
            src="/assets/images/Pets.png"
            alt="Pet Illustration"
            className="w-[200px] h-[200px] mb-4 object-contain"
          />
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add New Pet
          </button>
        </div>

        {/* If there was an error fetching, show it */}
        {error && (
          <p className="text-center text-red-500 mb-4">
            Error loading pets. Please try again later.
          </p>
        )}

        {/* If no pets exist (and no error), show “No pets registered.” */}
        {!error && (!pets || pets.length === 0) ? (
          <p className="text-center text-gray-500">No pets registered.</p>
        ) : (
          <PetList pets={pets} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}
