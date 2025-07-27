const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Déploiement avec l'adresse :", deployer.address);

  const ARC = await ethers.getContractFactory("ARCSubscription");
  const contract = await ARC.deploy();
  await contract.deployed();

  const address = contract.address;
  console.log("Contrat ARCSubscription déployé à :", address);
}

main().catch((error) => {
  console.error("Erreur de déploiement :", error);
  process.exitCode = 1;
});
