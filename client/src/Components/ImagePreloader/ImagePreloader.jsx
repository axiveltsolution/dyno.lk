import { useState, useEffect, useMemo } from "react";
import "./ImagePreloader.css";

// Import logo correctly to ensure it works in production builds
import logo from "../../assets/Logo/Dyno.lk-logo.png"; 

const EMPTY_IMAGES = [];
const CACHE_PREFIX = "dyno-image-preloader:";

function getCachedSignature(cacheKey) {
  if (!cacheKey || typeof window === "undefined") return null;

  try {
    return window.sessionStorage.getItem(`${CACHE_PREFIX}${cacheKey}`);
  } catch (error) {
    console.warn("Unable to read the image preloader session cache.", error);
    return null;
  }
}

function cacheSignature(cacheKey, signature) {
  if (!cacheKey || typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(`${CACHE_PREFIX}${cacheKey}`, signature);
  } catch (error) {
    console.warn("Unable to save the image preloader session cache.", error);
  }
}

export default function ImagePreloader({
  children,
  images = EMPTY_IMAGES,
  cacheKey,
  minLoadTime = 2000,
}) {
  const imageSources = useMemo(
    () => [
      ...new Set(
        images
          .map((image) =>
            typeof image === "string" ? image : image?.default
          )
          .filter(Boolean)
      ),
    ],
    [images]
  );
  const imageSignature = JSON.stringify(imageSources);
  const isPageCached =
    getCachedSignature(cacheKey) === imageSignature;
  const [loadingProgress, setLoadingProgress] = useState(
    isPageCached ? 100 : 0
  );
  const [isLoading, setIsLoading] = useState(!isPageCached);

  useEffect(() => {
    let isCancelled = false;
    let loadTimeout;
    let loadedImages = 0;
    const totalImages = imageSources.length;
    const startTime = Date.now();
    const imageElements = [];

    if (getCachedSignature(cacheKey) === imageSignature) {
      setLoadingProgress(100);
      setIsLoading(false);
      return () => {
        isCancelled = true;
      };
    }

    setLoadingProgress(0);
    setIsLoading(true);

    const finishLoading = (shouldCache) => {
      if (isCancelled) return;
      if (shouldCache) cacheSignature(cacheKey, imageSignature);
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      loadTimeout = window.setTimeout(() => {
        if (!isCancelled) setIsLoading(false);
      }, remainingTime);
    };

    if (totalImages === 0) {
      setLoadingProgress(100);
      finishLoading(true);
      return () => {
        isCancelled = true;
        window.clearTimeout(loadTimeout);
      };
    }

    const completedImages = new Set();
    let allImagesLoaded = true;
    const updateProgress = (src, image) => {
      if (isCancelled || completedImages.has(src)) return;
      completedImages.add(src);
      if (!image.naturalWidth) {
        allImagesLoaded = false;
        console.error(`Failed to preload image: ${src}`);
      }

      loadedImages++;
      const progress = Math.min(Math.round((loadedImages / totalImages) * 100), 100);
      setLoadingProgress(progress);

      if (loadedImages >= totalImages) {
        finishLoading(allImagesLoaded);
      }
    };

    imageSources.forEach((src) => {
      const img = new Image();
      const complete = () => updateProgress(src, img);
      img.onload = complete;
      img.onerror = complete;
      img.src = src;
      imageElements.push(img);
      if (img.complete) window.setTimeout(complete, 0);
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(loadTimeout);
      imageElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [cacheKey, imageSignature, imageSources, minLoadTime]);

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