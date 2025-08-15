import { FiUsers, FiClock } from "react-icons/fi";

const ProjectStats = ({ supporters, daysLeft, isLaunch }) => {
  const isArray = Array.isArray(supporters);
  const supporterCount = isArray ? supporters.length : supporters;

  return (
    <div
      className={`text-sm mb-4 ${
        isLaunch ? "flex justify-between items-center" : "flex flex-col gap-1"
      }`}
    >
      {/* Supporters */}
      <div className="flex items-center text-gray-600">
        <FiUsers className="mr-1" />
        <span>{supporterCount} supporters</span>
      </div>

      {/* Days */}
      <div className="flex items-center text-gray-600">
        <FiClock className="mr-1" />
        {isLaunch ? (
          <span>
            {daysLeft === 0
              ? "Ending today"
              : `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left`}
          </span>
        ) : (
          <span>
            Launching in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectStats;
