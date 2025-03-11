import { useEffect, useState } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import Header from "../components/Header";
import PotCard from "../components/PotCard";
import Table from "../components/Table";

export default function Home() {
  const [lotteryPot, setLotteryPot] = useState(0);
  const [participants, setParticipants] = useState(0);
  
  // Solana connection setup
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  // Simulate fetching blockchain data (will replace with real data later)
  useEffect(() => {
    setLotteryPot(2.5); // Example: 2.5 SOL in the pot
    setParticipants(10); // Example: 10 participants
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            <Header />
            <main className="mt-10 w-full max-w-3xl">
              <PotCard potAmount={lotteryPot} participants={participants} />
              <Table />
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
