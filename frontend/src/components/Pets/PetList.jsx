// src/components/Pets/PetList.jsx
import React from 'react'
import PetItem from './PetItem'

/**
 * PetList renders a responsive grid of PetItem cards.
 * Uses the .food-grid utility from index.css:
 *   - repeat(auto-fit, minmax(300px, 1fr)): create as many 300px-wide columns as will fit
 *   - gap: 1rem between items
 *   - padding and align-items: stretch handled by .food-grid in index.css
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
