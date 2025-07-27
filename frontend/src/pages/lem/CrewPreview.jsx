import React from "react";

export default function CrewPreview() {
  return (
    <div className="max-w-[500px] h-[500px] overflow-y-auto bg-white text-black p-4 shadow rounded-lg">
      <h1 className="text-xl font-bold mb-2">Nneka & Friends Meal Crew</h1>
      <p className="text-gray-600 mb-4">Healthy food made from local farmers</p>

      <div className="text-2xl font-bold text-green-600 mb-2">₦1,500</div>
      <div className="text-sm text-gray-700 mb-4">20 joined / 30 max</div>

      <div className="bg-gray-100 p-2 rounded mb-2">
        <h2 className="font-semibold mb-1">Meals</h2>
        <p>Jollof Rice, Moi Moi</p>
      </div>

      <div className="bg-gray-100 p-2 rounded mb-2">
        <h2 className="font-semibold mb-1">Schedule</h2>
        <p>Breakfast: 7–8:30am</p>
        <p>Lunch: 11:30–1:30pm</p>
      </div>

      <div className="bg-gray-100 p-2 rounded">
        <h2 className="font-semibold mb-1">Reviews</h2>
        <p>“Great food!” – 5 stars</p>
      </div>
    </div>
  );
}
