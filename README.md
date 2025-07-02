# ARClimate
Decentralized parametric weather insurance protocol. Built for ETHGlobal Unite Hackathon 2025.
Overview
ARC (Autonomous Risk Coverage) is a decentralized parametric insurance protocol designed to support farms and agricultural actors affected by extreme weather events.

Vision  
Make climate risk protection accessible, transparent, and automated using smart contracts and decentralized data oracles like Chainlink.  
Inspired by the recent Mastercard × Chainlink collaboration, ARC also explores integrating fiat on-ramps, allowing farmers to activate their insurance coverage directly via card payment, while handling on-chain logic and payouts through stablecoins.

### Installation

To install dependencies:

```bash
npm install

npx hardhat compile

```


## Swap Integration

ARClimate integrates 1inch via the frontend using Metamask to perform ETH, USDC, or USDT swaps before insurance subscription. This ensures simplicity, security, and user-controlled transactions while enabling premium payments in stablecoins for payouts.







Roadmap

🧠 Research & data source integration

🔐 Smart contract development (Solidity)

🌐 Frontend (React / Next.js)

⚙️ Chainlink oracle integration

✅ Testnet deployment

📦 MVP delivery for ETHGlobal Unite Hackathon


License
This project is open-source under the MIT license. 





## 🚀 Deployment

This smart contract is deployed on a testnet using Hardhat.

### Compile

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

