import ReviewerCard from "../../components/reviews/ReviewCard";

const mockReviews = [
  {
    id: 1,
    user: {
      name: "Jami G.",
      avatarUrl: "/avatars/jami.jpg",
      badge: "Elite 25",
      reviewsCount: 106,
      friendsCount: 243,
      photosCount: 1255
    },
    rating: 5,
    date: "2024-05-10",
    text: "A new hidden gem! Great service and food is amazing, flavorful! You can taste the quality ingredients. Turkish coffee and chicken shawarma...",
    photos: [
      "/images/food1.jpg",
      "/images/food2.jpg",
      "/images/food3.jpg",
      "/images/food4.jpg"
    ],
    reactions: {
      helpful: 2,
      thanks: 2,
      love: 2,
      ohNo: 0
    }
  }
  // Add more reviews...
];

export default function ReviewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Customer Reviews</h1>
      <div className="space-y-8">
        {mockReviews.map((review) => (
          <ReviewerCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
