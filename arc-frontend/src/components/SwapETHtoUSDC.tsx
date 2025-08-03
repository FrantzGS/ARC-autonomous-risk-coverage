import { useState } from 'react';
import { getSwapQuote } from '../lib/oneInch';

export default function SwapETHtoUSDC() {
  const [ethAmount, setEthAmount] = useState('');
  const [usdcAmount, setUsdcAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const USDC_SEPOLIA = '0xdC2cEcBd2aCFb2517fFfa730D5313aC16e06f473'; // mock USDC
  const FROM_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH natif
  const userAddress = (window as any).ethereum?.selectedAddress;

  const simulate = async () => {
    if (!ethAmount || !userAddress) return;

    setIsLoading(true);
    setError('');
    try {
      const amountInWei = BigInt(Number(ethAmount) * 1e18).toString();

      const res = await getSwapQuote({
        fromTokenAddress: FROM_TOKEN,
        toTokenAddress: USDC_SEPOLIA,
        amount: amountInWei,
        fromAddress: userAddress,
        slippage: 1,
      });

      const usdcReceived = Number(res.toTokenAmount) / 1e6;
      setUsdcAmount(usdcReceived.toFixed(2));
    } catch (err: any) {
      setError(err.message || 'Simulation error');
    } finally {
      setIsLoading(false);
    }
  };

  const swap = async () => {
    if (!ethAmount || !userAddress) return;

    try {
      const amountInWei = BigInt(Number(ethAmount) * 1e18).toString();

      const res = await getSwapQuote({
        fromTokenAddress: FROM_TOKEN,
        toTokenAddress: USDC_SEPOLIA,
        amount: amountInWei,
        fromAddress: userAddress,
        slippage: 1,
      });

      const txParams = {
        from: userAddress,
        to: res.tx.to,
        data: res.tx.data,
        value: res.tx.value,
      };

      const txHash = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });

      setTxHash(txHash);
    } catch (err: any) {
      setError(err.message || 'Swap failed');
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Swap ETH → USDC</h2>

      <input
        type="number"
        placeholder="Amount in ETH"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      <button
        onClick={simulate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
        disabled={isLoading}
      >
        {isLoading ? 'Simulating...' : 'Simulate Quote'}
      </button>

      {usdcAmount && (
        <p className="text-green-600 mb-2">
          Estimated: {usdcAmount} USDC
        </p>
      )}

      <button
        onClick={swap}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Confirm Swap via Metamask
      </button>

      {txHash && (
        <p className="mt-4 text-sm">
          {' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700"
          >
            View transaction on Etherscan
          </a>
        </p>
      )}

      {error && (
        <p className="text-red-600 mt-4 text-sm">{error}</p>
      )}
    </div>
  );
}
