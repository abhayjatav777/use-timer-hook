import React from "react";
import useTimer from "../lib/useTimer";

const Timer = () => {
  const {
    isRunning,
    customTime: { days, hours, minutes, seconds },
  } = useTimer({
    initialTime: 60,
    onTimerEnd: () => {
      console.log("timer Finished");
    },
  });

  return (
    <div className="container">
      <h1 id="headline">
        {isRunning ? "Countdown to my birthday" : "Happy Birthday"}
      </h1>
      {isRunning ? (
        <div id="countdown">
          <ul>
            <li>
              <span id="days">{days}</span>days
            </li>
            <li>
              <span id="hours">{hours}</span>Hours
            </li>
            <li>
              <span id="minutes">{minutes}</span>Minutes
            </li>
            <li>
              <span id="seconds">{seconds}</span>Seconds
            </li>
          </ul>
        </div>
      ) : (
        <div id="content" className="emoji">
          <span>🥳</span>
          <span>🎉</span>
          <span>🎂</span>
        </div>
      )}
    </div>
  );
};

export default Timer;
