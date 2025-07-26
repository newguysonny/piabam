import { FiChevronLeft, FiMoreVertical, FiHeart } from "react-icons/fi"; import Image from "next/image";

export default function MealCrewLayout() { return ( <div className="flex flex-col min-h-screen bg-blue-900 text-white">

{/* Header Row */}
  <div className="flex items-center justify-between px-4 h-[50px] border-b border-blue-800">
    <div className="flex items-center gap-2">
      <FiChevronLeft className="text-xl" />
      <div>
        <div className="font-bold text-sm">Lem Crew – Meal Type</div>
        <div className="text-xs text-blue-200">Nneka and Friends Meal Crew...</div>
      </div>
    </div>
    <FiMoreVertical className="text-xl" />
  </div>

  {/* Host Section */}
  <div className="flex flex-col items-center py-4">
    <div className="relative">
      <img
        src="/avatars/anna256.png"
        alt="Host Avatar"
        className="w-20 h-20 rounded-full border-4 border-blue-400 shadow-lg"
      />
      <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-white">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </div>
    <div className="mt-2 font-medium text-white">Anna256</div>
  </div>

  {/* Meal Card */}
  <div className="mx-4 mb-4 p-3 bg-blue-800 rounded-xl flex items-center justify-between">
    <div className="flex items-center gap-3">
      <img
        src="/meals/sample-meal.jpg"
        alt="Meal"
        className="w-14 h-14 rounded-md"
      />
      <button className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full border border-white">View Meal</button>
    </div>
    <div className="flex items-center gap-1">
      <FiHeart className="text-pink-400 text-lg" />
      <span className="text-sm">5.52K</span>
    </div>
  </div>

  {/* Spacer */}
  <div className="flex-1" />

  {/* Bottom Status Bar */}
  <div className="fixed bottom-0 left-0 right-0 bg-blue-950 text-white flex items-center justify-between px-4 h-[40px] border-t border-blue-800">
    <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">READY FOR PICKUP</div>
    <div className="flex items-center gap-4 text-sm text-blue-200">
      <span>👤 5.31K</span>
      <span>📈 262M</span>
    </div>
  </div>
</div>

); }

