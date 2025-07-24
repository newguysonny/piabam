import { FiMapPin } from 'react-icons/fi';

const ReviewCard1 = ({
  restaurantName,
  rating,
  cuisine,
  distance,
  neighborhood,
  comment,
  author,
  date
}) => (
  <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
    <div className="p-5 flex flex-col h-full">
      {/* Ratings + Cuisine */}
      <div className="flex items-center gap-2 mb-2">
        <div className="text-yellow-400">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {cuisine}
        </span>
      </div>

      {/* Restaurant Name */}
      <h3 className="font-bold text-lg line-clamp-1 mb-1">{restaurantName}</h3>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        <FiMapPin className="text-red-500" size={14} />
        <span>{distance} • {neighborhood}</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 italic line-clamp-3 flex-grow mb-4">
        "{comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        <div>
          <p className="font-medium text-sm">{author}</p>
          <p className="text-gray-500 text-xs">{date}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewCard1;
