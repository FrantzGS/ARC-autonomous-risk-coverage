require("dotenv").config();

const ORACLE = process.env.ORACLE_ADDRESS;

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Déploiement avec l'adresse :", deployer.address);

  const DON_ID = hre.ethers.utils.formatBytes32String(process.env.DON_ID);
  const ARCFunctionsConsumer = await hre.ethers.getContractFactory("ARCFunctionsConsumer");
  const contract = await ARCFunctionsConsumer.deploy(ORACLE, DON_ID)
  await contract.deployed();
  console.log("Contrat déployé à l'adresse :", contract.address);
}

main().catch((error) => {
  console.error("Erreur de déploiement :", error);
  process.exit(1);
});
