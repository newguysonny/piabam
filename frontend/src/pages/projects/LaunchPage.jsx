import Countdown from "../../components/projects/Countdown";
import HeaderSection from "../../components/projects/HeaderSection";
import CallToAction from "../../components/projects/CallToAction";
import BackItFooter from "../../components/projects/BackItFooter";
import ProjectProgress from "../../components/projects/ProjectProgress";
import ProjectStats from "../../components/projects/ProjectStats";

const projects = [
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


function LaunchPage() {
  return (
    <>
      <div className="mt-6 flex items-center justify-center bg-white">
        <Countdown targetDate="2025-08-22T12:00:00" />
      </div>

      <div className="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-xl pb-32">
        {/* 👆 add bottom padding (same height as footer) */}
        <HeaderSection />
        <CallToAction />
        <ProjectProgress
                  current={project.current}
                  goal={project.goal}
                  isLaunch={isLaunch}
                />
        
        <ProjectStats
                  supporters={project.supporters}
                  daysLeft={project.daysLeft}
                  isLaunch={true}
                />
      </div>

      <BackItFooter endDate="Aug 15, 2025 at 9:59pm WAST." />
    </>
  );
}
export default LaunchPage;

/*
import Countdown from "../../components/projects/Countdown";
import HeaderSection from "../../components/projects/HeaderSection";
import CallToAction from "../../components/projects/CallToAction";
import BackItFooter from "../../components/projects/BackItFooter";

function LaunchPage() {
  return (
    <>
    <div className=" mt-6 flex items-center justify-center bg-white">
      <Countdown targetDate="2025-08-20T12:00:00" />
      
    </div>
     <div className="max-w-md mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-xl">
      <HeaderSection />
      <CallToAction />
       <div className=" mt-4 flex items-center justify-center bg-white">
      <BackItFooter endDate="Aug 15, 2025 at 9:59pm WAST." />
       </div>
    </div>
   </>
  );
}

export default LaunchPage;

*/
