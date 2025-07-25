import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider({
  url: "https://eth-sepolia.g.alchemy.com/v2/xRZIgS7seigZuyejJg-kH",
  chainId: 11155111,
  name: "sepolia"
});

async function test() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("Connexion réussie. Dernier block :", blockNumber);
  } catch (err) {
    console.error("Erreur de connexion :", err);
  }
}

test();
