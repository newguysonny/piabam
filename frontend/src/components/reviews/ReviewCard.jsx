import ReviewerInfo from "./ReviewerInfo";
import ReviewRating from "./ReviewRating";
import ReviewPhotos from "./ReviewPhotos";
import ReviewActions from "./ReviewActions";

export default function ReviewCard({ review }) {
  return (
    <div className=" m-1 ">
      {/* Reviewer details */}
      <ReviewerInfo user={review.user}  date={review.date} />

      {/* Rating */}
      <ReviewRating rating={review.rating} date={review.date} />

      {/* Text */}
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
        {review.text} <span className="text-blue-600 cursor-pointer">read more</span>
      </p>

      {/* Photos */}
      {review.photos?.length > 0 && (
        <ReviewPhotos photos={review.photos} className="!bg-blue-100"/>
      )}

      {/* Actions */}
      <ReviewActions reactions={review.reactions} className="!bg-red-100"/>
    </div>
  );
}
