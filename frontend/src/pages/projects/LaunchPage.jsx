import Countdown from "../../components/projects/Countdown";
import HeaderSection from "../../components/projects/HeaderSection";
import CallToAction from "../../components/projects/CallToAction";
import BackItFooter from "../../components/projects/BackItFooter";
import ProjectProgress from "../../components/projects/ProjectProgress";
import ProjectStats from "../../components/projects/ProjectStats";

const project = [
    
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
