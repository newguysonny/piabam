

import { useEffect, useState } from 'react';
import ProjectsSlider from '../components/projects/ProjectsSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



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




export default function Homepage() {
     return (
  <section className="container mx-auto px-4 py-12">
    <h2 className="text-2xl font-bold mb-6">Trending Music Projects</h2>
    <ProjectsSlider projects={featuredProjects} />
    
    <div className="mt-8 text-center">
      <a href="/discover" className="inline-block px-6 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition">
        View All Projects →
      </a>
    </div>
  </section>
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
