import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import Cart from "../../components/lem/Cart";

const mockCrew = {
  name: "Nneka & Friends Meal Crew",
  avatar: "/avatars/crew.png",
  cart = [
  {
    id: 1,
    name: 'Sweet Chipotle BBQ Sauce',
  /*  price: 0.73,*/
    quantity: 1,
    image: 'https://source.unsplash.com/80x80/?sauce',
    customizations: [],
  },
  {
    id: 2,
    name: 'Sweet Chipotle BBQ Crispy Chicken Wrap',
   /* price: 8.89, */
    quantity: 1,
    image: 'https://source.unsplash.com/80x80/?burrito',
    customizations: [
      'Extra Crispy Chicken Strip ($1.83)',
      'Cheese',
      'Lettuce',
      'Pico De Gallo',
      'Purple Cabbage',
      'Spicy Ranch',
      'Sweet Chipotle BBQ Sauce',
    ],
  },
],
  price: 1500,
  location: "Yaba, Lagos",
  distance: "1 mile",
  joined: 10,
  capacity: 30,
  status: "Closed",
  availableAt: "9:00AM",
};


export default function CrewPreviewCard({ crew = mockCrew }) {
  const progress = (crew.joined / crew.capacity) * 100;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-4 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={crew.avatar}
            alt={crew.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{crew.name}</h2>
            <p className="text-xs text-gray-500">
              {crew.menu.length} meals • ₦{crew.price}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.location}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FiMapPin className="inline text-gray-500" /> {crew.distance}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">
            {crew.joined}/{crew.capacity}
          </div>
          <div className="text-xs text-gray-500">joined</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="text-sm text-gray-600">
          {crew.joined} joined / {crew.capacity} total
        </div>
      </div>
      
         <div className="h-2" /> {/* Spacer for vertical gap */}
      
      {/* Status */}
      <div className="text-sm mt-3 text-gray-700 flex items-center gap-2">
        <BsClock className="text-gray-600" />
        <span
          className={
            crew.status === "Closed"
              ? "text-red-600 font-medium"
              : "text-green-600 font-medium"
          }
        >
          {crew.status}
        </span>
        {" • "}
        <span className="font-semibold text-gray-800">
          {crew.availableAt}
        </span>
      </div>

      {/* Cart (Optional) */}
      <Cart />

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full bg-black text-white py-2 rounded-xl font-semibold hover:opacity-90">
          Join Crew
        </button>
        <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-xl font-semibold hover:bg-gray-200">
          View Details
        </button>
      </div>
    </div>
  );
}




/*
import React from 'react';

const CrewPreview = () => {
  const totalParticipants = 30;
  const joinedParticipants = 10;
  const remaining = totalParticipants - joinedParticipants;
  const progressPercent = (joinedParticipants / totalParticipants) * 100;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Header /}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Meal Crew"
          className="w-full h-48 object-cover"
        />
        {/* Goal Tag /}
        <div className="absolute top-3 right-3 bg-yellow-300 text-sm font-medium px-3 py-1 rounded-full shadow">
          {remaining} of {totalParticipants} participants left
        </div>
      </div>

      {/* Card Content //}
      <div className="p-4">
        {/* Header /}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold">Chananan Birthday Party</h2>
            <div className="flex items-center text-gray-600 text-sm">
              <span className="mr-1 text-green-600 font-semibold">₦2500</span>
              <span className="text-blue-500">✔️</span>
            </div>
          </div>
        </div>

        {/* Progress Bar /}
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

        {/* Description /}
        <div className="mb-3">
          <h3 className="font-semibold mb-1">Hi let’s get to know each other!</h3>
          <p className="text-gray-700 text-sm">
            We are a group of 30 people ordering meals every day — fun-filled and built on genuine
            connection. Join us for daily good food and great vibes.
          </p>
        </div>

        {/* Location /}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          📍 11 km away
        </div>

        {/* Action Buttons /}
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


*/
