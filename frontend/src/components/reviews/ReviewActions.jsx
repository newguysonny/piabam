import { Lightbulb, AlarmClockCheck, Heart, Frown } from "lucide-react";

export default function ReviewActions({ reactions }) {
  const actions = [
    { icon: <Lightbulb size={18} />, label: "Helpful", count: reactions.helpful },
    { icon: <AlarmClockCheck size={18} />, label: "Set Reminder", count: reactions.thanks },
    { icon: <Heart size={18} />, label: "Love this", count: reactions.love },
    { icon: <Frown size={18} />, label: "Oh no", count: reactions.ohNo }
  ];

  return (
    <div className="flex justify-between mt-4 pt-2 border-t-0 text-gray-500 text-sm">
      {actions.map((a, idx) => (
        <button
          key={idx}
          className="flex flex-col items-center hover:text-black transition-colors"
        >
          {a.icon}
          <span>{a.label} {a.count}</span>
        </button>
      ))}
    </div>
  );
}
