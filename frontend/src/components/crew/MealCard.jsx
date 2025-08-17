import { FiHeart } from "react-icons/fi";

export default function MealCard({ onViewMeal }) {
  return (
    <div className="mx-4 mb-4 p-3 bg-neutral-800 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/restaurants/sample.jpg"
          alt="Restaurant Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex items-center gap-3">
          <img
            src="/meals/sample-meal.jpg"
            alt="Meal"
            className="w-14 h-14 rounded-md"
          />
          <button
            onClick={onViewMeal}
            className="bg-neutral-700 text-white text-xs px-3 py-1 rounded-full border border-white"
          >
            View Meal
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <FiHeart className="text-pink-400 text-lg" />
        <span className="text-sm">5.52K</span>
      </div>
    </div>
  );
}
