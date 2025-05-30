import React, { useState } from 'react';

export default function FoodForm({
  initialData = { name: '', brand: '', specifications: [], weight: '', buyLinks: [] },
  onSubmit,
  onCancel
}) {
  const [name, setName] = useState(initialData.name);
  const [brand, setBrand] = useState(initialData.brand);
  const [specifications, setSpecifications] = useState(initialData.specifications.join(', '));
  const [weight, setWeight] = useState(initialData.weight);
  const [buyLinks, setBuyLinks] = useState((initialData.buyLinks || []).join(', '));
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const specsArray = specifications
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const linksArray = buyLinks
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    if (!name || !brand || !weight) {
      setError('Please fill in name, brand and weight');
      return;
    }

    onSubmit({
      name,
      brand,
      specifications: specsArray,
      weight: Number(weight),
      buyLinks: linksArray
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">
        {initialData._id ? 'Edit Food' : 'Add Food'}
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
        <label className="block text-sm font-medium">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Specifications (comma separated)
        </label>
        <input
          type="text"
          value={specifications}
          onChange={(e) => setSpecifications(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Weight (grams)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Buy Links (comma separated)
        </label>
        <input
          type="text"
          value={buyLinks}
          onChange={(e) => setBuyLinks(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData._id ? 'Update Food' : 'Create Food'}
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
