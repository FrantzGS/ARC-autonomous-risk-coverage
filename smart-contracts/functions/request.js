const { SubscriptionManager } = require("@chainlink/functions-toolkit");
const { ethers } = require("ethers");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const {
  routerAddress,
  donId,
  subscriptionId,
  gasLimit,
  secrets,
  args,
  source,
  codeLocation,
  secretsLocation,
  expectedReturnType,
} = require("../functions-request-config");

const ABI = require("../../artifacts/contracts/ARCFunctionsConsumer.sol/ARCFunctionsConsumer.json").abi;

const request = async () => {
  const privateKey = process.env.PRIVATE_KEY;
  const rpcUrl = process.env.SEPOLIA_RPC_URL;

  if (!privateKey || !rpcUrl) {
    throw new Error("Missing PRIVATE_KEY or SEPOLIA_RPC_URL in .env");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const contractAddress = process.env.FUNCTIONS_CONSUMER_ADDRESS;
  const consumerContract = new ethers.Contract(contractAddress, ABI, wallet);

  console.log(`📡 Envoi de la requête Chainlink Functions...`);
  console.log(`🌾 Culture : ${args[0]}`);
  console.log(`📏 Surface : ${args[1]} hectares`);

  const FunctionsClient = require("@chainlink/functions-toolkit").FunctionsClient;

  const functionsClient = new FunctionsClient({
    signer: wallet,
    routerAddress,
    donId,
  });

  const requestConfig = {
    source,
    codeLocation,
    secrets,
    secretsLocation,
    args,
    bytesArgs: [],
  };

  const { requestId } = await functionsClient.sendRequest({
    id: subscriptionId,
    data: requestConfig,
    callbackGasLimit: gasLimit,
    contractAddress,
  });

  console.log(` Requête envoyée avec success !`);
  console.log(`Request ID : ${requestId}`);
};

request().catch((err) => {
  console.error(" Erreur lors de l'envoi de la requête :", err);
});
