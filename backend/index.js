const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/calculate', async (req, res) => {
  const { surface, culture } = req.body;

  try {
    const weatherData = await getWeatherDataNarbonne();
    const { riskIndex, details } = calculateRiskIndexFromWeather(weatherData);

    const basePrice = getBasePrice(culture);
    const prime = Number((basePrice * surface * riskIndex).toFixed(2));

    res.json({
      riskIndex,
      prime,
      details
    });

  } catch (error) {
    console.error('❌ Erreur calcul /calculate', error);
    res.status(500).json({ error: 'Erreur lors du calcul de la prime' });
  }
});

function getBasePrice(culture) {
  const prices = {
    'blé': 0.35,
    'maïs': 0.28,
    'colza': 0.4,
    'tournesol': 0.38
  };
  return prices[culture?.toLowerCase()] || 0.3;
}

app.listen(PORT, () => {
  console.log(`✅ Backend IA running on http://localhost:${PORT}`);
});

async function getWeatherDataNarbonne() {
  const latitude = 43.1833;
  const longitude = 3.0;

  const years = [2020, 2021, 2022, 2023, 2024];
  const allPrecip = [];
  const allMinTemp = [];
  const allMaxTemp = [];

  for (const year of years) {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${year}-01-01&end_date=${year}-12-31&daily=precipitation_sum,temperature_2m_min,temperature_2m_max&timezone=Europe%2FParis`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.daily) {
        allPrecip.push(...data.daily.precipitation_sum);
        allMinTemp.push(...data.daily.temperature_2m_min);
        allMaxTemp.push(...data.daily.temperature_2m_max);
      } else {
        console.warn(`⚠️ Pas de données pour ${year}`);
      }
    } catch (error) {
      console.error(`❌ Erreur sur ${year}`, error);
    }
  }

  return {
    precipitations: allPrecip,
    minTemperatures: allMinTemp,
    maxTemperatures: allMaxTemp
  };
}

function calculateRiskIndexFromWeather(weatherData) {
  const { precipitations, minTemperatures, maxTemperatures } = weatherData;

  const totalPrecip = precipitations.reduce((a, b) => a + b, 0);
  const avgPrecip = totalPrecip / 5;

  let droughtScore;
  if (avgPrecip < 300) droughtScore = 1;
  else if (avgPrecip < 450) droughtScore = 0.7;
  else droughtScore = 0.3;

  const frostDays = minTemperatures.filter(temp => temp < 0).length;
  let frostScore;
  if (frostDays > 60) frostScore = 1;
  else if (frostDays > 30) frostScore = 0.6;
  else frostScore = 0.2;

  const heatDays = maxTemperatures.filter(temp => temp > 35).length;
  let heatScore;
  if (heatDays > 50) heatScore = 1;
  else if (heatDays > 25) heatScore = 0.6;
  else heatScore = 0.2;

  const riskIndex = Number(((0.5 * droughtScore) + (0.3 * frostScore) + (0.2 * heatScore)).toFixed(2));

  return {
    riskIndex,
    details: {
      avgPrecip,
      frostDays,
      heatDays
    }
  };
}
