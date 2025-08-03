import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && crop && area) {
      navigate("/simulation/result");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* ✅ Logo */}
      <img src="/arc-hero.png" alt="ARC Logo" className="w-64 mb-8" />


      {/* ✅ Simulation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5 border"
      >
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Type your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Crop type
          </label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select a crop</option>
            <option value="wheat">🌾 Wheat</option>
            <option value="corn">🌽 Corn</option>
            <option value="sunflower">🌻 Sunflower</option>
            <option value="grape">🍇 Grape</option>
            <option value="apple">🍎 Apple</option>
            <option value="olive">🫒 Olive</option>
            <option value="peach">🍑 Peach</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Area (hectares)
          </label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!location || !crop || !area}
          className={`w-full py-2 px-4 rounded-lg text-white font-bold ${
            location && crop && area
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          🚀Simulate Quote
        </button>
      </form>
    </div>
  );
}
