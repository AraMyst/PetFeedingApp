import React from 'react';

export default function FoodItem({ food, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{food.name}</h3>
        <p className="text-sm text-gray-500">{food.brand}</p>
        <p className="text-sm">Weight: {food.weight} g</p>

        {food.specifications?.length > 0 && (
          <p className="text-sm">
            Specs: {food.specifications.join(', ')}
          </p>
        )}

        {food.buyLinks?.length > 0 && (
          <div className="mt-2 space-x-2">
            {food.buyLinks.map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Buy {idx + 1}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => onEdit(food)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(food._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
