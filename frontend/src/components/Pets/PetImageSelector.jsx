// src/components/Pets/PetImageSelector.jsx
import React from 'react'

/**
 * PetImageSelector allows the user to pick one of three animals:
 *   - Dog
 *   - Cat
 *   - Others
 *
 * Each selector‐card now has some padding so it does not touch the container edges,
 * and every image is reduced to 80×80px (so three‐across will fit comfortably).
 *
 * Props:
 *   - selected: string   // 'dog' | 'cat' | 'others'
 *   - onSelect: (value: string) => void
 *
 * Expects to find these files under public/assets/images:
 *   Dog.png, Cat.png, Others.png
 */
export default function PetImageSelector({ selected, onSelect }) {
  const imageOptions = [
    { value: 'dog', src: '/assets/images/Dog.png', alt: 'Dog' },
    { value: 'cat', src: '/assets/images/Cat.png', alt: 'Cat' },
    { value: 'others', src: '/assets/images/Others.png', alt: 'Others' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mt-2 px-2">
      {imageOptions.map((opt) => (
        <div
          key={opt.value}
          className={`border rounded overflow-hidden cursor-pointer bg-white p-2 ${
            selected === opt.value ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelect(opt.value)}
        >
          <img
            src={opt.src}
            alt={opt.alt}
            className="w-[80px] h-[80px] object-contain mx-auto"
          />
          <p className="text-center text-sm capitalize mt-1">{opt.alt}</p>
        </div>
      ))}
    </div>
  )
}
