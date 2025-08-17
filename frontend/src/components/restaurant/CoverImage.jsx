import { FaArrowLeft, FaHeart, FaEllipsisH} from "react-icons/fa";

export default function CoverImage({ src }) {
‎  return (
‎    <div className="relative">
‎      <img
‎        src={src}
‎        alt="Restaurant cover"
‎        className="w-full h-56 object-cover"
‎      />
‎
‎      {/* Top action buttons */}
‎      <div className="absolute top-3 left-3 flex space-x-2">
‎        <button className="bg-black/50 text-white p-2 rounded-full">
‎          <FaArrowLeft />
‎        </button>
‎      </div>
‎      <div className="absolute top-3 right-3 flex space-x-2">
‎        <button className="bg-black/50 text-white p-2 rounded-full">
‎          <FaHeart />
‎        </button>
‎        <button className="bg-black/50 text-white p-2 rounded-full">
‎          <FaEllipsisH />
‎        </button>
‎      </div>
‎    </div>
‎  );
‎}
