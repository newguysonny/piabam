export default function CrewStats() {
  return (
    <div className="mt-1 flex gap-4 text-[10px] text-gray-400">
      <StatItem icon="👥" value="5.1K" label="Participants" />
      <StatItem icon="🌐" value="50" label="Followers" />
      <StatItem icon="🍽️" value="26K" label="Meals Sold" />
      <StatItem icon="⭐" value="3.5" label="Rating" />
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span>{icon}</span>
      <span>{value}</span>
      <span className="text-[9px]">{label}</span>
    </div>
  );
}
