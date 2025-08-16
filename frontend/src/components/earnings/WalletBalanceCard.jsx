const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const WalletBalanceCard = ({ balance, onWithdraw }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg flex justify-between items-center text-white shadow-md">
      <div>
        <p className="text-sm opacity-80">Wallet Balance</p>
        <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
      </div>
      <button
        onClick={onWithdraw}
        className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        Withdraw
      </button>
    </div>
  );
};

export default WalletBalanceCard;
