// BackItFooter.jsx
import { Bell, Share2 } from "lucide-react";

export default function BackItFooter({ endDate }) {
  return (
    <div className="border-t bg-white px-4 py-6">
      {/* Back It button */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition">
        Back It
      </button>

      {/* End date */}
      <p className="text-center text-gray-600 text-sm mt-3">
        Ends on {endDate}
      </p>

      {/* Actions */}
      <div className="flex justify-center gap-6 mt-4 text-gray-700 text-sm">
        <button className="flex items-center gap-1 hover:text-gray-900 transition">
          <Bell size={16} /> Follow Project
        </button>
        <button className="flex items-center gap-1 hover:text-gray-900 transition">
          <Share2 size={16} /> Share
        </button>
      </div>
    </div>
  );
}
