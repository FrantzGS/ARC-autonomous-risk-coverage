const { config } = require("dotenv");
config();
const fs = require("fs");
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = process.env.FUNCTIONS_CONSUMER_ADDRESS;
  const abi = JSON.parse(
    fs.readFileSync(
      "./artifacts/contracts/ARCFunctionsConsumer.sol/FunctionsConsumer.json",
      "utf8"
    )
  ).abi;

  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const requestId = process.env.REQUEST_ID;
  if (!requestId) throw new Error("Missing REQUEST_ID in .env");

  const response = ethers.utils.defaultAbiCoder.encode(["uint256"], [42]); // valeur mockée
  const error = "0x";

  try {
    console.log("📡 Simulating callStatic...");
    await contract.callStatic.testFulfillRequest(requestId, response, error);
    console.log("✅ callStatic succeeded ➡️ real transaction will be sent.");

  } catch (callErr) {
    console.error("❌ callStatic reverted:", callErr);
    return;
  }

  // Si on arrive ici, callStatic a réussi
  try {
    console.log("⛓️ Sending real transaction...");
    const tx = await contract.testFulfillRequest(requestId, response, error);
    console.log(`📬 Tx hash: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log("✅ Transaction mined:", receipt.transactionHash);
  } catch (txErr) {
    console.error("❌ Transaction failed:", txErr);
  }
}

main();
