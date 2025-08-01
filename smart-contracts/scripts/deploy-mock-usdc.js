require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

const ABI = JSON.parse(fs.readFileSync("./artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json", "utf8")).abi;
const BYTECODE = JSON.parse(fs.readFileSync("./artifacts/contracts/mocks/MockUSDC.sol/MockUSDC.json", "utf8")).bytecode;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Déploiement avec :", wallet.address);

  const factory = new ethers.ContractFactory(ABI, BYTECODE, wallet);
  const mock = await factory.deploy();

  console.log("Déployé à l'adresse :", mock.address);
}

main().catch((err) => {
  console.error("Erreur :", err);
});
