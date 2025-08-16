const PerformanceStats = ({ meals, timeOnline, guests }) => {
  return (
    <div className="flex justify-between text-center py-4 border-t border-b border-gray-200">
      <div>
        <p className="text-lg font-bold">{meals}</p>
        <p className="text-xs text-gray-500">Total Meals</p>
      </div>
      <div>
        <p className="text-lg font-bold">{timeOnline}</p>
        <p className="text-xs text-gray-500">Time Online</p>
      </div>
      <div>
        <p className="text-lg font-bold">{guests}</p>
        <p className="text-xs text-gray-500">Total Guests</p>
      </div>
    </div>
  );
};

export default PerformanceStats;
