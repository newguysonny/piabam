import Countdown from "../../components/projects/Countdown";

function LaunchPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Countdown targetDate="2025-08-20T12:00:00" />
    </div>
  );
}

export default LaunchPage;
