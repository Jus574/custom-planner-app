import React, { useState, useEffect } from 'react';

export default function MyCustomWidget() {
  const [stopwatchData, setStopwatchData] = useState({
    id: 0,
    name: "Timer 1",
    time: 0,
    isRunning: false,
    lap: [],
    time_started: 0,
    pause: []
  });

  useEffect(() => {
    let interval;
    if (stopwatchData.isRunning) {
      interval = setInterval(() => {
        setStopwatchData(prevData => ({
          ...prevData,
          time: new Date() - prevData.time_started - prevData.pause.reduce((a, b) => a + b, 0)
        }));
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchData.isRunning]);

  const handleStart = () => {
    if (!stopwatchData.isRunning) {
      const currentTime = new Date();
      setStopwatchData(prevData => ({
        ...prevData,
        isRunning: true,
        time_started: currentTime - prevData.time - prevData.pause.reduce((a, b) => a + b, 0)
      }));
    }
  };

  const handleStop = () => {
    if (stopwatchData.isRunning) {
      const currentTime = new Date();
      setStopwatchData(prevData => ({
        ...prevData,
        isRunning: false,
        pause: [...prevData.pause, currentTime - prevData.time_started - prevData.pause.reduce((a, b) => a + b, 0)]
      }));
    }
  };

  const handleReset = () => {
    setStopwatchData(prevData => ({
      ...prevData,
      time: 0,
      isRunning: false,
      lap: []
    }));
  };

  const handleLap = () => {
    setStopwatchData(prevData => ({
      ...prevData,
      lap: [...prevData.lap, prevData.time]
    }));
  };

  return (
    <div style={{ maxHeight: 300 }}>
          <div className="stopwatchName">
            <h1>Stopwatch</h1>
          </div>
          <div className="stopwatchTime">
            <p className='time-label'>
              {stopwatchData.time > 0
                ? new Date(stopwatchData.time).toISOString().slice(11, -1)
                : "00:00:00.000"}
            </p>
            <p>{stopwatchData.lap.length} laps</p>
          </div>
          <div className="stopwatchButtons">
            <button className={"control-buttons"} onClick={handleStart}>
              {stopwatchData.isRunning ? "Pause" : "Start"}
            </button>
            <button className={"control-buttons"} onClick={handleLap}>
              Lap
            </button>
            <button className={"control-buttons"} onClick={handleStop}>
              Stop
            </button>
            <button className={"control-buttons"} onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className='lap-container'>
            {stopwatchData.lap.length > 0 &&
              stopwatchData.lap.map((lap, index) => (
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "row" }}
                  key={index}
                >
                  <p>Lap {index + 1}</p>
                  <p className='lap-time-label' key={index}>
                    {new Date(lap).toISOString().slice(11, -1)}
                  </p>
                </div>
              ))}
          </div>
        </div>
  );
}