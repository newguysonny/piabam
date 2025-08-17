export default function MenuModal({ onClose, onSearch, onReport, onExit }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black rounded-lg p-6 w-80 space-y-4"
      >
        <button onClick={onSearch} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
          Search
        </button>
        <button onClick={onRelease} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
          Release
        </button>
        <button onClick={onReport} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
          Report
        </button>
        <button
          onClick={onExit}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
