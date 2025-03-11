const Table = () => {
  const participants = ["Alice", "Bob", "Charlie", "David", "Eve"]; // Dummy list

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg w-full">
      <h2 className="text-lg font-bold">Lottery Participants</h2>
      <ul className="mt-2">
        {participants.map((name, index) => (
          <li key={index} className="py-1 border-b border-gray-700">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
