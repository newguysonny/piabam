import React from "react";

const crew = props.crew || {
  name: "Nneka & Friends Meal Crew",
  description: "Healthy food made from local farmers",
  price: 1500,
  joined: 20,
  capacity: 30,
  meals: ["Jollof Rice", "Salad", "Moi Moi"],
  schedule: {
    breakfast: "7:00 – 8:30am",
    lunch: "12:00 – 1:30pm",
    dinner: "6:00 – 7:30pm"
  },
  reviews: [
    { user: "tomiwa22", text: "🔥🔥🔥 Food was so fresh", rating: 5 }
  ]
};


export default function CrewPreview({ crew }) { return ( <div className="w-full max-w-[500px] h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-4 space-y-4"> {/* Thumbnail + Stats */} <div className="flex items-center gap-4"> <img
src={crew.avatar}
alt={crew.name}
className="w-16 h-16 rounded-full border-2 border-yellow-500"
/> <div className="text-xs text-gray-600 space-y-1"> <div>👥 {crew.participants} participants</div> <div>🌐 {crew.followers} followers</div> <div>🍽️ {crew.mealsSold} meals sold</div> <div>⭐ {crew.rating}</div> </div> </div>

{/* Location + Time Left */}
  <div className="bg-gray-100 p-3 rounded-xl">
    <div className="text-sm text-gray-500">📍 {crew.location}</div>
    <div className="text-lg font-semibold text-red-600">⏳ {crew.timeLeft}</div>
  </div>

  {/* Crew Name + Description */}
  <div>
    <h2 className="text-xl font-bold text-gray-900">{crew.name}</h2>
    <p className="text-sm text-gray-600 mt-1">{crew.description}</p>
  </div>

  {/* Price + Attendance */}
  <div className="bg-gray-50 p-3 rounded-xl flex items-center justify-between">
    <div className="text-2xl font-bold text-green-600">₦{crew.price}</div>
    <div className="text-right">
      <div className="text-lg font-semibold">{crew.attendance.joined}/{crew.attendance.total}</div>
      <div className="text-xs text-gray-500">members joined</div>
    </div>
  </div>

  {/* Actions */}
  <div className="flex gap-2">
    <button className="flex-1 bg-green-600 text-white py-2 rounded-xl font-medium hover:bg-green-700 transition">Join Crew</button>
    <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition">Save</button>
  </div>

  {/* Meal Menu */}
  <div className="bg-gray-100 p-3 rounded-xl">
    <h3 className="text-sm font-semibold mb-2 text-gray-700">🍽️ Meal Menu</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      {crew.menu.map((item, i) => (
        <li key={i} className="flex justify-between">
          <span>{item.name}</span>
          <span>x{item.quantity}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Schedule */}
  <div className="bg-gray-100 p-3 rounded-xl">
    <h3 className="text-sm font-semibold mb-2 text-gray-700">🕒 Schedule</h3>
    <ul className="text-sm text-gray-600 space-y-1">
      {Object.entries(crew.schedule).map(([meal, time], i) => (
        <li key={i}>{meal}: {time}</li>
      ))}
    </ul>
  </div>

  {/* Reviews */}
  <div className="bg-gray-100 p-3 rounded-xl">
    <h3 className="text-sm font-semibold mb-2 text-gray-700">🗨️ Recent Reviews</h3>
    <div className="space-y-2">
      {crew.reviews.slice(0, 3).map((review, i) => (
        <div key={i} className="text-sm text-gray-700">
          <span className="font-semibold text-gray-800">{review.user}:</span> {review.comment}
        </div>
      ))}
    </div>
    <button className="text-xs text-blue-600 mt-2">View all reviews</button>
  </div>
</div>

); }

