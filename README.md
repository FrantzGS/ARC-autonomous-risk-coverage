# 🌾 ARClimate – Parametric Weather Insurance on Blockchain

## 🚀 Project Overview

ARClimate is a decentralized parametric insurance platform that protects farmers against climate risks (droughts, heatwaves, etc.) with automated payouts based on on-chain data.

✅ **MVP functionalities implemented:**
- Create insurance policies for crops with premium, area, and duration
- Pay premiums in **MockUSDC** or **MockUSDT**
- Calculate **Risk Index** (mocked)
- Calculate **Payout** (mocked)
- Trigger payout execution

---

## 🛠️ **Tech Stack**

- **Solidity** (Smart contracts)
- **Hardhat** (Development & testing)
- **OpenZeppelin** (Security & ERC20 implementation)
- **Sepolia Testnet** (Deployment & testing)

---

## 📂 **Project Structure**

``` contracts/

ARClimate.sol

MockUSDC.sol

MockUSDT.sol
scripts/

deploy.js

deployMocks.js

mintTokens.js

approve.js

subscribeTest.js

subscribeUSDTTest.js

payoutTest.js 
```

---

## ⚙️ **Deployment & Test Instructions**

1. **Compile contracts**

```bash
npx hardhat compile
```

Deploy Mock tokens (USDC & USDT)
npx hardhat run scripts/deployMocks.js --network sepolia

Mint Mock tokens to your wallet
npx hardhat run scripts/mintTokens.js --network sepolia

Deploy ARClimate contract
Update deploy.js with deployed Mock token addresses and your wallet address:
const usdcAddress = "0x...";
const usdtAddress = "0x...";
const poolAddress = "0x..."; 

Then deploy:
npx hardhat run scripts/deploy.js --network sepolia

Approve tokens to ARClimate
npx hardhat run scripts/approve.js --network sepolia

Subscribe with USDC
npx hardhat run scripts/subscribeTest.js --network sepolia

Subscribe with USDT
npx hardhat run scripts/subscribeUSDTTest.js --network sepolia

Trigger payout
npx hardhat run scripts/payoutTest.js --network sepolia


Tests & Validation
✅ Tested on Sepolia testnet with:

Successful deploys
Token approvals
Policy subscriptions
Payout execution with event emission

Screenshots
Add screenshots in your presentation:

Compilation success
Deploy Mock tokens
Mint tokens
Deploy ARClimate
Approve tokens
Subscribe USDC & USDT
Payout execution 

Vision
In production, ARClimate will integrate:

Chainlink Functions & oracles for live weather data
Automated yield strategies (DeFi) to grow premium pools
Real risk index AI models to optimize premium calculation

Author

GALINIER-STEFANI Frantz
www.linkedin.com/in/frantz-galinier-stefani-90571965
arclimate.dev@gmail.com
Hackathon: ETHGlobal Unite DeFi 2025 



Note: This MVP uses mocked functions for demonstration. Risk Index and Payout logic will be integrated with Chainlink and real data feeds in V2.
