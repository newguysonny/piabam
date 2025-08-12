import React from "react";


export default function ReviewCard({ reviews }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.slice(0, 8).map((review, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg shadow-sm p-2 bg-white">
            
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src={review.imageUrl} alt={review.userName} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex items-center space-x-2">
                <img src={review.userAvatar} alt={review.userName} className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="text-white font-medium drop-shadow">{review.userName}</span>
              </div>
            </div>
            <p className="text-sm mt-2 font-semibold text-purple-500">{review.crewName}</p>
            
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
