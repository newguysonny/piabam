

import { useEffect, useState } from 'react';
import ProjectsSlider from '../components/projects/ProjectsSlider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data fetch (replace with your API call)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockProjects = [
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
          // Add 4-5 more projects...
        ];
        
        setFeaturedProjects(mockProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Community Movements
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover and support projects that matter to you
            </p>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-12 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Projects
            </h2>
            <a 
              href="/discover" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-[350px] animate-pulse"></div>
              ))}
            </div>
          ) : (
            <ProjectsSlider projects={featuredProjects} />
          )}
        </section>

        {/* Additional Sections... */}
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;




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
