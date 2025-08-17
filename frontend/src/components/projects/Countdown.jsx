import { useEffect, useState } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    } else {
      timeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-gray-600 text-lg mb-4 tracking-wide">LAUNCHING IN</h2>
      <div className="flex gap-6 text-center">
        <div>
          <p className="text-2xl font-bold">{timeLeft.days}</p>
          <span className="text-gray-500 text-sm">days</span>
        </div>
        <div>
          <p className="text-2xl font-bold">{timeLeft.hours}</p>
          <span className="text-gray-500 text-sm">hours</span>
        </div>
        <div>
          <p className="text-2xl font-bold">{timeLeft.minutes}</p>
          <span className="text-gray-500 text-sm">min</span>
        </div>
        <div>
          <p className="text-xl font-bold">{timeLeft.seconds}</p>
          <span className="text-gray-500 text-sm">sec</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
