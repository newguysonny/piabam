export default function DeliveryPickupToggle({ mode, setMode }) {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 mb-4">
      {/* Delivery  */}
      <div className="flex-1 flex flex-col items-center">
        <button
          disabled
          onClick={() => setMode("delivery")}
          className={`w-full py-2 rounded-full font-medium cursor-not-allowed text-gray-400`}
        >
          Delivery
        </button>
        <span className="text-[10px] text-gray-400 -mt-1">Coming Soon</span>
      </div>

      {/* Pickup */}
      <div className="flex-1 flex flex-col items-center">
        <button
          onClick={() => setMode("pickup")}
          className={`w-full py-2 rounded-full font-medium ${
            mode === "pickup" ? "bg-white shadow" : "text-gray-500 hover:bg-gray-200"
          }`}
        >
          Pickup
        </button>
      </div>
    </div>
  );
}
