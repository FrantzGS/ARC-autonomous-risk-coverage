const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = "0xeCcD29dCc0ebeAdeaA70c0C3A40bBc4EaC95BA69";
  const [deployer] = await ethers.getSigners();
  console.log("👤 Utilisateur :", deployer.address);

  const consumer = await ethers.getContractAt("ARCFunctionsConsumer", contractAddress);

  // 1. JS source code mock (encode "RISK: 0.42")
  const jsSource = `
    return Functions.encodeString("RISK: 0.42");
  `;

  // 2. setSource
  const tx1 = await consumer.setSource(jsSource);
  await tx1.wait();
  console.log("✅ setSource() appelé.");

  // 3. setSubscriptionId (mock id = 1)
  const tx2 = await consumer.setSubscriptionId(1);
  await tx2.wait();
  console.log("✅ setSubscriptionId(1) appelé.");

  // 4. executeRequest
  const tx3 = await consumer.executeRequest();
  await tx3.wait();
  console.log("🚀 Requête exécutée (executeRequest)");

  // 5. Lire latestResponse
  const response = await consumer.latestResponse();
  console.log("📬 Réponse mock reçue :", response);
}

main().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exitCode = 1;
});
