const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const mockUSDC = "0xE03B6dF5B43237Bf64A2B512FF1483C06F2703F2";
  const usdc = await ethers.getContractAt("IERC20", mockUSDC, wallet);

  const balance = await usdc.balanceOf(wallet.address);
  console.log("💰 Balance MockUSDC :", ethers.formatUnits(balance, 6), "USDC");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
