function calculateRiskIndexFromWeather(weatherData, cropType) {
  return 0.62; // valeur mockée
}

function getBasePrice(cropType) {
  const prices = {
    blé: 0.35,
    maïs: 0.30,
    tournesol: 0.45
  };
  return prices[cropType] || 0.40;
}

module.exports = { calculateRiskIndexFromWeather, getBasePrice };
