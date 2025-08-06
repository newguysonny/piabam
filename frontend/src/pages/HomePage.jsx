import { useEffect, useState } from 'react';
import ReviewsCarousel from '../components/lem/ReviewsCarousel';
import ReviewCarousel1 from '../components/lem/ReviewCarousel1';
import ProjectsSlider from '../components/projects/ProjectsSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ReviewCard from "../components/lem/ReviewCard";
‎import { reviews } from "./data/mockReviews";

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
   
];

       const sampleReviews = [
  {
    id: 1,
    restaurantName: "La Taquería",
    rating: 4,
    cuisine: "Mexican",
    distance: "0.3mi",
    neighborhood: "Downtown",
    comment: "The al pastor tacos are life-changing. Perfectly spiced and juicy!",
    author: "Maria G.",
    date: "May 2024",
    showFullAddress: false
  },
  {
    id: 2,
    restaurantName: "Pasta Bar",
    rating: 5,
    cuisine: "Italian",
    distance: "1.2mi",
    neighborhood: "West End",
    comment: "Homemade rigatoni with truffle cream sauce was divine.",
    author: "James L.",
    date: "June 2024",
    showFullAddress: true
  },
    {
    id: 3,
    restaurantName: "La Taquería",
    rating: 4,
    cuisine: "Mexican",
    distance: "0.3mi",
    neighborhood: "Downtown",
    comment: "The al pastor tacos are life-changing. Perfectly spiced and juicy!",
    author: "Maria G.",
    date: "May 2024",
    showFullAddress: false
  },
  {
    id: 4,
    restaurantName: "Pasta Bar",
    rating: 5,
    cuisine: "Italian",
    distance: "1.2mi",
    neighborhood: "West End",
    comment: "Homemade rigatoni with truffle cream sauce was divine.",
    author: "James L.",
    date: "June 2024",
    showFullAddress: true
  },
  // Add 2-10 more reviews
];

const sampleReviews1 = [
  {
    id: 1,
    restaurantName: "La Taquería",
    rating: 4,
    cuisine: "Mexican",
    distance: "0.3mi",
    neighborhood: "Downtown",
    comment: "The al pastor tacos are life-changing. Perfectly spiced and juicy!",
    author: "Maria G.",
    date: "May 2024"
  },
  {
    id: 2,
    restaurantName: "Pasta Bar",
    rating: 5,
    cuisine: "Italian",
    distance: "1.2mi",
    neighborhood: "West End",
    comment: "Homemade rigatoni with truffle cream sauce was divine. Wine pairing suggestions were perfect.",
    author: "James L.",
    date: "June 2024"
  },
  {
    id: 3,
    restaurantName: "Sushi Kai",
    rating: 4,
    cuisine: "Japanese",
    distance: "0.7mi",
    neighborhood: "Harbor District",
    comment: "Omakase experience worth every penny. The toro melted in my mouth like butter.",
    author: "Aisha T.",
    date: "April 2024"
  },
  {
    id: 4,
    restaurantName: "The Green Fork",
    rating: 3,
    cuisine: "Vegetarian",
    distance: "0.5mi",
    neighborhood: "Arts District",
    comment: "Creative plant-based dishes, though the mushroom burger was underseasoned. Great kale salad!",
    author: "David K.",
    date: "July 2024"
  },
  {
    id: 5,
    restaurantName: "Boulangerie Maison",
    rating: 5,
    cuisine: "French",
    distance: "1.8mi",
    neighborhood: "Riverside",
    comment: "Croissants that rival Paris! Their pain au chocolat is my Saturday morning ritual.",
    author: "Sophie M.",
    date: "March 2024"
  },
  {
    id: 6,
    restaurantName: "Spice Route",
    rating: 4,
    cuisine: "Indian",
    distance: "2.1mi",
    neighborhood: "Eastside",
    comment: "Best lamb vindaloo in the city. Naan bread is pillowy perfection - order the garlic version!",
    author: "Raj P.",
    date: "May 2024"
  },
  {
    id: 7,
    restaurantName: "Burger Joint",
    rating: 3,
    cuisine: "American",
    distance: "0.9mi",
    neighborhood: "Midtown",
    comment: "Solid smash burgers, but fries were soggy. Great craft beer selection though.",
    author: "Chris B.",
    date: "June 2024"
  },
  {
    id: 8,
    restaurantName: "Pho Saigon",
    rating: 5,
    cuisine: "Vietnamese",
    distance: "1.5mi",
    neighborhood: "Little Asia",
    comment: "Broth so flavorful it cured my cold overnight. Always order extra bean sprouts!",
    author: "Linh N.",
    date: "January 2024"
  }
];




        export default function Homepage() {
  const normalizeProject = (project) => ({
    id: project.id,
    title: project.title,
    creator: project.host || project.creator,
    category: project.type || project.category,
    image: project.image,
    current: project.current,
    goal: project.goal,
    backers: project.backers || Math.floor(project.current / 20),
    daysLeft: project.daysLeft || 7
  });

  const standardizedProjects = featuredProjects.map(normalizeProject);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
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
           
         
        
      <Footer />
    </>
  );
}



/*
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProjectsSlider from '../components/projects/ProjectsSlider';


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
   
];



export default function HomePage() {
  return (
    <>
     <Navbar/>
      <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Community Projects</h2>
        <div style={{ minHeight: '500px' }}>
          <ProjectsSlider projects={featuredProjects} />
         </div> 
      </div>
    </section>
      {/* Page content /}
      <Footer />
    </>
  );
}
*/
