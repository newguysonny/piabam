import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import CoverImage from "./CoverImage";
import Avatar from "./Avatar";

‎export default function RestaurantInfo() {
‎  return (
‎    <div className="relative w-full">
‎      {/* Cover Image with Avatar */}
‎      <div className="relative">
‎        <CoverImage src="https://placehold.co/800x400" />
‎        <Avatar src="https://placehold.co/100x100" />
‎      </div>
‎
‎      {/* Info Section */}
‎      <div className="mt-8 px-4 text-center">
‎        {/* Name */}
‎        <h1 className="text-xl font-bold">Salem&apos;s Fresh Eats</h1>
‎
‎        {/* Rating */}
‎        <div className="flex items-center justify-center text-gray-700 mt-1 space-x-1">
‎          <FaStar className="text-yellow-500" />
‎          <span className="font-semibold">4.3</span>
‎          <span className="text-sm">(4,000+)</span>
‎          <span className="font-semibold">· 1.6 mi</span>
‎        </div>
‎
‎        {/* Prep Time */}
‎        <div className="mt-1 text-gray-700 text-sm">
‎          <p>
‎            Crews/Group: <span className="font-medium">4 hours</span>
‎          </p>
‎          <p>
‎            Individual Order: <span className="font-medium">15–20 mins</span>
‎          </p>
‎        </div>
‎
‎        {/* Address */}
‎        <div className="flex items-center justify-center mt-1 text-gray-600">
‎          <FaMapMarkerAlt className="mr-1" />
‎          <span>2015 N 50th St</span>
‎        </div>
‎      </div>
‎    </div>
‎  );
‎}




/*
export default function RestaurantInfo() {
  return (
    <div className="relative w-full">
      {/* Cover image /}
<div className="relative">
  <img
    src="https://placehold.co/800x400"
    alt="Restaurant cover"
    className="w-full h-56 object-cover"
  />

  {/* Top action buttons /}
  <div className="absolute top-3 left-3 flex space-x-2">
    <button className="bg-black/50 text-white p-2 rounded-full">
      <FaArrowLeft />
    </button>
  </div>
  <div className="absolute top-3 right-3 flex space-x-2">
    <button className="bg-black/50 text-white p-2 rounded-full">
      <FaHeart />
    </button>
    <button className="bg-black/50 text-white p-2 rounded-full">
      <FaEllipsisH />
    </button>
  </div>

  {/* ✅ Avatar (now relative to cover image, not whole component) /}
  <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
    <img
      src="https://placehold.co/100x100"
      alt="Restaurant avatar"
      className="w-20 h-20 rounded-full border-4 border-white shadow-md"
    />
  </div>
</div>

      {/* Info Section /}
      <div className="mt-8 px-4 text-center">
        {/* Name /}
        <h1 className="text-xl font-bold">Salem&apos;s Fresh Eats</h1>

        {/* Rating /}
        <div className="flex items-center justify-center text-gray-700 mt-1">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="font-semibold">4.3</span>
          <span className="ml-1 text-sm">(4,000+)</span>
          <span className="font-semibold">.1.6 mi</span>
        </div>

        {/* Prep Time /}
        <div className="mt-1 text-gray-700 text-sm">
          <p>Crews/Group: <span className="font-medium">4 hours</span></p>
          <p>Individual Order: <span className="font-medium">15–20 mins</span></p>
        </div>

        {/* Address /}
        <div className="flex items-center justify-center mt-1 text-gray-600">
          <FaMapMarkerAlt className="mr-1" />
          <span>2015 N 50th St</span>
        </div>
      </div>
    </div>
  );
}
*/
