import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

export default function CoverImage({ src, isStore = true }) {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <img
        src={src}
        alt="Restaurant cover"
        className="w-full h-46 object-cover"
      />

      {/* Top action buttons */}
      <div className="absolute top-3 left-3 flex space-x-2">
        {isStore && ( // ← Only show back button for stores
          <button
            onClick={() => navigate(-1)}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
      
      <div className="absolute top-3 right-3 flex space-x-2">
        {/* Heart button - always visible */}
        <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
          <FaHeart />
        </button>
        
        {/* More button - only for stores */}
        {isStore && (
          <button className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
            <MdMoreVert />
          </button>
        )}
      </div>
    </div>
  );
}


/*
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

export default function CoverImage({ src }) {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img
        src={src}
        alt="Restaurant cover"
        className="w-full h-56 object-cover"
      />

      {/* Top action buttons /}
      <div className="absolute top-3 left-3 flex space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/50 text-white p-2 rounded-full hover:text-black">
          <FaArrowLeft />
        </button>
      </div>
      <div className="absolute top-3 right-3 flex space-x-2">
        <button className="bg-black/50 text-white p-2 rounded-full">
          <FaHeart />
        </button>
           <button className="bg-black/50 text-white p-2 rounded-full">
          <MdMoreVert />
        </button>
      </div>
    </div>
  );
}
*/
