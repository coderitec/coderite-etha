"use client"

import { useEffect, useState } from "react";
import Web3 from "web3";

export default function Meta() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask not detected");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
      setError("");
    } catch (err) {
      setError("Connection rejected");
    }
  };

  const getBalance = async (address) => {
    const web3 = new Web3(window.ethereum);
    const balanceWei = await web3.eth.getBalance(address);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    setBalance(parseFloat(balanceEth).toFixed(4));
  };

  useEffect(() => {
    if (wallet) getBalance(wallet);

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWallet(accounts[0] || "");
        if (accounts[0]) getBalance(accounts[0]);
      });
    }
  }, [wallet]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">MetaMask + ETH Balance</h1>

      {wallet ? (
        <>
          <p className="mb-2">Wallet: <strong>{wallet}</strong></p>
          <p>Balance: <strong>{balance} ETH</strong></p>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </main>
  );
}
