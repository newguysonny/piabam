import { FiUsers, FiClock } from "react-icons/fi";

const ProjectStats = ({ supporters, daysLeft }) => (
  <div className="flex justify-between items-center text-sm mb-4">
    <div className="flex items-center text-gray-600">
      <FiUsers className="mr-1" />
      <span>{supporters.length} supporters</span>
    </div>
    <div className="flex items-center text-gray-600">
      <FiClock className="mr-1" />
      <span>
        {daysLeft === 0 ? "Ending today" : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
      </span>
    </div>
  </div>
);

export default ProjectStats;
