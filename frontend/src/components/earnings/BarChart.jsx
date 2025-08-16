import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell
} from "recharts";

// Always visible tooltip with arrow
const AlwaysVisibleTooltip = ({ activeIndex, data }) => {
  const activeData = data[activeIndex];
  if (!activeData) return null;

  return (
    <foreignObject
      x={(activeIndex * (100 / data.length)) + "%"}
      y="0"
      width="100"
      height="60"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "translate(-50%, -100%)",
        }}
      >
        {/* Tooltip Box */}
        <div
          style={{
            background: "#fff",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
            fontWeight: "500"
          }}
        >
          <p className="font-bold m-0">{activeData.label}</p>
          <p className="m-0">₦{activeData.value.toFixed(2)}</p>
        </div>

        {/* Arrow */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #fff",
            filter: "drop-shadow(0 -1px 1px rgba(0,0,0,0.15))"
          }}
        ></div>
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

          {/* Gradient */}
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
                    ? "#7e22ce" // active solid purple
                    : "url(#barGradient)"
                }
              />
            ))}
          </Bar>

          {/* Always visible tooltip */}
          <AlwaysVisibleTooltip data={data} activeIndex={activeIndex} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
