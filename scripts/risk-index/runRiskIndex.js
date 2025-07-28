const { exec } = require("child_process");
const path = require("path");

function runRiskIndex(crop, area) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join("scripts", "requests", "request.js");
    const command = `npx dotenv -e ../.env -- node ${scriptPath} --crop ${crop} --area ${area}`;

    exec(command, { cwd: "smart-contracts" }, (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur RiskIndex:", stderr);
        return reject(error);
      }

      const match = stdout.match(/🌡️  Risk Index : ([\d.]+)/);
      if (match) {
        const riskIndex = parseFloat(match[1]);
        console.log("✅ Risk Index récupéré :", riskIndex);
        resolve(riskIndex);
      } else {
        reject("RiskIndex non trouvé dans la sortie.");
      }
    });
  });
}

if (require.main === module) {
  const crop = process.argv[2] || "mais";
  const area = process.argv[3] || 10;

  runRiskIndex(crop, area)
    .then(index => console.log(`🌾 Résultat final RiskIndex : ${index}`))
    .catch(err => console.error("❌ Échec RiskIndex:", err));
}

module.exports = runRiskIndex;

