export default function ReviewRating({ rating }) {
  return (
    <div className="flex items-center space-x-1 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < rating ? "#f43f5e" : "#e5e7eb"}
          className="w-5 h-5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.825c.969 0 1.371 1.24.588 1.81l-3.093 2.247a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.093-2.247a1 1 0 00-1.176 0l-3.093 2.247c-.784.57-1.838-.197-1.539-1.118l1.18-3.637a1 1 0 00-.364-1.118L2.98 9.064c-.783-.57-.38-1.81.588-1.81h3.826a1 1 0 00.95-.69l1.18-3.637z" />
        </svg>
      ))}
      <div className="text-gray-400 text-xs mt-0.5">{timeAgo}</div>
    </div>
  );
}
