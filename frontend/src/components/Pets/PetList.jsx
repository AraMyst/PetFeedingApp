// src/components/Pets/PetList.jsx
import React from 'react'
import PetItem from './PetItem'

/**
 * PetList renders a responsive grid of PetItem cards, using the same
 * grid styling as FoodList (i.e., "food-grid" class).
 *
 * Props:
 *   - pets: array of pet objects
 *   - onDelete: function(petId) → deletes that pet
 */
export default function PetList({ pets, onDelete }) {
  if (!pets || pets.length === 0) {
    return <p className="text-center text-gray-500">No pets registered.</p>
  }

  return (
    <div className="food-grid">
      {pets.map((pet) => (
        <PetItem key={pet._id} pet={pet} onDelete={onDelete} />
      ))}
    </div>
  )
}
