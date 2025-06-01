// src/components/Pets/PetList.jsx
import React from 'react'
import PetItem from './PetItem'

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
