const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const arcAddress = "0xacC17bC85A5B216114fE1fBaC950Ca81bfc7CFdB";
  const mockUSDC = "0xE03B6dF5B43237Bf64A2B512FF1483C06F2703F2";

  const arc = await ethers.getContractAt("ARCSubscription", arcAddress, wallet);
  const usdc = await ethers.getContractAt("IERC20", mockUSDC, wallet);

  const amount = ethers.parseUnits("50", 6);
  const pricePerKg = ethers.parseUnits("1.2", 2);

  // Étape 1 : Approve
  console.log("🔁 Étape 1 : approve()");
  const approveTx = await usdc.approve(arcAddress, amount);
  await approveTx.wait();
  console.log("✅ Approve réussi");

  // Étape 2 : Subscribe
  console.log("🔁 Étape 2 : subscribeUSDC()");
  const tx = await arc.subscribeUSDC(
    mockUSDC,
    "Blé dur",
    5,
    pricePerKg,
    42,
    { gasLimit: 300000 }
  );
  const receipt = await tx.wait();
  console.log("✅ Subscription confirmée :", tx.hash);

  // Étape 3 : Events
  console.log("📡 Events émis :", receipt.logs.map(log => log.fragment?.name));
}

main().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exitCode = 1;
});
