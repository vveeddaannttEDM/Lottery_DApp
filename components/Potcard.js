const PotCard = () => {
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Current Lottery Pot</h2>
      <p className="text-lg mt-2">Total: <span className="font-bold">0 SOL</span></p>
      <p className="mt-1">Participants: <span className="font-bold">0</span></p>
    </div>
  );
};

export default PotCard;
