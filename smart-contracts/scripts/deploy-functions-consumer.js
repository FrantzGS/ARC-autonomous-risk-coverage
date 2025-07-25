const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🧑‍💻 Déploiement avec l'adresse :", deployer.address);

  const ARCFunctionsConsumer = await hre.ethers.getContractFactory("ARCFunctionsConsumer");
  const contract = await ARCFunctionsConsumer.deploy();

  await contract.deployed();
  console.log("✅ Contrat déployé à l'adresse :", contract.address);
}

main().catch((error) => {
  console.error("❌ Erreur de déploiement :", error);
  process.exit(1);
});
