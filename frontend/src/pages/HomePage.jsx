import { useEffect, useState } from 'react';
import ReviewsCarousel from '../components/lem/ReviewsCarousel';
import ReviewCarousel1 from '../components/lem/ReviewCarousel1';
import ProjectsSlider from '../components/projects/ProjectsSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/lem/ReviewCard';

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


// mockReviews
const sampleReviews = [
  {
    id: 1,
    imageUrl: "https://source.unsplash.com/featured/?restaurant,dinner",
    rating: 4.2,
    title: "Sunset Grill & Vibes",
    reviewer: "foodiejoan",
    tags: ["Outdoor", "Live Music", "Buffet"],
    location: "Lagos, NG",
    date: "Aug 2025",
  },
  {
    id: 2,
    imageUrl: "https://source.unsplash.com/featured/?party,event",
    rating: 3.9,
    title: "Neon Night Bash",
    reviewer: "partycrasher",
    tags: ["Open Bar", "Rooftop", "DJ"],
    location: "Abuja, NG",
    date: "Aug 2025",
  },
  {
    id: 3,
    imageUrl: "https://source.unsplash.com/featured/?cafe,brunch",
    rating: 4.8,
    title: "Morning Glory Café",
    reviewer: "brunchlover",
    tags: ["Cozy", "Brunch", "Vegan Options"],
    location: "Ibadan, NG",
    date: "July 2025",
  },
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
           
    <h2 className="text-2xl font-bold mb-6">🍽️ Latest Reviews</h2>
<div className="flex flex-wrap gap-6">
  {sampleReviews.map((review) => (
    <ReviewCard key={review.id} {...review} />
  ))}
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
