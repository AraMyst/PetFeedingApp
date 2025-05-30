// src/components/Pets/PetImageSelector.jsx
import React from 'react';

/**
 * PetImageSelector displays a grid of images for the user to choose from.
 * @param {{
 *   selected: string,
 *   onSelect: (value: string) => void
 * }} props
 */
export default function PetImageSelector({ selected, onSelect }) {
  // TODO: Update this list with your actual image filenames in public/assets/images
  const imageOptions = [
    { value: 'puppy', src: '/assets/images/puppy.jpg', alt: 'Puppy' },
    { value: 'adult-dog', src: '/assets/images/adult-dog.jpg', alt: 'Adult Dog' },
    { value: 'senior-dog', src: '/assets/images/senior-dog.jpg', alt: 'Senior Dog' },
    // add more as needed
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {imageOptions.map((opt) => (
        <div
          key={opt.value}
          className={`border rounded overflow-hidden cursor-pointer ${
            selected === opt.value ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelect(opt.value)}
        >
          <img src={opt.src} alt={opt.alt} className="w-full h-24 object-cover" />
        </div>
      ))}
    </div>
  );
}
