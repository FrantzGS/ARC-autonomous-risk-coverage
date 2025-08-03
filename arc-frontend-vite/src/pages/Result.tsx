import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [loading, setLoading] = useState(true);
  const [riskIndex, setRiskIndex] = useState<number | null>(null);
  const [premium, setPremium] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomRisk = Math.random() * (0.95 - 0.6) + 0.6;
      const estimatedPremium = (randomRisk * 6821).toFixed(2);
      setRiskIndex(parseFloat(randomRisk.toFixed(2)));
      setPremium(parseFloat(estimatedPremium));
      setLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => navigate("/");
  const handleSubscribe = () => navigate("/subscribe");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        {loading ? (
          <div className="animate-pulse text-gray-600 text-lg">
            <p className="mb-4">🌍 Requesting risk data from Chainlink node...</p>
            <p className="text-sm text-gray-500">⏳ Please wait a few seconds...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">📊 Simulation Results</h2>
            <p className="mb-2 text-gray-700">🌾 <strong>Risk Index:</strong> {riskIndex}</p>
            <p className="mb-4 text-gray-700">💶 <strong>Estimated Premium:</strong> {premium} €</p>
            <p className="text-sm text-gray-500 mb-6">Powered by Chainlink Functions 🌐</p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoHome}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                🔙 Back to Homepage
              </button>
              <button
                onClick={handleSubscribe}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                🛡️ Subscribe to ARC
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
