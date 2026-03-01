import React, { useState, useRef, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";
import "./Scooter360View.css";

export default function Scooter360View({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const totalImages = images.length;
  
  // Calculate which image to show based on drag distance
  const updateImageFromDrag = useCallback((clientX) => {
    if (!isDragging) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    
    // Calculate angle from center (0 to 360)
    let angle = ((clientX - centerX) / rect.width) * 360;
    
    // Normalize angle to 0-360
    angle = ((angle % 360) + 360) % 360;
    
    // Map angle to image index
    const newIndex = Math.round((angle / 360) * (totalImages - 1)) % totalImages;
    setCurrentIndex(newIndex);
  }, [isDragging, totalImages]);

  // Handle mouse down for drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateImageFromDrag(e.clientX);
  };

  // Handle mouse move for drag - continuous update
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    updateImageFromDrag(e.clientX);
  }, [isDragging, updateImageFromDrag]);

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateImageFromDrag(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    updateImageFromDrag(e.touches[0].clientX);
  }, [isDragging, updateImageFromDrag]);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="scooter-360-container">
      <div className="scooter-360-viewer">
        <div
          ref={containerRef}
          className={`scooter-360-image-wrapper ${isDragging ? "dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`${name} - View ${currentIndex + 1}`}
            className="scooter-360-image"
            draggable={false}
          />
          
          {/* Rotation hint overlay - always visible */}
          <div className="scooter-360-hint">
            <RotateCcw size={20} />
            <span>Drag to rotate</span>
          </div>
        </div>
      </div>

      {/* 360 Badge */}
      <div className="scooter-360-badge">
        <span>360°</span>
        <span className="scooter-360-degree">VIEW</span>
      </div>
    </div>
  );
}
