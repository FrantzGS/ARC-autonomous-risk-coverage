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


### ✅ Backend API

The ARC backend is deployed on [Render](https://render.com).

It exposes a public POST route at `/api/calculate`, which computes the weather-based risk index and premium based on:

- `address`: used for geolocation (e.g. "Narbonne, France")
- `crop`: type of crop (e.g. "blé")
- `surface`: field size in hectares

### 🧪 Example request

```json
{
  "address": "Narbonne, France",
  "crop": "blé",
  "surface": "10"
}




✅ Example response 

```{
  "address": "Narbonne, France",
  "crop": "blé",
  "surface": 10.0,
  "risk_index": 0.503,
  "prime": 8173.75
} ```

---

✅ This backend is consumed by Chainlink Functions and the frontend React interface.

---

### 🧪 Testnet Deployment & Usage
The ARCSubscription contract has been successfully deployed and tested on the Sepolia testnet.

Contract address: 0xE21fdc30466d605Dc61d8C2973fd35f0787f5A57 

---

### ✅ Successful USDC Subscription
User wallet: 0x7D031cbf6993c9Df9b2fD80BE3b12D5f455760A7

TxHash: 0x885e4cc6c7aa8f92c7f90bf1b3eb7b06cddae9bdfe1d472461e07c3d10d8f1822

Crop: maize

Area: 10 hectares

Duration: 30 days

Price per kg: 0.3 USDC

Amount paid: 1000 USDC (mock) 

---

### ✅ Mock Token (USDC)
MockUSDC address: deployed locally on Sepolia

Minted 1000 USDC (6 decimals) to the user account before subscription





