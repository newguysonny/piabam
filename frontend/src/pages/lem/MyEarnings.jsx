import WalletBalanceCard from "../../components/earnings/WalletBalanceCard";
import WeeklyEarningsCard from "../../components/earnings/WeeklyEarningsCard";
import PerformanceStats from "../../components/earnings/PerformanceStats";
import EarningsBreakdown from "../../components/earnings/EarningsBreakdown";

export default function MyEarnings() {
  const chartData = [
    { label: "S", height: 80 },
    { label: "M", height: 40 },
    { label: "T", height: 90 },
    { label: "W", height: 30 },
    { label: "T", height: 70 },
    { label: "F", height: 75 },
    { label: "S", height: 20 },
  ];

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-center text-lg font-bold">My Earnings</h1>

      <WalletBalanceCard balance={59.9} onWithdraw={() => alert("Withdraw")} />

      <WeeklyEarningsCard
        week="Dec 7 - 14"
        total={1959.9}
        chartData={chartData}
        activeIndex={2}
      />

      <PerformanceStats trips={140} timeOnline="6d 18h" distance={45} />

      <EarningsBreakdown
        total={1959.9}
        tripEarnings={1860}
        taxes={99.9}
      />
    </div>
  );
}
