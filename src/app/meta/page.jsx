"use client"
import { useEffect, useState } from "react"
import Web3 from "web3";

export default function Meta() {
    const [wallet, setWallet] = useState('')
    const [balance, setBalance] = useState('')
    const [error, setError] = useState('')

    const connectWallet = async () => {
        if(typeof window.ethereum === 'undefined'){
            setError('Metamask not detected')
            return;
        }

        try{
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            setWallet(accounts[0]);
            setError('');
        }catch(err) {
            setError('Failed to connect wallet');
        }
    }

    const getBalance = async(address) => {
        const web3 = new web3(window.ethereum);
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(parseFloat(balanceEth).toFixed(4));
    }

    useEffect(() => {
        if (wallet) getBalance(wallet);

        if(window.ethereum){
            window.ethereum.on('accountsChanged', (account) => {
                setWallet(account[0] || "");
                if(account[0]) getBalance(account[0]);
             })
        }
    }, [wallet]);


  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-950 text-white">
        <h1 className="text-2xl font-bold mb-4">Metamask and Eth Balance</h1>

        { wallet ? (
            <div>
                <p className="mb-2 font-semibold">{wallet}</p>
                <p>Balance: <span className="font-semibold">{balance}</span></p>
            </div>
        ) : (
            <button className="bg-white hover:bg-blue-700 text-slate-950 hover:text-white px-6 py-2 rounded-full cursor-pointer" onClick={connectWallet}>
                Connect Wallet
            </button>
        )}

        {error && <p className="text-slate-100 bg-red-800 p-4 mt-2">{error}</p>}
    </main>
  )
}