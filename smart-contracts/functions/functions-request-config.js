const { Location, ReturnType } = require("@chainlink/functions-toolkit");

module.exports = {
  routerAddress: "0x261c05167db67B2b619f9d312e0753f3721ad6E8",
  donId: "fun-sepolia-1",
  subscriptionId: process.env.SUBSCRIPTION_ID,
  gasLimit: 300000,
  secrets: {},
  args: ["mais", "10"],
  source: `
    const crop = args[0];
    const area = args[1];
    const endpoint = \`https://arc-backend.onrender.com/risk-index?crop=\${crop}&area=\${area}\`;

    const response = await Functions.makeHttpRequest({ url: endpoint });

    if (response.error) {
      throw Error(\`Request failed: \${response.message}\`);
    }

    if (!response.data || !response.data.riskIndex) {
      throw Error("No riskIndex in response");
    }

    return Functions.encodeUint256(Math.floor(response.data.riskIndex * 10000));
  `,
  codeLocation: Location.INLINE,
  secretsLocation: Location.NONE,
  expectedReturnType: ReturnType.UINT256,
};
