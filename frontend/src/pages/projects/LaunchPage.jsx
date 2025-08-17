import Countdown from "../../components/projects/Countdown";
import HeaderSection from "../../components/projects/HeaderSection";

function LaunchPage() {
  return (
    <>
    <div className=" mt-6 flex items-center justify-center bg-white">
      <Countdown targetDate="2025-08-20T12:00:00" />
      
    </div>
    <HeaderSection />
   </>
  );
}

export default LaunchPage;
