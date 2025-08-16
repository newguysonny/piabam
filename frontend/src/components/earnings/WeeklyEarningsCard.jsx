import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BarChart from "./BarChart";

const WeeklyEarningsCard = ({ week, total, chartData, activeIndex }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <FiChevronLeft className="text-gray-500 cursor-pointer" />
        <p className="text-sm font-medium">{week}</p>
        <FiChevronRight className="text-gray-500 cursor-pointer" />
      </div>

      {/* Total */}
      <p className="text-3xl font-bold text-center mb-4">
        ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>

      {/* Chart */}
      <BarChart data={chartData} activeIndex={activeIndex} />
    </div>
  );
};

export default WeeklyEarningsCard;
