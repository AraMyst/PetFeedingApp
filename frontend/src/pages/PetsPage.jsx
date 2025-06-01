// src/pages/PetsPage.jsx
import React, { useEffect } from 'react'
import { usePets } from '../hooks/usePets'
import PetList from '../components/Pets/PetList'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * PetsPage displays:
 *  - A fixed header with a logo linking to Dashboard and a logout button
 *  - Below the header: a Pets illustration + “Add New Pet” button (always visible)
 *  - If no pets exist (or an error occurred), show “No pets registered.”
 *  - Otherwise, show a responsive grid of PetItem cards under the image/button
 *  - Only “Add” and “Delete” actions (no “Edit”)
 */
export default function PetsPage() {
  const { pets, loading, error, deletePet, fetchPets } = usePets()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Whenever the path is /pets, reload the list
  useEffect(() => {
    fetchPets()
  }, [location.pathname, fetchPets])

  // Navigate to the create form
  const handleAddNew = () => {
    navigate('/pets/new')
  }

  // Delete a pet after confirmation, then reload list
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

  // While data is loading, show “Loading pets...”
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#DBF3F6]">
        <p className="text-gray-500">Loading pets...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#DBF3F6] min-h-screen">
      {/* 
        Fixed header with logo linking to Dashboard and logout button.
        Height: 4rem (h-16) = 64px total.
      */}
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

      {/*
        Main content with custom top padding so that the fixed header
        does not overlap the Pets illustration.
        .main-content = padding-top: 3rem (48px) defined in index.css.
      */}
      <main className="main-content px-4 pb-8 max-w-5xl mx-auto">
        {/*
          Always-visible section:
          - A container to center the Pets illustration and the Add New Pet button.
          - Use mb-16 for extra vertical space before the card grid.
        */}
        <div className="flex flex-col items-center mb-16">
          <img
            src="/assets/images/Pets.png"   {/* Updated to match actual filename: Pets.png */}
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

        {/*
          If there is an error or no pets, show “No pets registered.”
          Otherwise, display the responsive grid of PetItem cards.
          We only pass onDelete (no onEdit).
        */}
        {(!pets || pets.length === 0 || error) ? (
          <p className="text-center text-gray-500">No pets registered.</p>
        ) : (
          <PetList
            pets={pets}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}
