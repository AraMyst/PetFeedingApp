// src/components/Pets/PetItem.jsx
import React from 'react';

export default function PetItem({ pet, onEdit, onDelete }) {
  const {
    _id,
    name,
    age,
    allergies = [],
    gramsPerMeal,
    mealsPerDay,
    food = {},
    image
  } = pet;

  return (
    <div className="bg-white p-4 rounded shadow flex items-start space-x-4">
      {image && (
        <img
          src={`/assets/images/${image}.jpg`}
          alt={name}
          className="w-24 h-24 object-cover rounded"
        />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">Age: {age} year{age !== 1 ? 's' : ''}</p>
        {allergies.length > 0 && (
          <p className="text-sm">Allergies: {allergies.join(', ')}</p>
        )}
        <p className="text-sm">
          Consumption: {gramsPerMeal}g per meal × {mealsPerDay} meal
          {mealsPerDay !== 1 ? 's' : ''}
        </p>
        {food.name && (
          <p className="text-sm">Food: {food.name}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onEdit(pet)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
