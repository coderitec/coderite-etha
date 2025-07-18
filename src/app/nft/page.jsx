"use client";

import { useState } from "react";
import { fetchNFTs } from "../lib/fetchNFTs";
import WalletConnect from "../components/WalletConnect";
import Image from "next/image";

export default function NFT() {
    const [wallet, setWallet] = useState('');
    const [nfts, setNfts] = useState([]);

    const loadNFTs = async () => {
        const result = await fetchNFTs(wallet);
        setNfts(result);
    }
  return (
    <div className="p-16">
        <h1 className="text-2xl font-bold mb-4">NFT Gallery</h1>
        <WalletConnect setWallet={setWallet} />
        {wallet && (
            <>
            <button 
                onClick={loadNFTs} 
                className="bg-white hover:bg-blue-700 text-slate-950 hover:text-white px-6 py-2 rounded-full cursor-pointer mt-4"
                >
                Load My NFTs
            </button>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nfts.length > 0 ? (
                    nfts.map((nft, index) => (
                        <figure key={index} className="border p-4 rounded-lg bg-slate-800">
                            <Image src={nft.media[0].gateway} alt={nft.title} className="w-full h-48 object-cover mb-2 rounded-lg" width={400} height={500} />
                            <figcaption className="text-lg font-semibold">{nft.title || 'No Title'}</figcaption>
                            {/* <p className="text-sm text-gray-400">{nft.contract.address || 'No Address'}</p> */}
                        </figure>
                    ))
                ) : (
                    <p className="text-gray-400">No NFTs found for this wallet.</p>
                )}
            </div>
            </>
        )}
    </div>
  )
}