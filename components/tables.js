import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useAnchorWallet, Program, Provider } from "@project-serum/anchor";
import idl from "../idl.json";

const PROGRAM_ID = new PublicKey("YOUR_PROGRAM_ID_HERE");

const Table = () => {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const getProvider = () => {
    return new Provider(connection, wallet, { preflightCommitment: "processed" });
  };

  useEffect(() => {
    const fetchLotteryData = async () => {
      if (!wallet) return;
      const provider = getProvider();
      const program = new Program(idl, PROGRAM_ID, provider);
      const lotteryState = await program.account.lottery.fetch();
      setParticipants(lotteryState.participants.map(p => p.toBase58()));
      if (lotteryState.winner) {
        setWinner(lotteryState.winner.toBase58());
      }
    };

    fetchLotteryData();
  }, [wallet]);

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-lg font-bold">Lottery Participants</h2>
      <ul className="mt-2">
        {participants.length === 0 ? (
          <p>Loading participants...</p>
        ) : (
          participants.map((name, index) => (
            <li key={index} className="py-1 border-b border-gray-700">
              {name}
            </li>
          ))
        )}
      </ul>
      {winner && (
        <p className="mt-4 text-green-400 text-lg">Winner: {winner}</p>
      )}
    </div>
  );
};

export default Table;
