// src/components/Pets/PetList.jsx
import React from 'react';
import PetItem from './PetItem';

export default function PetList({ pets, onEdit, onDelete }) {
  if (!pets || pets.length === 0) {
    return <p className="text-center text-gray-500">No pets available.</p>;
  }

  return (
    <div className="space-y-4">
      {pets.map((pet) => (
        <PetItem
          key={pet._id}
          pet={pet}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
