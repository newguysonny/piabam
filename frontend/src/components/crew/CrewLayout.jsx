import { useState } from "react";
import CartPreview from "../lem/CartPreview";
import CrewHeader from "./CrewHeader";
import HostProfile from "./HostProfile";
import MealCard from "./MealCard";
import MenuModal from "./MenuModal";

export default function CrewLayout({ transaction }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);

  const closeMenu = () => setShowMenu(false);
  const closeMealModal = () => setShowMealModal(false);

  return (
    <div className="flex flex-col w-full bg-neutral-900 text-gray-200 rounded-xl shadow-lg overflow-hidden">
      <CrewHeader onMenuClick={() => setShowMenu(true)} />
      <HostProfile />
      <MealCard onViewMeal={() => setShowMealModal(true)} />
      
      {/* Bottom Status */}
      <div className="bg-neutral-950 text-white flex items-center justify-between px-4 h-[40px] border-t border-neutral-800">
        <div className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          READY FOR PICKUP
        </div>
      </div>

      {/* Modals */}
      {showMenu && (
      <MenuModal
          onClose={closeMenu}
          onSearch={() => console.log("Search clicked")}
          onReport={() => console.log("Report clicked")}
          onRelease={() => console.log("Release clicked")}
          onExit={closeMenu}
        />
      )}

      {showMealModal && (
        <div
          onClick={closeMealModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-800 text-white p-6 rounded-lg w-80"
          >
            <h3 className="text-lg font-semibold mb-4">Meal Details</h3>
            <CartPreview isEditable={false} />
            <p className="text-sm">
              You can order extra or find more items using the store button on the bottom page..
            </p>
            <button
              onClick={closeMealModal}
              className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
