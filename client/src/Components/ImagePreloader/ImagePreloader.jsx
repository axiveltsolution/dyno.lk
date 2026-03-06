import { useState, useEffect, useCallback } from "react";
import { PRELOAD_IMAGES } from "../../Utils/preloadImages";
import "./ImagePreloader.css";

// Import logo correctly to ensure it works in production builds
import logo from "../../assets/Logo/Dyno.lk-logo.png"; 

export default function ImagePreloader({ children, minLoadTime = 1500 }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const preloadImages = useCallback(() => {
    let loadedImages = 0;
    const totalImages = PRELOAD_IMAGES.length;
    const startTime = Date.now();

    if (totalImages === 0) {
      setTimeout(() => setIsLoading(false), minLoadTime);
      return;
    }

    const updateProgress = () => {
      loadedImages++;
      const progress = Math.round((loadedImages / totalImages) * 100);
      setLoadingProgress(progress);

      if (loadedImages === totalImages) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        setTimeout(() => setIsLoading(false), remainingTime);
      }
    };

    PRELOAD_IMAGES.forEach((src) => {
      const imageSrc = typeof src === "string" ? src : src.default || src;
      if (!imageSrc) {
        updateProgress();
        return;
      }

      const img = new Image();
      img.src = imageSrc;
      img.onload = updateProgress;
      img.onerror = updateProgress;
      if (img.complete) updateProgress();
    });
  }, [minLoadTime]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return (
    <>
      <div className={isLoading ? "preloader-blur-content" : "content-ready"}>
        {children}
      </div>
      
      {isLoading && (
        <div className="image-preloader-overlay">
          <div className="image-preloader-content">
            <div className="preloader-logo">
              <img src={logo} alt="Dyno.lk" />
            </div>
            
            <div className="preloader-bar-container">
              <div 
                className="preloader-bar-fill" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            <div className="preloader-text">
              <span className="preloader-percentage">{loadingProgress}%</span>
              <span className="preloader-status">
                {loadingProgress < 30 
                  ? "Loading assets..." 
                  : loadingProgress < 70 
                    ? "Preparing content..." 
                    : "Almost ready..."}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}