import React from "react";

const reviews = [
  {
    imageUrl: "/img/review1.jpg",
    userAvatar: "/img/avatar1.jpg",
    userName: "Audrey L.",
    reviewText: "Craving a delicious Mediterranean spot in the heart of the Richmond..."
  },
  {
    imageUrl: "/img/review2.jpg",
    userAvatar: "/img/avatar2.jpg",
    userName: "Hannah F.",
    reviewText: "Just what this neighborhood was missing and BYOB - We tried takeout..."
  },
  // ...more
];

export default function ReviewCard() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Reviews With Photos</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.map((review, idx) => (
          <div key={idx}>
            {/* Image with overlay */}
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src={review.imageUrl}
                alt={review.userName}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute top-2 left-2 flex items-center space-x-2">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-white font-medium drop-shadow">
                  {review.userName}
                </span>
              </div>
            </div>

            {/* Review text */}
            <p className="text-sm mt-2 line-clamp-2">{review.reviewText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
