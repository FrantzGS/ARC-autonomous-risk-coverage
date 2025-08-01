const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const arcAddress = ethers.utils.getAddress("0xE21fdc30466d605Dc61d8C2973f3d5370B757A57");
const mockUSDCAddress = ethers.utils.getAddress("0xD3a6a55581d90035e5C92bC082DbeA9A8f4Bdf94");
console.log("Contract address (ARC):", arcAddress);
console.log("MockUSDC address:", mockUSDCAddress);

  const arc = await ethers.getContractAt("ARCSubscription", arcAddress, wallet);
  const mockUSDC = await ethers.getContractAt("IERC20", mockUSDCAddress, wallet);

  const amount = ethers.utils.parseUnits("50", 6);
  const pricePerKg = ethers.utils.parseUnits("1.2", 2); // 1.20€

  const balance = await mockUSDC.balanceOf(wallet.address);
  console.log("USDC balance:", balance.toString());

  console.log("Étape 1 : approve()");
  const approveTx = await mockUSDC.approve(arcAddress, amount);
  await approveTx.wait();
  console.log("Approve réussi");

  console.log("Appel subscribeUSDC avec :");
console.log(" - token address :", mockUSDC.address);
console.log(" - surface :", 5);
console.log(" - crop :", "blé dur");
console.log(" - duration :", 120);

  console.log("Étape 2 : subscribeUSDC()");
  const subscribeTx = await arc.subscribeUSDC(
    mockUSDCAddress,
    "Blé dur",
    5,
    pricePerKg,
    42,
    { gasLimit: 300000 }
  );
  const subscribeReceipt = await subscribeTx.wait();
  console.log("Subscription confirmée :", subscribeTx.hash);

  console.log("Étape 3 : payout()");
  const payoutTx = await arc.payout();
  await payoutTx.wait();
  console.log("Payout exécuté :", payoutTx.hash);

  console.log("Events émis :", subscribeReceipt.logs.map(log => log.fragment?.name || "unknown"));
}

main().catch((error) => {
  console.error("Erreur :", error);
  process.exit(1);
});
