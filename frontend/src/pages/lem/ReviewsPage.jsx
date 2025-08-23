import ReviewerCard from "../../components/reviews/ReviewCard";
import Navbar from '../../components/Navbar';

const mockReviews = [
  {
    id: 1,
    user: {
      name: "Jami G.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=JG",
      badge: "Elite 25",
      reviewsCount: 106,
      friendsCount: 243,
      photosCount: 1255
    },
    rating: 5,
    date: "2024-05-10",
    text: "A new hidden gem! Great service and food is amazing, flavorful! You can taste the quality ingredients. Turkish coffee and chicken shawarma are must-tries.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Food+1",
      "https://placehold.co/600x400/EEE/31343C?text=Food+2",
      "https://placehold.co/600x400/EEE/31343C?text=Food+3",
      "https://placehold.co/600x400/EEE/31343C?text=Food+4"
    ],
    reactions: {
      helpful: 2,
      thanks: 2,
      love: 2,
      ohNo: 0
    }
  },
  {
    id: 2,
    user: {
      name: "Marcus T.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=MT",
      badge: "Elite 12",
      reviewsCount: 78,
      friendsCount: 189,
      photosCount: 842
    },
    rating: 4,
    date: "2024-05-08",
    text: "Solid brunch spot with creative dishes. The avocado toast with poached eggs was excellent, though the coffee could be stronger.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Brunch+1",
      "https://placehold.co/600x400/EEE/31343C?text=Brunch+2"
    ],
    reactions: {
      helpful: 5,
      thanks: 1,
      love: 3,
      ohNo: 0
    }
  },
  {
    id: 3,
    user: {
      name: "Sophia L.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=SL",
      badge: "Elite 42",
      reviewsCount: 215,
      friendsCount: 367,
      photosCount: 1980
    },
    rating: 5,
    date: "2024-05-05",
    text: "Absolutely phenomenal sushi experience. The omakase was worth every penny - fresh, inventive, and beautifully presented.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Sushi+1",
      "https://placehold.co/600x400/EEE/31343C?text=Sushi+2",
      "https://placehold.co/600x400/EEE/31343C?text=Sushi+3"
    ],
    reactions: {
      helpful: 12,
      thanks: 4,
      love: 8,
      ohNo: 0
    }
  },
  {
    id: 4,
    user: {
      name: "Ethan R.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=ER",
      badge: "Regular",
      reviewsCount: 23,
      friendsCount: 45,
      photosCount: 112
    },
    rating: 3,
    date: "2024-05-03",
    text: "Decent burgers but nothing special. The fries were the highlight - perfectly crispy and well-seasoned.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Burger+1"
    ],
    reactions: {
      helpful: 2,
      thanks: 0,
      love: 1,
      ohNo: 0
    }
  },
  {
    id: 5,
    user: {
      name: "Olivia M.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=OM",
      badge: "Elite 18",
      reviewsCount: 134,
      friendsCount: 278,
      photosCount: 967
    },
    rating: 5,
    date: "2024-05-01",
    text: "Best Italian outside of Italy! The homemade pasta was perfection and the tiramisu transported me back to Rome.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Pasta+1",
      "https://placehold.co/600x400/EEE/31343C?text=Pasta+2",
      "https://placehold.co/600x400/EEE/31343C?text=Dessert+1"
    ],
    reactions: {
      helpful: 8,
      thanks: 3,
      love: 6,
      ohNo: 0
    }
  },
  {
    id: 6,
    user: {
      name: "Daniel K.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=DK",
      badge: "Newbie",
      reviewsCount: 5,
      friendsCount: 12,
      photosCount: 18
    },
    rating: 2,
    date: "2024-04-28",
    text: "Overpriced for what you get. The steak was overcooked despite ordering medium rare, and service was slow.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Steak+1"
    ],
    reactions: {
      helpful: 1,
      thanks: 0,
      love: 0,
      ohNo: 1
    }
  },
  {
    id: 7,
    user: {
      name: "Ava S.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=AS",
      badge: "Elite 31",
      reviewsCount: 187,
      friendsCount: 324,
      photosCount: 1450
    },
    rating: 4,
    date: "2024-04-25",
    text: "Lovely rooftop bar with amazing city views. Cocktails were creative though a bit pricey. Great for a date night!",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Cocktail+1",
      "https://placehold.co/600x400/EEE/31343C?text=View+1"
    ],
    reactions: {
      helpful: 7,
      thanks: 2,
      love: 4,
      ohNo: 0
    }
  },
  {
    id: 8,
    user: {
      name: "Noah W.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=NW",
      badge: "Regular",
      reviewsCount: 42,
      friendsCount: 87,
      photosCount: 203
    },
    rating: 5,
    date: "2024-04-22",
    text: "Authentic Thai flavors that blew me away! The green curry had perfect spice level and the mango sticky rice was heavenly.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Curry+1",
      "https://placehold.co/600x400/EEE/31343C?text=Dessert+2"
    ],
    reactions: {
      helpful: 9,
      thanks: 3,
      love: 5,
      ohNo: 0
    }
  },
  {
    id: 9,
    user: {
      name: "Isabella C.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=IC",
      badge: "Elite 7",
      reviewsCount: 63,
      friendsCount: 156,
      photosCount: 478
    },
    rating: 4,
    date: "2024-04-18",
    text: "Fantastic vegan options that even meat-lovers would enjoy. The jackfruit tacos were surprisingly meaty in texture!",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Vegan+1",
      "https://placehold.co/600x400/EEE/31343C?text=Vegan+2",
      "https://placehold.co/600x400/EEE/31343C?text=Vegan+3"
    ],
    reactions: {
      helpful: 6,
      thanks: 1,
      love: 3,
      ohNo: 0
    }
  },
  {
    id: 10,
    user: {
      name: "Liam B.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=LB",
      badge: "Newbie",
      reviewsCount: 3,
      friendsCount: 8,
      photosCount: 15
    },
    rating: 1,
    date: "2024-04-15",
    text: "Terrible experience. Waited 45 minutes for cold food and the manager was rude when we complained. Never returning.",
    photos: [],
    reactions: {
      helpful: 0,
      thanks: 0,
      love: 0,
      ohNo: 3
    }
  },
  {
    id: 11,
    user: {
      name: "Mia H.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=MH",
      badge: "Elite 15",
      reviewsCount: 98,
      friendsCount: 201,
      photosCount: 732
    },
    rating: 5,
    date: "2024-04-12",
    text: "Perfect neighborhood bakery! The sourdough is crusty outside and chewy inside - just like in San Francisco. Croissants are buttery perfection.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Bread+1",
      "https://placehold.co/600x400/EEE/31343C?text=Pastry+1"
    ],
    reactions: {
      helpful: 11,
      thanks: 2,
      love: 7,
      ohNo: 0
    }
  },
  {
    id: 12,
    user: {
      name: "James P.",
      avatarUrl: "https://placehold.co/100/EEE/31343C?font=montserrat&text=JP",
      badge: "Elite 22",
      reviewsCount: 157,
      friendsCount: 289,
      photosCount: 1103
    },
    rating: 4,
    date: "2024-04-08",
    text: "Excellent ramen spot with rich broth and perfect noodle texture. Only downside is the long wait times during peak hours.",
    photos: [
      "https://placehold.co/600x400/EEE/31343C?text=Ramen+1"
    ],
    reactions: {
      helpful: 5,
      thanks: 1,
      love: 3,
      ohNo: 0
    }
  }
];

export default function ReviewsPage() {

 return (
   <>
     <Navbar />
     
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Customer Reviews</h1>
      <div className="m-3 border-b">
        {mockReviews.map((review, idx) => (
         <div key={idx} className=" border-b border border-gray-200">
          <ReviewerCard key={review.id} review={review} />
         </div>
        ))}
      </div>
    </div>
   </>
  );
}
