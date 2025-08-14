import { useEffect, useState } from 'react';
import ReviewsCarousel from '../components/lem/ReviewsCarousel';
import ReviewCarousel1 from '../components/lem/ReviewCarousel1';
import ProjectsSlider from '../components/projects/ProjectsSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/lem/ReviewCard';
import WeeklyCard from "../components/projects/WeeklyCard";
import WeeklyProjects from "../components/projects/WeeklyProjects";

/*
    const featuredProjects = [
  // Your featured projects data
  {
    id: 1,
    title: "Wizkid Album Listening Party",
    host: "Atin's Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
       {
    id: 2,
    title: "Wizkid Album Listening Party",
    host: "'s Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
       {
    id: 3,
    title: "Wizkid Album Listening Party",
    host: "tin's Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
       {
    id: 4,
    title: "Wizkid Album Listening Party",
    host: "As Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
       {
    id: 5,
    title: "Wizkid Album Listening Party",
    host: "Ati's Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
        {
    id: 6,
    title: "New Album Recording Session",
    creator: "Indie Band Collective",
    category: "Music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Album+Recording",
    current: 12500,
    goal: 20000,
    backers: 342,
    daysLeft: 14
  },
  // Add 5-6 more
   
]; */
  const shows = [
   {
   image: "https://via.placeholder.com/180x240/FF5733/FFFFFF?text=Weak+Hero",
   title: "Weak Hero Class 2",
   category: "Korean Drama",
   },
   {
   image: "https://via.placeholder.com/180x240/33FF57/FFFFFF?text=Pump+Up",
   title: "Pump Up the Healthy L...",
   category: "Korean Drama",
   },
   {
   image: "https://via.placeholder.com/180x240/3357FF/FFFFFF?text=When+Life",
   title: "When Life Gives You Ta...",
   category: "Korean Drama",
   },
   {
   image: "https://via.placeholder.com/180x240/F333FF/FFFFFF?text=Spring",
   title: "Spring of Youth",
   category: "Korean Drama",
   },
   ];


const featuredProjects = [
    {
      id: 1,
      type: 'fanparty',
      title: "Wizkid Album Listening Party",
      host: "Atin's Fan Club",
      description: "Exclusive virtual listening session for Wizkid's new album",
      image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
      location: "Lagos, Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
      goal: 5000,
      current: 3614,
      daysLeft: 2,
      supporters: ["user1", "user2", "user3"],
      createdAt: "2023-10-15"
    },
    {
      id: 2,
      type: 'mealparty',
      title: "Nigerian Street Food Tour",
      host: "Lagos Foodies",
      description: "Monthly pop-up featuring the best street food vendors",
      image: "https://placehold.co/600x400/F97316/FFFFFF?text=Food+Tour",
      location: "Lagos, Nigeria",
      coordinates: { lat: 6.5244, lng: 3.3792 },
      goal: 2000,
      current: 1248,
      daysLeft: 7,
      supporters: ["user4", "user5"],
      createdAt: "2023-10-10"
    },
    {
      id: 3,
      type: 'lemcrew',
      title: "Afrobeat Dance Challenge",
      host: "Dance With Efe",
      description: "Learn the hottest Afrobeat moves in our virtual classes",
      image: "https://placehold.co/600x400/10B981/FFFFFF?text=Dance+Party",
      location: "Abuja, Nigeria",
      coordinates: { lat: 9.0579, lng: 7.4951 },
      goal: 3000,
      current: 2456,
      daysLeft: 14,
      supporters: ["user6", "user7", "user8"],
      createdAt: "2023-10-05"
    }
  ];



