const path = require("path");

async function runRiskIndex(crop, area) {
  try {
    const simulateRiskIndex = require(path.join(
      "..",
      "..",
      "scripts",
      "requests",
      "request.js"
    ));

    const index = simulateRiskIndex(crop, area);
    console.log(" Risk Index récupéré :", index);
    return index;
  } catch (err) {
    console.error(" Échec RiskIndex:", err);
  }
}

if (require.main === module) {
  const crop = process.argv[2] || "mais";
  const area = process.argv[3] || 10;
  runRiskIndex(crop, area).then((index) =>
    console.log(`🌾 Résultat final RiskIndex : ${index}`)
  );
}

module.exports = runRiskIndex;
