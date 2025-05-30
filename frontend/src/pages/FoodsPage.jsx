// src/pages/FoodsPage.jsx
import React, { useState } from 'react';
import { useFoods } from '../hooks/useFoods';
import FoodList from '../components/Foods/FoodList';
import FoodForm from '../components/Foods/FoodForm';

export default function FoodsPage() {
  const { foods, loading, error, createFood, updateFood, deleteFood } = useFoods();
  const [editingFood, setEditingFood] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    await createFood(data);
    setShowForm(false);
  };

  const handleUpdate = async (id, data) => {
    await updateFood(id, data);
    setEditingFood(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      await deleteFood(id);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Foods</h2>
        <button
          onClick={() => { setEditingFood(null); setShowForm(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Food
        </button>
      </div>

      {loading && <p>Loading foods...</p>}
      {error && <p className="text-red-500">Error loading foods.</p>}

      {showForm && (
        <FoodForm
          initialData={editingFood || {}}
          onSubmit={async (data) => {
            if (editingFood) {
              await handleUpdate(editingFood._id, data);
            } else {
              await handleCreate(data);
            }
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <FoodList
          foods={foods}
          onEdit={(food) => {
            setEditingFood(food);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
