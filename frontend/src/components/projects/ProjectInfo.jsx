import { FiMapPin } from "react-icons/fi";


const ProjectInfo = ({ title, host, description }) => (
  <>
    <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
    <p className="text-gray-600 text-sm mb-1">Hosted by {host}</p>
    <p className="text-gray-500 text-xs line-clamp-2 mb-2">{description}</p>
  </>
);


export default ProjectInfo;
