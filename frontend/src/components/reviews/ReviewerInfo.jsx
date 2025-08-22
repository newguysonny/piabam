import { Camera, Users, MessageSquare } from "lucide-react";

export default function ReviewerInfo({ user }) {

  return (
    <div className="flex items-start space-x-3">
      {/* Avatar */}
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        {/* Name + Badge */}
        <div className="flex items-center space-x-2">
          <span className="font-bold">{user.name}</span>
          {user.badge && (
            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
              {user.badge}
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center space-x-4 text-gray-500 text-xs mt-1">
          <span className="flex items-center space-x-1">
            <MessageSquare size={14} /> <span>{user.reviewsCount}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users size={14} /> <span>{user.friendsCount}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Camera size={14} /> <span>{user.photosCount}</span>
          </span>
        </div>

        
      </div>
    </div>
  );
}
