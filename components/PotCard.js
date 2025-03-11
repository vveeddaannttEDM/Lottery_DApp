import { useEffect, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection, Program, Provider, web3 } from "@project-serum/anchor";
import idl from "../idl.json";  // Import the IDL file

const PROGRAM_ID = new PublicKey("YOUR_PROGRAM_ID_HERE"); // Replace with actual deployed program ID

const PotCard = () => {
  const [potAmount, setPotAmount] = useState(0);
  const [winner, setWinner] = useState(null);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const getProvider = () => {
    return new Provider(connection, wallet, { preflightCommitment: "processed" });
  };

  const handlePickWinner = async () => {
    if (!wallet) {
      alert("Please connect your wallet!");
      return;
    }

    try {
      const provider = getProvider();
      const program = new Program(idl, PROGRAM_ID, provider);
      await program.rpc.pickWinner();
      alert("Winner picked successfully!");
    } catch (error) {
      console.error("Error picking winner:", error);
      alert("Failed to pick a winner. Try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Current Lottery Pot</h2>
      <p className="text-lg mt-2">Total: <span className="font-bold">{potAmount.toFixed(2)} SOL</span></p>
      <button
        onClick={handlePickWinner}
        className="mt-4 px-4 py-2 bg-green-500 rounded-lg text-white font-bold hover:bg-green-600 transition"
      >
        Pick Winner 🎉
      </button>
    </div>
  );
};

export default PotCard;
