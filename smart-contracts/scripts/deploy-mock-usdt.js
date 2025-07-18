const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec :", deployer.address);

  const initialSupply = ethers.parseUnits("1000000.0", 6);

  const MockUSDT = await ethers.getContractFactory("MockUSDT");
  const mock = await MockUSDT.deploy(initialSupply);
  await mock.waitForDeployment();

  console.log("✅ Mock USDT déployé à :", await mock.getAddress());
}

main().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exitCode = 1;
});