const reviews = [
  {
    id: 1,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Restaurant+1",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=AL",
    userName: "Audrey L.",
    crewName: "Mr P Party",
    reviewText: "Craving a delicious Mediterranean spot in the heart of the Richmond...",
    rating: 4.8,
    date: "3 days ago"
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Cafe+2",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=HF",
    userName: "Hannah F.",
    crewName: "Tomiwa and Friends",
    reviewText: "Just what this neighborhood was missing and BYOB - We tried takeout...",
    rating: 4.5,
    date: "1 week ago"
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Bakery+3",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=JS",
    userName: "Jacob S.",
    crewName: "Brunch Crew",
    reviewText: "The croissants are to die for! Perfectly flaky and buttery...",
    rating: 5.0,
    date: "2 days ago"
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Bar+4",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=MT",
    userName: "Maya T.",
    crewName: "Cocktail Explorers",
    reviewText: "Creative cocktails with house-made ingredients. The bartender's choice was perfect!",
    rating: 4.7,
    date: "5 days ago"
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Pizza+5",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=DR",
    userName: "David R.",
    crewName: "Pizza Lovers",
    reviewText: "Authentic Neapolitan pizza with a perfect charred crust. Worth the wait!",
    rating: 4.9,
    date: "1 day ago"
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Sushi+6",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=YK",
    userName: "Yuki K.",
    crewName: "Sushi Connoisseurs",
    reviewText: "Fresh fish and expertly prepared nigiri. The omakase was a delightful experience.",
    rating: 4.6,
    date: "3 weeks ago"
  },
  {
    id: 7,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Burger+7",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=TP",
    userName: "Taylor P.",
    crewName: "Burger Club",
    reviewText: "Juicy burgers with creative topping combinations. The truffle fries are a must!",
    rating: 4.3,
    date: "2 weeks ago"
  },
  {
    id: 8,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Thai+8",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=NW",
    userName: "Nate W.",
    crewName: "Spice Seekers",
    reviewText: "Authentic Thai flavors with adjustable spice levels. The green curry is fantastic!",
    rating: 4.4,
    date: "4 days ago"
  },
  {
    id: 9,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Steak+9",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=EC",
    userName: "Emma C.",
    crewName: "Meat Masters",
    reviewText: "Perfectly cooked ribeye with excellent wine pairings suggested by the sommelier.",
    rating: 4.8,
    date: "1 week ago"
  },
  {
    id: 10,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Brunch+10",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=LB",
    userName: "Liam B.",
    crewName: "Weekend Brunchers",
    reviewText: "Bottomless mimosas and fluffy pancakes - our new Sunday tradition!",
    rating: 4.2,
    date: "5 days ago"
  },
  {
    id: 11,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Ice+Cream+11",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=SJ",
    userName: "Sophia J.",
    crewName: "Sweet Tooth Gang",
    reviewText: "Unique flavors like lavender honey and matcha white chocolate. Always a line but worth it!",
    rating: 4.7,
    date: "2 days ago"
  },
  {
    id: 12,
    imageUrl: "https://placehold.co/400x225/EEE/31343C?text=Ramen+12",
    userAvatar: "https://placehold.co/100/EEE/31343C?text=AK",
    userName: "Aiden K.",
    crewName: "Noodle Enthusiasts",
    reviewText: "Rich tonkotsu broth with perfectly cooked noodles. The chashu melts in your mouth.",
    rating: 4.9,
    date: "3 days ago"
  }
];


   export default function Homepage() {
  const normalizeProject = (project) => ({
    id: project.id,
    title: project.title,
    host: project.host || project.creator,
    type: project.type || project.category,
    image: project.image,
    current: project.current,
    goal: project.goal,
    location: project.location,
    supporters: project.backers || project.supporters, //Math.floor(project.current / 20),
    daysLeft: project.daysLeft || 7
  });

  const standardizedProjects = featuredProjects.map(normalizeProject);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Projects Section*/}
        <h3 className="text-2xl font-bold mb-6">Featured Projects</h3>
        <div className="relative">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="mx-auto" style={{ maxWidth: 'calc(3 * 320px + 2 * 16px + 80px)' }}>
            <ProjectsSlider projects={standardizedProjects} />
          </div>
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
       <Link
  to="/funding"
  className="mt-3 text-gray-600 underline inline-flex items-center hover:text-gray-800 transition"
>
  View all projects <span className="ml-1">→</span>
  </Link>
      </div>

        {/* Review Section*/}

        <div className="m-4">
 <div className="flex items-center justify-between mb-4 mt-4">
  <h3 className="text-xl font-medium">Latest Reviews</h3>
  <Link
    to="/review"
    className="text-gray-600 underline inline-flex items-center hover:text-gray-800 transition group"
  >
    more 
    <span className="ml-1 transform transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  </Link>
</div>
<ReviewCard reviews={reviews} />
</div>
        {/* Weekly projects ending and launching*/}
       <div className="max-w-4xl mx-auto p-4">
   <WeeklyCard title="New on Lem" items={shows} />
   </div>

        {/* Weekly projects ending and launching*/}
        <div className="max-w-6xl mx-auto p-4">
   <WeeklyProjects title="This Week's Projects" projects={featuredProjects} />
   </div>
        
      <Footer />
    </>
  );
}

