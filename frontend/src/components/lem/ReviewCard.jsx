import React from "react";

export default function ReviewCard({
  imageUrl,
  rating,
  title,
  reviewer,
  tags = [],
  location,
  date,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-50">
      {/* Image */}
      <div className="relative h-44">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />
        {/* Rating */}
        <div className="absolute bottom-2 left-2 bg-white rounded-full px-3 py-1 shadow text-sm font-semibold flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>

        {/* Reviewer */}
        <p className="text-sm text-gray-500">by @{reviewer}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Location & Date */}
        <p className="text-xs text-gray-400 mt-2">
          {location} — {date}
        </p>
      </div>
    </div>
  );
}
