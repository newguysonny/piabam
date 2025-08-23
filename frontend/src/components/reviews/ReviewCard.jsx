import { useState } from 'react';
import ReviewerInfo from "./ReviewerInfo";
import ReviewRating from "./ReviewRating";
import ReviewPhotos from "./ReviewPhotos";
import ReviewActions from "./ReviewActions";
import CrewLinkCard from "./CrewLinkCard";
import PhotoModal from './PhotoModal';

export default function ReviewCard({ review, crewId = 1 }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // ← Add this state
  
  const handlePhotoClick = (index) => {
    setSelectedPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPhotoModalOpen(false);
    setSelectedPhotoIndex(null);
  };

  const toggleTextExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if text needs truncation (e.g., more than 150 characters)
  const needsTruncation = review.text.length > 150;
  const displayText = isExpanded 
    ? review.text 
    : needsTruncation 
      ? review.text.slice(0, 150) + '...' 
      : review.text;
  
  return (
    <div className="m-1 p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-3">
        <CrewLinkCard crewId={crewId} />
      </div>
      
      {/* Reviewer details */}
      <ReviewerInfo user={review.user} date={review.date} />

      {/* Rating */}
      <ReviewRating rating={review.rating} date={review.date} />

      {/* Text with expand/collapse */}
      <div className="mt-2">
        <p className="text-gray-700 text-sm leading-relaxed">
          {displayText}
        </p>
        {needsTruncation && (
          <button
            onClick={toggleTextExpansion}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Photos */}
      {review.photos?.length > 0 && (
        <ReviewPhotos 
          photos={review.photos} 
          onPhotoClick={handlePhotoClick}
        />
      )}

      {/* Actions */}
      <ReviewActions reactions={review.reactions} />

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

/*
import { useState } from 'react';
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
      
      {/* Reviewer details /}
      <ReviewerInfo user={review.user}  date={review.date} />

      {/* Rating /}
      <ReviewRating rating={review.rating} date={review.date} />

      {/* Text /}
      <p className="mt-2 text-gray-700 text-sm leading-relaxed">
        {review.text} <span className="text-blue-600 cursor-pointer">read more</span>
      </p>

      {/* Photos /}
      {review.photos?.length > 0 && (
        <ReviewPhotos photos={review.photos} 
          onPhotoClick={handlePhotoClick}
          className="bg-blue-100 w-full"/>
      )}

      {/* Actions /}
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
*/
