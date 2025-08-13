// components/LocationDisplay.jsx
import { FiMapPin } from "react-icons/fi";

const ProjectLocation = ({ location }) => (
  <div className="flex items-center text-xs text-gray-500 mb-3">
    <FiMapPin size={12} className="mr-1" />
    {location}
  </div>
);

export default ProjectLocation;
