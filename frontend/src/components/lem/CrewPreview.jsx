import Cart from "./Cart.jsx";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";

export default function CrewPreview({ crew, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{crew.name}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>
        <img
          src={crew.avatar}
          alt={crew.name}
          className="w-full h-48 object-cover rounded-lg mt-3"
        />
        
        <p className="mt-3 text-gray-600">
          {crew.joined}/{crew.capacity} joined
        </p>

        <div>
            <h2 className="text-lg font-bold text-gray-800">{crew.name}</h2>
            <p className="text-xs text-gray-500">
              {crew.menu.length} meals • ₦{crew.subtotal}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.address}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.distance}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            {crew.subtotal}
          </div>
          <div className="text-xs text-gray-500">30% discount on checkout</div>
        </div>
      </div>
        
        {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="mt-3  text-gray-600">
          {crew.joined} joined / {crew.capacity} joined
        </div>
      </div>
      
       <Cart />
        
        {/* Actions */}
      <div className="space-y-2">
        <button className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:opacity-90">
          Join Crew
        </button>
        
      </div>
    </div>
      
    </>
  );
}
