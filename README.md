🌾 ARC – Autonomous Risk Coverage
Climate-Linked Smart Coverage for a Changing World

ARC is a decentralized climate risk coverage protocol built on Ethereum.
It provides farmers with automated, transparent protection against extreme weather events (drought, heatwaves, frost…), using on-chain data and AI-calculated risk indexes.

🔍 The Problem
Climate volatility is destroying crops across the globe.
Traditional insurance is slow, opaque, and often inaccessible to small and medium farmers.
ARC replaces paperwork with smart contracts, and subjective evaluations with verifiable, automated payouts.

✅ What the MVP Delivers

Real-time subscription to climate coverage per crop

USDC / USDT / ETH payment via wallet

Risk Index calculated from weather data (mocked)

Dynamic premium estimation (off-chain AI backend)

Autonomous payout logic (mocked for demo)

Full testnet deployment (Sepolia)

🧱 Tech Stack

Solidity (smart contracts)

Chainlink Functions & Automation (mocked)

Python Flask (risk/premium backend)

React.js (frontend)

Sepolia Testnet (live)

📘 Note
This MVP is a functional simulation.
In production, ARC will integrate Chainlink weather oracles, real on-chain AI risk scoring, and DeFi yield strategies to sustain premium pools.

## ✅ Backend API

The ARC backend is deployed on [Render](https://arc-autonomous-risk-coverage.onrender.com).

It exposes a public POST route at `/api/calculate`, which computes the weather-based risk index and premium based on:

- `address`: used for geolocation (e.g. "Narbonne, France")
- `crop`: type of crop (e.g. "blé")
- `surface`: field size in hectares

**Example request**:
```json
{
  "address": "Narbonne, France",
  "crop": "blé",
  "surface": "10"
}

Example response: 

{
  "address": "Narbonne, France",
  "crop": "blé",
  "surface": 10.0,
  "risk_index": 0.503,
  "prime": 8173.75
}

✅ This backend is consumed by Chainlink Functions and the frontend React interface.