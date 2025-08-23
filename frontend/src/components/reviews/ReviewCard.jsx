import ReviewerInfo from "./ReviewerInfo";
import ReviewRating from "./ReviewRating";
import ReviewPhotos from "./ReviewPhotos";
import ReviewActions from "./ReviewActions";
import CrewLinkCard from "./CrewLinkCard";
export default function ReviewCard({ review, crew.id=1 }) {
  return (
    <Link 
‎      to={`/map?crew=${crew.id}`} // This will open the modal on the map page
‎      className="block hover:bg-gray-200 transition-colors"
      >
    <div className=" m-1 ">
      <div className=" mb-2">
      <CrewLinkCard />
      </div >
      
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
        <ReviewPhotos photos={review.photos} className="bg-blue-100 w-full"/>
      )}

      {/* Actions */}
      <ReviewActions reactions={review.reactions} className="bg-red-100 w-full"/>
    </div>
    </Link>
  );
}
