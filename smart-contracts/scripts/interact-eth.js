const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const arcAddress = "0xacC17bC85A5B216114fE1fBaC950Ca81bfc7CFdB";
  const arc = await ethers.getContractAt("ARCSubscription", arcAddress, wallet);

  
  const cropType = "Colza";
  const hectares = 8;
  const pricePerKg = ethers.parseUnits("0.95", 2);
  const riskIndex = 30;

  const premium = ethers.parseUnits((8 * 10 * (30 + 1)).toString(), 0);

  
  console.log("💸 Appel de subscribeETH avec", ethers.formatEther(premium), "ETH");
  const tx = await arc.subscribeETH(
    cropType,
    hectares,
    pricePerKg,
    riskIndex,
    { value: premium, gasLimit: 300000 }
  );

  const receipt = await tx.wait();
  console.log("✅ Subscription confirmée :", tx.hash);
  console.log("📡 Events émis :", receipt.logs.map((log) => log.fragment?.name));
}

main().catch((error) => {
  console.error("❌ Erreur :", error);
  process.exitCode = 1;
});
