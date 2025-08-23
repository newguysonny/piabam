import ReviewerInfo from "./ReviewerInfo";
import ReviewRating from "./ReviewRating";
import ReviewPhotos from "./ReviewPhotos";
import ReviewActions from "./ReviewActions";
import CrewLinkCard from "./CrewLinkCard";
import PhotoModal from './PhotoModal';
export default function ReviewCard({ review, crewId=1 }) {

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  
  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhotoIndex(null);
  };
  
  return (
    <div className=" m-1">
      <div className=" mb-2">
      <CrewLinkCard crewId={crewId} />
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
        <ReviewPhotos photos={review.photos} 
          onPhotoClick={handlePhotoClick}
          className="bg-blue-100 w-full"/>
      )}

      {/* Actions */}
      <ReviewActions reactions={review.reactions} className="bg-red-100 w-full"/>

      {isPhotoModalOpen && (
        <PhotoModal
          photos={review.photos}
          initialIndex={selectedPhotoIndex}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
