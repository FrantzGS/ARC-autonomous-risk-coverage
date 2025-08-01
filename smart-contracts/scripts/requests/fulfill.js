import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const abiPath = path.resolve(
  __dirname,
  "../../artifacts/contracts/ARCFunctionsConsumer.sol/ARCFunctionsConsumer.json"
);
const FunctionsConsumerAbi = JSON.parse(fs.readFileSync(abiPath, "utf8"));

async function main() {
  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const consumerAddress = process.env.FUNCTIONS_CONSUMER_ADDRESS;

  if (!rpcUrl || !privateKey || !consumerAddress) {
    throw new Error("Missing environment variables");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const consumer = new ethers.Contract(
    consumerAddress,
    FunctionsConsumerAbi.abi,
    wallet
  );

  const mockRequestId = ethers.utils.hexZeroPad("0x1234", 32);
  const mockRiskIndex = ethers.utils.toUtf8Bytes("42");

  console.log(`Calling fulfillRequest() with mock values...`);
  const tx = await consumer.testFulfillRequest(mockRequestId, mockRiskIndex, []);
  console.log(`Tx hash : ${tx.hash}`);
  await tx.wait();
  console.log("fulfillRequest() exécuté avec succès !");
}

main().catch((err) => {
  console.error("Erreur dans fulfill.js :", err);
});
