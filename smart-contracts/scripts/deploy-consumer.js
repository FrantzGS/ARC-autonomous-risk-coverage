require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const oracleAddress = process.env.ORACLE_ADDRESS;

  if (!ethers.utils.isAddress(oracleAddress)) {
    throw new Error("ORACLE_ADDRESS is not a valid Ethereum address.");
  }

  const donId = ethers.utils.formatBytes32String("fun-ethereum-sepolia-1");

  console.log("ORACLE_ADDRESS:", oracleAddress);
  console.log("Longueur de ORACLE_ADDRESS:", oracleAddress.length);
  console.log("DON_ID (bytes32):", donId);

  const ConsumerFactory = await ethers.getContractFactory("ARCFunctionsConsumer");
  const consumerContract = await ConsumerFactory.deploy(oracleAddress, donId);

  await consumerContract.deployed();

  console.log(`Contract deployed to: ${consumerContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erreur de déploiement :", error);
    process.exit(1);
  });
