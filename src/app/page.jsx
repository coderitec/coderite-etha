"use client"; // use only if you're in app router

import { useState } from "react";
import Web3 from "web3";

export default function Home() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const checkBalance = async () => {
    if (!address) return;

    const provider = new Web3.providers.HttpProvider(
  process.env.NEXT_PUBLIC_ALCHEMY_URL
);

    const web3 = new Web3(provider);

    try {
      const wei = await web3.eth.getBalance(address);
      const eth = web3.utils.fromWei(wei, "ether");
      setBalance(parseFloat(eth).toFixed(4));
    } catch (err) {
      console.error(err);
      setBalance("Error fetching balance");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-white">
      <h1 className="font-bold mb-4 uppercase text-5xl space-y-4">Ethereum Balance Checker</h1>
      <input
        type="text"
        placeholder="Enter Ethereum wallet address"
        className="border px-4 py-2 mb-4 w-full max-w-md rounded-2xl"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={checkBalance}
        className="bg-white hover:bg-blue-700 text-slate-950 hover:text-white px-6 py-2 rounded-full cursor-pointer"
      >
        Check Balance
      </button>
      {balance && (
        <p className="mt-4 text-lg rounded-2xl">
          Balance: <strong>{(balance * 1).toLocaleString()} ETH</strong>
        </p>
      )}
    </main>
  );
}
