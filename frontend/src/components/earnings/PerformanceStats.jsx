const PerformanceStats = ({ trips, timeOnline, distance }) => {
  return (
    <div className="flex justify-between text-center py-4 border-t border-b border-gray-200">
      <div>
        <p className="text-lg font-bold">{trips}</p>
        <p className="text-xs text-gray-500">Total Trips</p>
      </div>
      <div>
        <p className="text-lg font-bold">{timeOnline}</p>
        <p className="text-xs text-gray-500">Time Online</p>
      </div>
      <div>
        <p className="text-lg font-bold">{distance} km</p>
        <p className="text-xs text-gray-500">Total Distance</p>
      </div>
    </div>
  );
};

export default PerformanceStats;
