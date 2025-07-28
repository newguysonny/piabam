import React from 'react';

const CrewPreview = () => {
  const totalParticipants = 30;
  const joinedParticipants = 10;
  const remaining = totalParticipants - joinedParticipants;
  const progressPercent = (joinedParticipants / totalParticipants) * 100;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Header */}
      <div className="relative">
        <img
          src="https://unsplash.com/photos/a-table-topped-with-lots-of-plates-of-food-hatqfX3b9Vo"
          alt="Meal Crew"
          className="w-full h-48 object-cover"
        />
        {/* Goal Tag */}
        <div className="absolute top-3 right-3 bg-yellow-300 text-sm font-medium px-3 py-1 rounded-full shadow">
          {remaining} of {totalParticipants} participants left
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold">Chananan Birthday Party</h2>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1 text-green-600 font-semibold">₦2500</span>
              <span className="text-blue-500">✔️</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="my-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {joinedParticipants} joined / {totalParticipants} total
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <h3 className="font-semibold mb-1">Hi let’s get to know each other!</h3>
          <p className="text-gray-700 text-sm">
            We are a group of 30 people ordering meals every day — fun-filled and built on genuine
            connection. Join us for daily good food and great vibes.
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          📍 11 km away
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around items-center border-t pt-4">
          <button className="bg-green-500 text-white rounded-full px-5 py-2 text-sm font-medium">
            ✅ Join Crew
          </button>
          <button className="text-red-500 text-2xl hover:scale-110 transition">❤️</button>
          <button className="text-yellow-500 text-2xl hover:scale-110 transition">👋</button>
        </div>
      </div>
    </div>
  );
};

export default CrewPreview;
