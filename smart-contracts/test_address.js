const { ethers } = require("ethers");
require('dotenv').config({ path: '.env' });

const rawAddress = process.env.FUNCTIONS_CONSUMER_ADDRESS.trim();
console.log("Adresse brute récupérée :", rawAddress);

try {
    const cleanAddress = ethers.utils.getAddress(rawAddress);
    console.log("Adresse Ethereum valide :", cleanAddress);
} catch (error) {
    console.error("Adresse Ethereum invalide :", error.message);
}
