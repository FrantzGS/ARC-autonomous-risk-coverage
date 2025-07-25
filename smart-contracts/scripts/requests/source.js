const cropRiskData = await Functions.makeHttpRequest({
  url: args[0],
});

if (!cropRiskData || cropRiskData.error) {
  throw Error("Request failed");
}

const result = cropRiskData.data;

if (!result || typeof result.risk_index !== "number") {
  throw Error("Invalid response format");
}

return Functions.encodeUint256(Math.floor(result.risk_index * 10000));
