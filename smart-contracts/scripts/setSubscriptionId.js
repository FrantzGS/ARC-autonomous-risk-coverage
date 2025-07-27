const { ethers } = require("hardhat");

async function main() {
  const consumerAddress = "0xacc1b648b282b54075f9b7eae51b8236dd2fcfdb";
  const subscriptionId = 5331;

  const consumer = await ethers.getContractAt("ARCFunctionsConsumer", consumerAddress);

  const tx = await consumer.setSubscriptionId(subscriptionId);
  await tx.wait();

  console.log("Subscription ID mis à jour :", subscriptionId);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
