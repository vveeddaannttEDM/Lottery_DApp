import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-900 text-white">
      <h1 className="text-2xl font-bold">Solana Lottery Dapp</h1>
      <WalletMultiButton />
    </header>
  );
};

export default Header;
