import { useState } from "react";

export default function SubscriptionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    address: "Narbonne, France",
    crop: "blé",
    surface: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <label className="block mb-2">
         Location:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        />
      </label>
      <label className="block mb-2">
         Crop:
        <input
          type="text"
          name="crop"
          value={formData.crop}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        />
      </label>
      <label className="block mb-4">
         Surface (ha):
        <input
          type="number"
          name="surface"
          value={formData.surface}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        />
      </label>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
}
