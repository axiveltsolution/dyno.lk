import { useState, useEffect, useCallback } from "react";
import { PRELOAD_IMAGES } from "../../Utils/preloadImages";
import "./ImagePreloader.css";

/**
 * ImagePreloader - Preloads all images and shows loading progress
 * @param {React.ReactNode} children - Child components to render after loading
 * @param {number} minLoadTime - Minimum time to show loading (ms) - prevents flash
 */
export default function ImagePreloader({ children, minLoadTime = 1500 }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const preloadImages = useCallback(() => {
    let loadedImages = 0;
    const totalImages = PRELOAD_IMAGES.length;
    const startTime = Date.now();

    const updateProgress = () => {
      loadedImages++;
      const progress = Math.round((loadedImages / totalImages) * 100);
      setLoadedCount(loadedImages);
      setLoadingProgress(progress);

      // Check if all images are loaded and minimum time has passed
      if (loadedImages === totalImages) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsedTime);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    // Preload each image
    PRELOAD_IMAGES.forEach((src) => {
      // Handle both string URLs and imported image modules
      const imageSrc = typeof src === "string" ? src : src.default || src;
      
      if (!imageSrc) {
        updateProgress();
        return;
      }

      const img = new Image();
      img.src = imageSrc;
      
      img.onload = () => {
        updateProgress();
      };
      
      img.onerror = () => {
        // Even if image fails to load, count it as loaded to continue
        updateProgress();
      };

      // Also handle case where image is already cached
      if (img.complete) {
        updateProgress();
      }
    });

    // If there are no images, still show loading for minimum time
    if (totalImages === 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, minLoadTime);
    }
  }, [minLoadTime]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  return (
    <>
      {/* Main Content - always rendered but overlay shown during loading */}
      <div className={isLoading ? "preloader-blur-content" : ""}>
        {children}
      </div>
      
      {/* Loading Screen */}
      {isLoading && (
        <div className="image-preloader-overlay">
          <div className="image-preloader-content">
            {/* Logo */}
            <div className="preloader-logo">
              <img 
                src="/src/assets/Logo/Dyno.lk-logo.png" 
                alt="Dyno.lk" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Loading Bar Container */}
            <div className="preloader-bar-container">
              <div 
                className="preloader-bar-fill" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            
            {/* Loading Text */}
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

/**
 * Hook for lazy image loading with fade-in effect
 * @returns {object} - { handleImageLoad, getImageClass }
 */
export function useLazyImage() {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = useCallback((imageKey) => {
    setLoadedImages(prev => ({ ...prev, [imageKey]: true }));
  }, []);

  const getImageClass = useCallback((imageKey) => {
    return loadedImages[imageKey] ? "image-loaded" : "image-loading";
  }, [loadedImages]);

  return { handleImageLoad, getImageClass, loadedImages };
}

/**
 * LazyImage - Image component with lazy loading and fade-in
 */
export function LazyImage({ 
  src, 
  alt, 
  className = "", 
  imageKey,
  onLoad 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onLoad?.();
  };

  return (
    <div className={`lazy-image-wrapper ${className}`}>
      {!isLoaded && !error && (
        <div className="lazy-image-placeholder" />
      )}
      <img
        src={src}
        alt={alt}
        className={`lazy-image ${isLoaded ? "loaded" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      {error && (
        <div className="lazy-image-error">
          Failed to load image
        </div>
      )}
    </div>
  );
}
