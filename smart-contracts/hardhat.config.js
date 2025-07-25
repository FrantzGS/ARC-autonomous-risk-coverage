require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { networks } = require("./networks");

module.exports = {
  defaultNetwork: "ethereumSepolia",
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
  networks: {
    ...networks,
  },
  etherscan: {
    apiKey: {
      sepolia: networks.ethereumSepolia.verifyApiKey,
      arbitrumSepolia: networks.arbitrumSepolia.verifyApiKey,
      baseSepolia: networks.baseSepolia.verifyApiKey,
      optimismSepolia: networks.optimismSepolia.verifyApiKey,
      polygonAmoy: networks.polygonAmoy.verifyApiKey,
    },
    customChains: [
      {
        network: "ethereumSepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io",
        },
      },
    ],
  },
};
