// BackItFooter.jsx
import { Bell, Share2 } from "lucide-react";

export default function BackItFooter({ endDate }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
      {/* End date */}
      <p className="text-center text-gray-600 text-sm pt-3">
        Ends on {endDate}
      </p>

      {/* Actions */}
      <div className="flex justify-center gap-6 mt-2 text-gray-700 text-sm">
        <button className="flex items-center gap-1 hover:text-gray-900 transition">
          <Bell size={16} /> Follow Project
        </button>
        <button className="flex items-center gap-1 hover:text-gray-900 transition">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* Back It button */}
      <div className="px-4 py-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition">
          Back It
        </button>
      </div>
    </div>
  );
}
