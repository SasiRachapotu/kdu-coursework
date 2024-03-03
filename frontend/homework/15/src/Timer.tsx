import { useEffect, useRef, useState } from 'react'

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | undefined>(undefined);
  
    useEffect(() => {
      if (isActive) {
        intervalRef.current = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      } else {
        clearInterval(intervalRef.current);
      }
  
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [isActive]);
  
    const startTimer = () => {
      setIsActive(true);
    };
  
    const stopTimer = () => {
      setIsActive(false);
    };
  
    const resetTimer = () => {
      setSeconds(0);
      setIsActive(false);
    };
  
    return (
      <div>
        <h2>Timer: {seconds} seconds</h2>
        <button className='timer-btn' onClick={startTimer}>Start</button>
        <button className='timer-btn' onClick={stopTimer}>Stop</button>
        <button className='timer-btn' onClick={resetTimer}>Reset</button>
      </div>
    );
  }

export default Timer