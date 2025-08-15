import { FiUsers, FiClock } from "react-icons/fi";

const ProjectStats = ({ supporters, daysLeft, isLaunch }) => {
  return (
    <div className="flex flex-col text-sm mb-4">
      {/* Supporters */}
      <div className="flex items-center text-gray-600">
        <FiUsers className="mr-1" />
        <span>
          {Array.isArray(supporters)
            ? `${supporters.length} supporters`
            : `${supporters} supporters`}
        </span>
      </div>

      {/* Days */}
      <div className="flex items-center text-gray-600 mt-1">
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




/*
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
*/
