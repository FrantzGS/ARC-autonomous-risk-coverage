import { SubscriptionManager } from "@chainlink/functions-toolkit";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const providerRpc = process.env.SEPOLIA_RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const donId = process.env.DON_ID || "fun-ethereum-sepolia-1";
const functionsRouterAddress =
  process.env.FUNCTIONS_ROUTER_ADDRESS || "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
const linkTokenAddress = process.env.LINK_TOKEN_ADDRESS;
const consumerAddress = process.env.FUNCTIONS_CONSUMER_ADDRESS;
const subscriptionId = process.env.SUBSCRIPTION_ID;

if (
  !providerRpc ||
  !privateKey ||
  !donId ||
  !functionsRouterAddress ||
  !linkTokenAddress ||
  !consumerAddress ||
  !subscriptionId
) {
  throw new Error("Certaines variables d'environnement sont manquantes !");
}

console.log("🧪 providerRpc :", providerRpc);
console.log("🧪 donId :", donId);
console.log("🧪 functionsRouter :", functionsRouterAddress);
console.log("🧪 linkTokenAddress :", linkTokenAddress);
console.log("🧪 consumerAddress :", consumerAddress);
console.log("🧪 subscriptionId :", subscriptionId);

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const wallet = new ethers.Wallet(privateKey, provider);
  const network = await provider.getNetwork();

  const subscriptionManager = new SubscriptionManager({
    signer: wallet,
    linkTokenAddress,
    functionsRouterAddress,
  });

  await subscriptionManager.initialize();

  const requestId = await subscriptionManager.fulfillRequest({
    subscriptionId: Number(subscriptionId),
    consumerAddress,
  });

  console.log(`Requête fulfill envoyée avec succès. Request ID : ${requestId}`);
}

main().catch((e) => {
  console.error("Erreur pendant la requête Chainlink :", e);
  process.exit(1);
});
