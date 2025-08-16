const WalletBalanceCard = ({ balance, onWithdraw }) => {
  return (
    <div className="bg-blue-500 p-4 rounded-lg flex justify-between items-center text-white">
      <div>
        <p className="text-sm opacity-80">Wallet Balance</p>
        <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
      </div>
      <button
        onClick={onWithdraw}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100"
      >
        Withdraw
      </button>
    </div>
  );
};

export default WalletBalanceCard;
