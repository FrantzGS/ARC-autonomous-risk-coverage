import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SimulationResultPage() {
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const result = {
    location: "Narbonne",
    crop: "blé",
    area: 10,
    yieldPerHa: 4,
    pricePerKg: 0.8,
    estimatedCoverage: 32114.83,
    premium: 4821.12,
    riskIndex: 78, // sur 100
    riskLevel: "High Risk (drought)",
    note: "Based on 5-year climate data, this plot has a high drought risk.",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowResult(true), 100); // delay léger pour fade-in
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-8 text-gray-800 bg-white">
      <img src="/arc-hero.png" alt="ARC Logo" className="w-40 h-40 mb-4" />
      <h1 className="text-2xl font-bold mb-6">🌾 Simulated Quote</h1>

      {loading ? (
        <div className="text-center animate-pulse text-lg">
          ⏳ Processing quote with Chainlink Functions…
        </div>
      ) : (
        showResult && (
          <div className="max-w-xl w-full text-left animate-fade-in">
            <p>📍 <strong>Location:</strong> {result.location}</p>
            <p>🌾 <strong>Crop:</strong> {result.crop}</p>
            <p>⚠️ <strong>Area:</strong> {result.area} ha</p>
            <p>📊 <strong>Estimated Coverage:</strong> ≈ {result.estimatedCoverage.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>
            <p>📐 <strong>Detail:</strong> {`${result.area} ha × ${result.yieldPerHa} t/ha × ${result.pricePerKg} €/kg = ${(
              result.area *
              result.yieldPerHa *
              result.pricePerKg *
              1000
            ).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}`}</p>
            <p>💰 <strong>Estimated Premium:</strong> {result.premium.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</p>

            <div className="mt-4">
              <p>🧠 <strong>Risk Index:</strong> {result.riskIndex} / 100</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${result.riskIndex}%`,
                    backgroundColor:
                      result.riskIndex > 75
                        ? "#dc2626" // rouge
                        : result.riskIndex > 50
                        ? "#f59e0b" // orange
                        : "#22c55e", // vert
                  }}
                ></div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700">{result.note}</p>

            <div className="mt-6 flex gap-6">
              <Link to="/" className="text-blue-600 underline">
                ← Return to Home
              </Link>
              <Link to="/subscribe" className="text-green-600 underline">
                ✅ Subscribe to ARC
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
