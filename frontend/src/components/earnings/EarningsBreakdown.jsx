const EarningsBreakdown = ({ total, tripEarnings, taxes }) => {
  return (
    <div className="py-4">
      <div className="flex justify-between font-bold">
        <span>Earnings</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600 mt-2">
        <span>Trip Earnings</span>
        <span>${tripEarnings.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-600 mt-1">
        <span>Taxes</span>
        <span>${taxes.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default EarningsBreakdown;
