const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = "0xeCcD29dCc0ebeAdeaA70c0C3A40bBc4EaC95BA69";
  const [deployer] = await ethers.getSigners();
  console.log("👤 Utilisateur :", deployer.address);

  const consumer = await ethers.getContractAt("ARCFunctionsConsumer", "0x9A4934EEA73Bb33B56eb865a9CCc5E8DEfb46C7B");


  const tx = await consumer.mockFulfill("RISK: 0.42");
  await tx.wait();

  const result = await consumer.latestResponse();
  console.log("📬 latestResponse() =>", result);
}

main().catch((error) => {
  console.error("❌ Erreur de mock :", error);
  process.exitCode = 1;
});
