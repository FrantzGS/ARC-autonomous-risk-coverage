const { Location, ReturnType } = require("@chainlink/functions-toolkit");

module.exports = async function buildRequestConfig(hre, { crop, area }) {
  return {
    codeLocation: Location.INLINE,
    secretsLocation: Location.NONE,
    source: `
      const crop = args[0];
      const area = args[1];
      return \`Risk index for \${crop} on \${area}ha = 0.42\`;
    `,
    args: [crop, area.toString()],
    expectedReturnType: ReturnType.STRING,
  };
};
