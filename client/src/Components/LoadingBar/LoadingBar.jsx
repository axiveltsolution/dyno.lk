import { useState, useEffect } from "react";
import "./LoadingBar.css";

/**
 * LoadingBar - A slim loading bar for page navigation
 * Shows at the top of the page during route changes
 */
export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Listen for navigation start (you can integrate with react-router)
    const handleNavigationStart = () => {
      setIsActive(true);
      setProgress(0);
      
      // Animate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 30;
        if (currentProgress >= 90) {
          clearInterval(interval);
        } else {
          setProgress(currentProgress);
        }
      }, 100);
    };

    const handleNavigationEnd = () => {
      setProgress(100);
      setTimeout(() => {
        setIsActive(false);
        setProgress(0);
      }, 300);
    };

    // You can add custom event listeners for navigation
    window.addEventListener('beforeunload', handleNavigationStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleNavigationStart);
    };
  }, []);

  if (!isActive && progress === 0) {
    return null;
  }

  return (
    <div className={`loading-bar-wrapper ${isActive ? "active" : ""}`}>
      <div 
        className="loading-bar-fill" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/**
 * PageLoader - Full page loading overlay
 * Use for heavy page loads
 */
export function PageLoader({ isLoading, message = "Loading..." }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      const timer = setTimeout(() => setFadeOut(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && !fadeOut) {
    return null;
  }

  return (
    <div className={`page-loader-overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="page-loader-content">
        <div className="page-loader-spinner" />
        <p className="page-loader-message">{message}</p>
      </div>
    </div>
  );
}

/**
 * SkeletonLoader - Content placeholder while loading
 */
export function SkeletonLoader({ type = "card", count = 1 }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="skeleton-loader">
      {skeletons.map((i) => (
        <div key={i} className={`skeleton skeleton-${type}`} />
      ))}
    </div>
  );
}
