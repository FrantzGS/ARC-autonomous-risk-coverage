const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🧑‍💻 Déploiement avec l'adresse :", deployer.address);

  const contractFactory = await ethers.getContractFactory("ARCFunctionsConsumer");

  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log("✅ Contrat ARCFunctionsConsumer déployé à :", deployedAddress);
}

main().catch((error) => {
  console.error("❌ Erreur de déploiement :", error);
  process.exitCode = 1;
});
