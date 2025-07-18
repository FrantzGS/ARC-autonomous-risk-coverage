const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const arcAddress = "0xacC17bC85A5B216114fE1fBaC950Ca81bfc7CFdB";
  const mockUSDT = "0xBF407300c8D3Bf17A6aa68A57Aa0D246cE42ce91";

  const arc = await ethers.getContractAt("ARCSubscription", arcAddress, wallet);
  const usdt = await ethers.getContractAt("IERC20", mockUSDT, wallet);

  const amount = ethers.parseUnits("50", 6);

  console.log("🔁 Étape 1 : approve()");
  const approveTx = await usdt.approve(arcAddress, amount);
  await approveTx.wait();
  console.log("✅ Approve réussi");

  console.log("🔁 Étape 2 : subscribeUSDT()");
  const tx = await arc.subscribeUSDT(
    mockUSDT,
    "Maïs",
    10,       
    ethers.parseUnits("0.65", 18),
    36,       
    { gasLimit: 300000 }
  );

  const receipt = await tx.wait();
  console.log("✅ Subscription confirmée :", tx.hash);
  console.log("📡 Events émis :", receipt.logs.map((log) => log.fragment?.name));
}

main().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exitCode = 1;
});
