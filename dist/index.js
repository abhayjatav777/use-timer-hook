import moment from "moment";
import { useState, useEffect } from "react";
var useTimer = function (_a) {
  var initialTime = _a.initialTime,
    onTimerEnd = _a.onTimerEnd,
    formate = _a.formate;
  var _b = useState(initialTime),
    time = _b[0],
    setTime = _b[1];
  var _c = useState(true),
    isRunning = _c[0],
    setIsRunning = _c[1];
  useEffect(
    function () {
      var timerId;
      if (isRunning) {
        timerId = setInterval(function () {
          setTime(function (prevTime) {
            if (prevTime === 0) {
              clearInterval(timerId);
              onTimerEnd();
              setIsRunning(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }
      return function () {
        clearInterval(timerId);
      };
    },
    [isRunning, onTimerEnd]
  );
  var startTimer = function () {
    setIsRunning(true);
  };
  var pauseTimer = function () {
    setIsRunning(false);
  };
  var resetTimer = function () {
    setIsRunning(true);
    setTime(initialTime);
  };
  var formatTime = function (timeInSeconds) {
    var days = Math.floor(timeInSeconds / (3600 * 24));
    var hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
    var minutes = Math.floor((timeInSeconds % 3600) / 60);
    var seconds = timeInSeconds % 60;
    var duration = moment.duration(timeInSeconds, "seconds");
    var formattedTime = moment
      .utc(duration.asMilliseconds())
      .format(formate !== null && formate !== void 0 ? formate : "HH:mm:ss");
    return {
      formattedTime: formattedTime,
      customTime: {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      },
    };
  };
  return {
    time: formatTime(time).formattedTime,
    isRunning: isRunning,
    startTimer: startTimer,
    pauseTimer: pauseTimer,
    customTime: formatTime(time).customTime,
    resetTimer: resetTimer,
  };
};
export default useTimer;
