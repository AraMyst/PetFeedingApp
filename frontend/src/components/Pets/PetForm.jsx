import React, { useState } from 'react';
import PetImageSelector from './PetImageSelector';

/**
 * PetForm handles create/edit of a pet.
 * @param {{
 *   initialData?: {
 *     _id?: string,
 *     name: string,
 *     age: number,
 *     allergies: string[],
 *     gramsPerMeal: number,
 *     mealsPerDay: number,
 *     food: string,
 *     image?: string
 *   },
 *   foods: Array<{ _id: string, name: string }>,
 *   onSubmit: (data: object) => void,
 *   onCancel?: () => void
 * }} props
 */
export default function PetForm({ initialData = {}, foods = [], onSubmit, onCancel }) {
  const [name, setName] = useState(initialData.name || '');
  const [age, setAge] = useState(initialData.age || '');
  const [allergies, setAllergies] = useState((initialData.allergies || []).join(', '));
  const [gramsPerMeal, setGramsPerMeal] = useState(initialData.gramsPerMeal || '');
  const [mealsPerDay, setMealsPerDay] = useState(initialData.mealsPerDay || '');
  const [food, setFood] = useState(initialData.food || (foods[0]?._id || ''));
  const [image, setImage] = useState(initialData.image || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const allergiesArray = allergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    if (!name || !age || !gramsPerMeal || !mealsPerDay || !food) {
      setError('Please fill in all required fields');
      return;
    }

    onSubmit({
      name,
      age: Number(age),
      allergies: allergiesArray,
      gramsPerMeal: Number(gramsPerMeal),
      mealsPerDay: Number(mealsPerDay),
      food,
      image
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">
        {initialData._id ? 'Edit Pet' : 'Add Pet'}
      </h2>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Age (years)</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Allergies (comma separated)</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Grams per Meal</label>
        <input
          type="number"
          value={gramsPerMeal}
          onChange={(e) => setGramsPerMeal(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Meals per Day</label>
        <input
          type="number"
          value={mealsPerDay}
          onChange={(e) => setMealsPerDay(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Select Food</label>
        <select
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        >
          {foods.map((f) => (
            <option key={f._id} value={f._id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Choose Image</label>
        <PetImageSelector selected={image} onSelect={setImage} />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData._id ? 'Update Pet' : 'Create Pet'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
