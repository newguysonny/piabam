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
      </div>
    </>
  );
}
