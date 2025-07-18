"use client"
import { useState } from "react";
import {ethers} from "ethers";

export default  function WalletConnect({setWallet}) {
    const [connected, setConnected] = useState(false);


    const connectWallet = async () => {
        if(!window.ethereum) {
            alert("Please install MetaMask!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]);
        setConnected(true);

    }

  return (
    <button onClick={connectWallet} className="bg-white hover:bg-blue-700 text-slate-950 hover:text-white px-6 py-2 rounded-full cursor-pointer">
        { connected ? "Wallet Connected" : "Connect Wallet" }
    </button>
  )
}