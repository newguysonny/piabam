import { Link } from "react-router-dom";
import { FiChevronLeft, FiMoreVertical } from "react-icons/fi";

export default function CrewHeader({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between px-4 h-[50px] border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <Link to="/escrow-dashboard">
          <FiChevronLeft className="text-xl cursor-pointer" />
        </Link>
        <div>
          <div className="font-bold text-sm">Lem Crew</div>
          <div className="text-xs text-gray-400">Nneka and Friends Meal Crew...</div>
        </div>
      </div>
      <FiMoreVertical
        className="text-xl cursor-pointer"
        onClick={onMenuClick}
      />
    </div>
  );
}
