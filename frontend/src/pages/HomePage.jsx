

import React from 'react'; // Add this if using React 17 or earlier
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProjectsSlider from '../components/projects/ProjectsSlider';

const featuredProjects = [
  {
    id: 1, // Changed to unique IDs
    title: "Wizkid Album Listening Party",
    host: "Atin's Fan Club",
    type: "music",
    image: "https://placehold.co/600x400/7E22CE/FFFFFF?text=Wizkid+Party",
    location: "Lagos, Nigeria",
    goal: 5000,
    current: 3614,
  },
  {
    id: 2, // Unique
    title: "Burna Boy Virtual Concert",
    host: "Afrobeat Lovers",
    type: "music",
    image: "https://placehold.co/600x400/10B981/FFFFFF?text=Burna+Boy",
    location: "Abuja, Nigeria",
    goal: 10000,
    current: 7821,
  },
  {
    id: 3, // Unique
    title: "Lagos Food Festival",
    host: "Naija Foodies",
    type: "food",
    image: "https://placehold.co/600x400/F97316/FFFFFF?text=Food+Fest",
    location: "Lagos, Nigeria",
    goal: 2000,
    current: 1543,
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col"> 
      <Navbar />
      
      <main className="flex-grow"> 
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Featured Community Projects</h2>
            <ProjectsSlider projects={featuredProjects} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
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
