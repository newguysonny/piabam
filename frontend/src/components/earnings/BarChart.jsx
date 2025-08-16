import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Always visible tooltip for active bar
const AlwaysVisibleTooltip = ({ activeIndex, data }) => {
  const activeData = data[activeIndex];
  if (!activeData) return null;

  return (
    <foreignObject
      x={activeIndex * (100 / data.length) + "%"} // position horizontally
      y={0} // adjust if needed
      width="80"
      height="50"
    >
      <div
        style={{
          textAlign: "center",
          background: "#fff",
          borderRadius: "4px",
          padding: "4px",
          fontSize: "12px",
          border: "1px solid #ddd",
          transform: "translate(-50%, -100%)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }}
      >
        <p className="font-bold">{activeData.label}</p>
        <p>₦{activeData.value.toFixed(2)}</p>
      </div>
    </foreignObject>
  );
};

const BarChart = ({ data, activeIndex }) => {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data}>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          {/* Normal hover tooltip (optional) */}
          <Tooltip
            cursor={{ fill: "transparent" }}
            formatter={(value) => [`₦${value.toFixed(2)}`, "Earnings"]}
          />

          {/* Bar gradient */}
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
              <stop offset="100%" stopColor="#7e22ce" /> {/* purple-800 */}
            </linearGradient>
          </defs>

          {/* Bars */}
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === activeIndex
                    ? "#7e22ce" // active bar solid purple
                    : "url(#barGradient)"
                }
              />
            ))}
          </Bar>

          {/* Always visible tooltip for active bar */}
          <AlwaysVisibleTooltip data={data} activeIndex={activeIndex} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
