import React from 'react'

/**
 * FoodItem displays information about a single food:
 *  - Name, brand, weight, specs, buy link
 *  - “Edit” and “Delete” buttons at bottom, spaced apart
 *  - Cream-colored background (#F5F1E8) with rounded corners
 */
export default function FoodItem({ food, onEdit, onDelete }) {
  // Determine primary buy link or fallback to default (Amazon search)
  const primaryLink =
    Array.isArray(food.buyLinks) && food.buyLinks.length > 0
      ? food.buyLinks[0]
      : null

  return (
    <div className="bg-[#F5F1E8] rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{food.brand}</p>
        <p className="text-sm mb-1">Weight: {food.weight} g</p>

        {food.specifications?.length > 0 && (
          <p className="text-sm mb-1">
            Specs: {food.specifications.join(', ')}
          </p>
        )}

        {/* 
          Always render a “Buy” link:
          - If the user forneceu um buyLink, usa o primeiro.
          - Senão, faz pesquisa padrão na Amazon pelo nome do alimento. 
        */}
        <div className="mt-2 mb-4">
          <a
            href={
              primaryLink ||
              `https://www.amazon.com/s?k=${encodeURIComponent(food.name)}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline text-sm"
          >
            Buy
          </a>
        </div>
      </div>

      {/**
        * Edit/Delete buttons:
        * - mt-4 para espaçar acima dos botões
        * - flex justify-center para centralizar
        * - space-x-4 para afastar “Edit” e “Delete”
        */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => onEdit(food)}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(food._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
