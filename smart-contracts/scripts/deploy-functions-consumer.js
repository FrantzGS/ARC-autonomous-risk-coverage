const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🧑‍💻 Déploiement avec l'adresse :", deployer.address);

  const ARCFunctionsConsumer = await ethers.getContractFactory("ARCFunctionsConsumer");
  const contract = await ARCFunctionsConsumer.deploy();

  await contract.waitForDeployment();

  console.log("✅ Contrat déployé à l'adresse :", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Erreur de déploiement :", error);
  process.exitCode = 1;
});
