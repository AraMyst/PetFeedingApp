// src/pages/PetsPage.jsx
import React, { useState } from 'react';
import { usePets } from '../hooks/usePets';
import PetList from '../components/Pets/PetList';
import PetForm from '../components/Pets/PetForm';

export default function PetsPage() {
  const { pets, loading, error, createPet, updatePet, deletePet } = usePets();
  const [editingPet, setEditingPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    await createPet(data);
    setShowForm(false);
  };

  const handleUpdate = async (id, data) => {
    await updatePet(id, data);
    setEditingPet(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      await deletePet(id);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pets</h2>
        <button
          onClick={() => { setEditingPet(null); setShowForm(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add New Pet
        </button>
      </div>

      {loading && <p>Loading pets...</p>}
      {error && <p className="text-red-500">Error loading pets.</p>}

      {showForm && (
        <PetForm
          initialData={editingPet || {}}
          foods={[] /* TODO: pass foods list from useFoods or via props */}
          onSubmit={async (data) => {
            if (editingPet) {
              await handleUpdate(editingPet._id, data);
            } else {
              await handleCreate(data);
            }
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <PetList
          pets={pets}
          onEdit={(pet) => {
            setEditingPet(pet);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
