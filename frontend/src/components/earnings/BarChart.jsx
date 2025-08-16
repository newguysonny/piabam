const BarChart = ({ data, activeIndex }) => {
  return (
    <div className="flex justify-between items-end h-32">
      {data.map((day, index) => (
        <div key={day.label} className="flex flex-col items-center">
          <div
            className={`w-6 rounded-t-lg ${
              index === activeIndex
                ? "bg-blue-600"
                : "bg-gradient-to-t from-blue-400 to-blue-500"
            }`}
            style={{ height: `${day.height}%` }}
          ></div>
          <p className="text-xs mt-1">{day.label}</p>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
