import { FiMapPin } from "react-icons/fi";

const ProjectInfo = ({ project }) => (
  <>
    <h3 className="font-bold text-lg mb-1 line-clamp-1">{project.title}</h3>
    <p className="text-gray-600 text-sm mb-1">Hosted by {project.host}</p>
    <p className="text-gray-500 text-xs line-clamp-2 mb-2">{project.description}</p>
    <div className="flex items-center text-xs text-gray-500 mb-3">
      <FiMapPin size={12} className="mr-1" /> {project.location}
    </div>
  </>
);

export default ProjectInfo;
