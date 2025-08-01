require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

async function main() {
  const block = await provider.getBlockNumber();
  console.log("Connexion RPC Sepolia OK. Block #", block);
}

main().catch(console.error);
