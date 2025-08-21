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
