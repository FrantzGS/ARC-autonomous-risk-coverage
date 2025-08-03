// const geo = require('./utils/geo');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Fonctions internes météo / IA

// const { getWeatherDataNarbonne } = require('./utils/geo');
const { calculateRiskIndexFromWeather, getBasePrice } = require('./utils/risk');

dotenv.config();

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('✅ ARC backend is live!');
});

//  Route SWAP via 1inch API
app.post('/swap', async (req, res) => {
  const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage } = req.body;

  try {
    const response = await axios.get('https://api.1inch.dev/swap/v5.2/1/swap', {
      headers: {
        Authorization: `Bearer ${process.env.ONE_INCH_API_KEY}`
      },
      params: {
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress,
        slippage
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(' Swap API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch swap data from 1inch' });
  }
});

// Route CALCUL simulateur RiskIndex + Prime
app.post('/calculate', async (req, res) => {
  const { surface, culture } = req.body;

  try {
    const weatherData = await getWeatherDataNarbonne();
    const { riskIndex, details } = calculateRiskIndexFromWeather(weatherData);
    const basePricePerHectare = getBasePrice(culture);
    const prime = (surface * basePricePerHectare * riskIndex).toFixed(2);
    const payout = (surface * basePricePerHectare).toFixed(2);

    res.json({
      success: true,
      surface,
      culture,
      riskIndex,
      prime,
      payout,
      details
    });

  } catch (error) {
    console.error(' RiskIndex error:', error.message);
    res.status(500).json({ error: 'Failed to calculate RiskIndex' });
  }
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(` ARC backend listening on http://localhost:${PORT}`);
});
