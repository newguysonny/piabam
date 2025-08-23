import { useNavigate } from 'react-router-dom';
import CoverImage from './CoverImage';

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <CoverImage src="https://placehold.co/800x400" />
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-normal text-lg">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-500">★ {item.rating}</span>
            <span className="text-gray-500 text-sm">
              • {item.orders} orders
            </span>
          </div>
          {/*
          <div className="flex gap-2 mt-2">
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
              {item.category}
            </span>
            
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {item.distance}
            </span> 
          </div> */}
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-sm">{item.deliveryTime}</span>
          <div className="mt-1">{item.priceRange}</div>
        </div>
      </div>
      <button
        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg font-medium"
        onClick={() => navigate(`/store/${item.id}`)}
      >
        View Menu
      </button>
    </div>
  );
};

export default RestaurantCard;
