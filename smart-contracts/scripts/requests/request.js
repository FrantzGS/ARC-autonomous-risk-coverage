const hre = require("hardhat");
const configFn = require("../../functions/functions-request-config.mock.js");
const path = require("path");
const minimist = require("minimist");

(async () => {
  const args = minimist(process.argv.slice(2));
  const crop = args.crop || "blé";
  const area = args.area || "1";

  console.log(" Culture :", crop);
  console.log(" Surface :", area, "hectares");

  const config = await configFn(hre, { crop, area });

  const request = buildRequest(config);
  const simulatedResponse = await simulateRequest(request);

  console.log(" Simulated response:", simulatedResponse);
})();

function buildRequest(config) {
  return {
    source: config.source,
    codeLocation: 0,
    language: 0,
    args: config.args || [],
    secrets: config.secrets || {},
    expectedReturnType: config.expectedReturnType || "uint256",
  };
}

async function simulateRequest(request) {
  const vm = require("vm");
  const axios = require("axios");

  const wrappedSource = `
    (async () => {
      ${request.source}
    })()
  `;

  const sandbox = {
    require,
    Buffer,
    console,
    Functions: {
      makeHttpRequest: async ({ url, method }) => {
        const res = await axios({ url, method });
        return { data: res.data };
      },
      encodeUint256: (x) => x,
    },
    args: request.args,
    secrets: request.secrets,
  };

  vm.createContext(sandbox);
  const script = new vm.Script(wrappedSource);

  try {
    const result = await script.runInContext(sandbox);
    return result;
  } catch (err) {
    console.error(" Error during simulation:", err);
    throw err;
  }
}
if (require.main === module) {
  const args = require('minimist')(process.argv.slice(2));
  const crop = args.crop || "mais";
  const area = args.area || 10;

  simulateRiskIndex(crop, area);
}

function simulateRiskIndex(crop, area) {
  const index = Math.random().toFixed(2);
  console.log(`🧪 Simulated response: Risk index for ${crop} on ${area}ha = ${index}`);
  return index;
}

module.exports = simulateRiskIndex;
