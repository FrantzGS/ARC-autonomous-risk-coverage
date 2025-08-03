'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abi/ARCSubscription.json';

const contractAddress = '0xE21fdc30466d605Dc61d8C2973f3d5370B757A57'; // adresse du contrat ARC sur Sepolia

export default function SubscribePage() {
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } else {
      alert('Please install Metamask.');
    }
  };

  const fakeSwap = async () => {
    setStatus('✅ Swap ETH → USDC simulated via 1inch API (mock)');
  };

  const subscribe = async () => {
    if (!account) {
      setStatus('❌ Wallet not connected');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const crop = 'blé';
      const area = 10;

      const tx = await contract.subscribeUSDC(crop, area);
      await tx.wait();

      setStatus('✅ Subscription successful');
    } catch (error: any) {
      console.error('❌ Subscription error:', error);
      setStatus('❌ Error during subscription.');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6 py-12 space-y-4">
      <h1 className="text-2xl font-bold text-center">Subscribe to ARC 🌾</h1>

      {account ? (
        <p className="text-green-600">
          ✅ Connected as: <span className="font-mono">{account}</span>
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          🔐 Connect Wallet
        </button>
      )}

      <div className="flex space-x-4">
        <button
          onClick={fakeSwap}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          🔁 Simulate Swap ETH → USDC (mock)
        </button>

        <button
          onClick={subscribe}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          ✅ Subscribe to ARC with USDC
        </button>
      </div>

      <p className="mt-4 text-center">{status}</p>
    </div>
  );
}
