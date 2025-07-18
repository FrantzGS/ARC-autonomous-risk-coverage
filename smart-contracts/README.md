# 🧠 ARC Solidity Smart Contracts

This folder contains the core smart contracts powering the ARC (Autonomous Risk Coverage) protocol. ARC enables decentralized, parametric climate risk coverage for small and medium-scale farmers using verifiable weather data and smart contracts.

---

## ✅ Key Contracts

- `ARCSubscription.sol` – Main contract handling subscriptions, payouts, and risk index logic.
- `MockUSDC.sol` / `MockUSDT.sol` – ERC20 mocks for testing payment flows.
- `ARCFunctionsConsumer.sol` – Chainlink Functions consumer for off-chain risk scoring (mocked).
- `FunctionsClient.sol` / `FunctionsRequest.sol` – Imported from Chainlink starter kit (used locally).

---

## ⚙️ Main Features

- Multi-token subscription support: **USDC, USDT, ETH**
- Risk index logic (mocked in V1, Chainlink Functions-ready)
- Dynamic payout simulation
- Security best practices: `Ownable`, `ReentrancyGuard`, `Pausable`
- Clean event logs and `Checks-Effects-Interactions` pattern
- Ready for Chainlink Functions & Automation

---

## 🧪 How to Deploy & Test (Sepolia)

```bash
# Compile contracts
npx hardhat compile

# Deploy mocks (USDC / USDT)
npx hardhat run scripts/deploy-mock-usdc.js --network sepolia
npx hardhat run scripts/deploy-mock-usdt.js --network sepolia

# Mint tokens to your address
npx hardhat run scripts/mintTokens.js --network sepolia

# Deploy ARCSubscription.sol
npx hardhat run scripts/deploy.js --network sepolia

# Approve tokens
npx hardhat run scripts/approve.js --network sepolia

# Subscribe with USDC or USDT
npx hardhat run scripts/subscribeTest.js --network sepolia
npx hardhat run scripts/subscribeUSDTTest.js --network sepolia

# Simulate a payout
npx hardhat run scripts/payoutTest.js --network sepolia

🔐 Security & Best Practices
 Solidity version pinned (^0.8.19)

 OpenZeppelin libraries used for ownership, pausing, and reentrancy guard

 Chainlink integration mock-ready

 Events emitted for all major actions

 Gas-optimized storage & logic patterns

 Modular, auditable architecture

🔭 Future Integrations (V2)
Chainlink Functions (live weather oracle + AI backend)

Chainlink Automation for scheduled checks

DeFi yield strategies with Aave or Morpho

Legal audit and parameter validation logic

👤 Author
Frantz Galinier-Stefani
📧 arclimate.dev@gmail.com
🔗 LinkedIn
Hackathon: ETHGlobal Unite DeFi 2025
