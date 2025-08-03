'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && crop && area) {
      router.push('/simulation');
    }
  };

  const isFormValid = location.trim() !== '' && crop.trim() !== '' && area.trim() !== '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 gap-10">
      <Image
        src="/arc-hero.png"
        alt="ARC Logo"
        width={900}
        height={900}
        className="w-[95vw] max-w-[900px] h-auto"
      />

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">🌍 Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city or village"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">🌾 Crop</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select a crop --</option>
            <option value="blé-dur">🌾 Blé dur</option>
            <option value="blé-tendre">🌾 Blé tendre</option>
            <option value="maïs">🌽 Maïs</option>
            <option value="colza">🌼 Colza</option>
            <option value="tournesol">🌻 Tournesol</option>
            <option value="vigne">🍇 Vigne</option>
            <option value="pommier">🍏 Pommier</option>
            <option value="poirier">🍐 Poirier</option>
            <option value="pêcher">🍑 Pêcher</option>
            <option value="olivier">🫒 Olivier</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">📐 Surface (ha)</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter number of hectares"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            min="1"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
            isFormValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Simulate Quote
        </button>
      </form>
    </div>
  );
}
