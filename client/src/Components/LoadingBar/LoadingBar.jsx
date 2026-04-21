import { useState, useEffect } from "react";
import "./LoadingBar.css";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true); // Set to true to start immediately

  useEffect(() => {
    let interval;

    // Start the animation
    const startProgress = () => {
      let current = 0;
      
      interval = setInterval(() => {
        // 1. Calculate the new value
        const increment = Math.random() * 10;
        current += increment;

        // 2. Strict Ceiling: Math.min ensures it NEVER goes above 100
        const cappedValue = Math.min(Math.floor(current), 100);
        
        setProgress(cappedValue);

        // 3. Clear interval if we hit 100
        if (cappedValue >= 100) {
          clearInterval(interval);
          // Optional: Hide the loader after a delay once 100% is reached
          setTimeout(() => setIsActive(false), 500);
        }
      }, 100);
    };

    startProgress();

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  if (!isActive) return null;

  return (
    <div className="loader-container">
      <div className="loader-content">
        {/* Your Dyno Logo would go here */}
        <div className="logo-placeholder">DYNO</div>
        
        <div className="percentage-display">
          {progress}%
        </div>
        
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="status-text">ALMOST READY...</p>
      </div>
    </div>
  );
}