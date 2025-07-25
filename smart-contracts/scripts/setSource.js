const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.CONSUMER_ADDRESS;
  const consumer = await hre.ethers.getContractAt("ARCFunctionsConsumer", contractAddress);

  const source = `
const url = args[0];

const response = await Functions.makeHttpRequest({
  url: url,
  method: "GET"
});

if (response.error) {
  throw Error(\`Request failed: \${response.message}\`);
}

const data = response.data;

if (!data || !data.risk_index) {
  throw Error("Invalid response format");
}

return Functions.encodeUint256(Math.floor(data.risk_index * 10000));
`;

  const tx = await consumer.setSource(source);
  await tx.wait();
  console.log("✅ Source set successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
