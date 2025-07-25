require("dotenv").config();

const networks = {
  ethereumSepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
    verifyApiKey: process.env.ETHERSCAN_API_KEY,
    chainId: 11155111,
    functionsRouter: "0x8C1CfEcB1771bC3dE5f3c1E55Ab5b01Df3D5f4D9",
functionsDonId: "fun-ethereum-sepolia-1",

  },
  arbitrumSepolia: {
    url: process.env.ARBITRUM_SEPOLIA_RPC_URL || "",
    accounts: [process.env.PRIVATE_KEY],
    verifyApiKey: process.env.ARBISCAN_API_KEY || "",
    chainId: 421614,
  },
  baseSepolia: {
    url: process.env.BASE_SEPOLIA_RPC_URL || "",
    accounts: [process.env.PRIVATE_KEY],
    verifyApiKey: process.env.BASESCAN_API_KEY || "",
    chainId: 84532,
  },
  optimismSepolia: {
    url: process.env.OPTIMISM_SEPOLIA_RPC_URL || "",
    accounts: [process.env.PRIVATE_KEY],
    verifyApiKey: process.env.OPTIMISM_API_KEY || "",
    chainId: 11155420,
  },
  polygonAmoy: {
    url: process.env.POLYGON_AMOY_RPC_URL || "",
    accounts: [process.env.PRIVATE_KEY],
    verifyApiKey: process.env.POLYGONSCAN_API_KEY || "",
    chainId: 80002,
  },
};

module.exports = {
  networks,
};
