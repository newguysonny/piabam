const ReviewCard1 = ({
  restaurantName,
  rating,
  cuisine,
  distance,
  neighborhood,
  comment,
  author,
  date
}) => {
  return (
    <div className="h-[320px] md:h-[280px] bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col flex-shrink-0">
      {/* Rating + Cuisine */}
      <div className="flex items-center gap-2 h-8 mb-1">
        <div className="text-yellow-400">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {cuisine}
        </span>
      </div>

      {/* Restaurant Name */}
      <h3 className="font-bold text-lg line-clamp-1">{restaurantName}</h3>

      {/* Location */}
      <div className="flex items-center gap-1.5 mt-1 mb-2 text-sm text-gray-600">
        <FiMapPin className="text-red-500 flex-shrink-0" size={14} />
        <span>{distance} • {neighborhood}</span>
      </div>

      {/* Review Text */}
      <p className="mt-2 mb-4 line-clamp-3 flex-grow text-gray-700 italic">
        "{comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div>
          <p className="font-medium text-sm">{author}</p>
          <p className="text-gray-500 text-xs">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard1;
