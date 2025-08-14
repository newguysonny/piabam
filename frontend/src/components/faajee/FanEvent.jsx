// src/components/FanEvent.jsx
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const FanEvent = ({ title, events }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <Link to="/events" className="text-blue-500 hover:underline text-sm">
          More
        </Link>
      </div>

      {/* Event List */}
      <div className="divide-y">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex items-center justify-between py-3"
          >
            {/* Rank */}
            <div className="w-6 text-gray-600 font-bold">{index + 1}</div>

            {/* Thumbnail & Details */}
            <div className="flex items-center flex-1">
              <img
                src={event.image}
                alt={event.title}
                className="w-14 h-20 rounded-md object-cover mr-3"
              />
              <div>
                <Link
                  to={`/events/${event.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {event.title}
                </Link>
                <div className="flex items-center space-x-2 text-sm">
                  {renderStars(event.rating)}
                  <span>{event.rating}</span>
                </div>
                <div className="text-gray-500 text-sm">
                  {event.fanInfo}, {event.crews} crews
                </div>
                <div className="text-gray-500 text-sm">
                  {event.country}
                </div>
                <div className="text-gray-500 text-sm">
                  {event.supporters.toLocaleString()} supporters
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanEvent;
