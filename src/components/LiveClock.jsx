import { useState, useEffect } from "react";

export default function LiveClock({ timezone }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update real-time clock every 1 second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, []);

  // Format time dynamically based on the location's timezone
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    ...(timezone ? { timeZone: timezone } : {}),
  };

  const formattedTime = currentTime.toLocaleString("en-US", options);

  return (
    <div className="flex justify-between items-center text-sm text-slate-500 border-t pt-4">
      <span>Local Time</span>
      <span className="font-medium text-slate-700">{formattedTime}</span>
    </div>
  );
}
