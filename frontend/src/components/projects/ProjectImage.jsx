
// ProjectImage.jsx
import { FiMusic, FiCoffee, FiStar } from "react-icons/fi";

const categories = [
  { value: "music", label: "Music", icon: <FiMusic /> },
  { value: "food", label: "Food", icon: <FiCoffee /> },
  { value: "arts", label: "Arts", icon: <FiStar /> },
];

const getCategoryIcon = (type) =>
  categories.find((c) => c.value === type)?.icon;

const ProjectImage = ({ image, title, type }) => {
  const category = categories.find((c) => c.value === type);

  return (
    <div className="relative aspect-video bg-gray-200">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
        {getCategoryIcon(type)}
        <span className="ml-1">{category?.label}</span>
      </div>
    </div>
  );
};

export default ProjectImage;

/*
const ProjectImage = ({ image, title, type, categories, getCategoryIcon }) => {
  return (
    <div className="relative aspect-video bg-gray-200">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
        {getCategoryIcon(type)}
        <span className="ml-1">{categories.find(c => c.value === type)?.label}</span>
      </div>
    </div>
  );
};

export default ProjectImage;
*/
