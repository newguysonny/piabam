import React from "react";


export default function ReviewCard({ reviews }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Reviews With Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.map((review, idx) => (
          <div key={idx}>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src={review.imageUrl} alt={review.userName} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 flex items-center space-x-2">
                <img src={review.userAvatar} alt={review.userName} className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="text-white font-medium drop-shadow">{review.userName}</span>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700">{review.crewName}</h3>
            
            <p className="text-sm mt-2 line-clamp-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
