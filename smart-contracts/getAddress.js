const { Wallet } = require("ethers");
require("dotenv").config();

const wallet = new Wallet(process.env.PRIVATE_KEY);
console.log("Adresse publique :", wallet.address);
