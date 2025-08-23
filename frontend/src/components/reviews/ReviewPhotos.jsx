export default function ReviewPhotos({ photos, onPhotoClick }) {
  return (
    <div className="flex space-x-1 mt-3">
      {photos.slice(0, 4).map((photo, idx) => (
        <img
          key={idx}
          src={photo}
          alt={`Review photo ${idx + 1}`}
          className="w-20 h-20 object-cover rounded-md cursor-pointer"
          onClick={() => onPhotoClick(idx)} //passed from the review card component for photo view 
        />
      ))}
    </div>
  );
}
