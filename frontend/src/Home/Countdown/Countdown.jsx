import { useEffect, useState } from "react";
import "./Countdown.css"

const Countdown = () => {
  const targetDate = new Date("May 24, 2027 00:00:00").getTime();

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-box">
        <span>{timeLeft.days}</span>
        <small>Days</small>
      </div>

      <div className="countdown-box">
        <span>{String(timeLeft.hours).padStart(2, "0")}</span>
        <small>Hours</small>
      </div>

      <div className="countdown-box">
        <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
        <small>Minutes</small>
      </div>

      <div className="countdown-box">
        <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
        <small>Seconds</small>
      </div>
    </div>
  );
};

export default Countdown;
