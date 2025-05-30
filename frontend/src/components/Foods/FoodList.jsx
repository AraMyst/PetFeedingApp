import React from 'react';
import FoodItem from './FoodItem';

export default function FoodList({ foods, onEdit, onDelete }) {
  if (!foods || foods.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No foods available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {foods.map((food) => (
        <FoodItem
          key={food._id}
          food={food}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
