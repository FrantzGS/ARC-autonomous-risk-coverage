const path = require('path');
const fs = require("fs");
const { ethers } = require("ethers");
require("dotenv").config({ path: "../.env" });

// 🛠️ Config
const consumerAddress = "0x265A805aE859aC1cAd418840Ace4d19467B4d446";
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.SEPOLIA_RPC_URL;

// 📦 Charger l'ABI
const abi = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../abi/FunctionsConsumer.json'), 'utf8')
).abi;

// 🧪 Simuler des données mock
const mockRequestId = ethers.utils.hexlify(ethers.utils.randomBytes(32));
const mockRiskIndex = Math.floor(Math.random() * 100); // entre 0 et 99
const mockResponse = ethers.utils.defaultAbiCoder.encode(
  ["uint256"],
  [mockRiskIndex]
);
const mockError = "0x";

// 🔐 Créer provider + signer
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
if (!privateKey) {
  throw new Error("🚨 PRIVATE_KEY est manquant dans le fichier .env !");
}
const wallet = new ethers.Wallet(privateKey, provider);

// 🔌 Connexion au contrat
const consumerContract = new ethers.Contract(consumerAddress, abi, wallet);

// 🚀 Exécution du test
async function main() {
  console.log("📡 Envoi mock testFulfillRequest...");

  try {
    const tx = await consumerContract.testFulfillRequest(
      mockRequestId,
      mockResponse,
      mockError
    );
    console.log(`📤 Transaction envoyée : ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`✅ Mock Fulfill exécuté dans le bloc ${receipt.blockNumber}`);
  } catch (error) {
    console.error("❌ Erreur lors du testFulfillRequest :", error.message);
  }
}

main();
