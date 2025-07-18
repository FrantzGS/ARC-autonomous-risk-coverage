const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Déploiement avec :", deployer.address);

  const initialSupply = ethers.parseUnits("1000000", 6); // 1 million USDC

  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const mock = await MockUSDC.deploy(initialSupply);
  await mock.waitForDeployment();

  console.log("✅ Mock USDC déployé à :", await mock.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
