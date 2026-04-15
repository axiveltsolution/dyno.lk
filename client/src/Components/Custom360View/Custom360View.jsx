import React, { useState, useEffect, useRef } from 'react';
import './Custom360View.css';

const Custom360View = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;

    // Preload images
    const preloadImages = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.all(preloadImages)
      .then(() => setIsLoaded(true))
      .catch((err) => console.error('Failed to preload images', err));
  }, [images]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current || !images.length) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const ratio = (width - x) / width; // Invert the direction
    const speedFactor = 4; // Increase for faster rotation
    const index = Math.floor(ratio * images.length * speedFactor) % images.length;
    setCurrentIndex(Math.max(0, Math.min(images.length - 1, index)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (!isLoaded) {
    return <div className="custom-360-view loading">Loading 360 View...</div>;
  }

  return (
    <div
      ref={containerRef}
      className="custom-360-view"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <img src={images[currentIndex]} alt="360 View" className="custom-360-image" />
    </div>
  );
};

export default Custom360View;