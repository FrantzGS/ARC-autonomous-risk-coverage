// src/pages/Subscribe.tsx

import { Link } from "react-router-dom";

export default function Subscribe() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Subscribe to ARC 🌾</h1>

      <p className="mb-8 text-center max-w-md">
        Thank you for simulating your climate risk coverage. You can now subscribe to ARC and secure your farm!
      </p>

      <div className="flex gap-4">
        <Link to="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow">
            ⬅️ Back to Homepage
          </button>
        </Link>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          onClick={() => alert("🔐 Subscription transaction sent (mocked)!")}
        >
          ✅ Subscribe to ARC
        </button>
      </div>
    </div>
  );
}
