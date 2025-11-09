// Typewriter.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 *  phrases: string[] - text lines to type
 *  typingSpeed: number - ms per character (default 60)
 *  deletingSpeed: number - ms per character when deleting (default 35)
 *  pauseBeforeDelete: number - ms to pause after finishing a phrase (default 1500)
 *  loop: boolean - loop phrases when finished (default true)
 */
export default function Typewriter({
  phrases = ["Hello world"],
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseBeforeDelete = 1500,
  loop = true,
}) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0); // phrase index
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;

    const currentPhrase = phrases[index % phrases.length];

    let timeoutId;

    if (!isDeleting) {
      // typing
      if (displayed.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        // finished typing current phrase -> pause then delete
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
      }
    } else {
      // deleting
      if (displayed.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayed(currentPhrase.slice(0, displayed.length - 1));
        }, deletingSpeed);
      } else {
        // finished deleting -> next phrase
        setIsDeleting(false);
        setIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timeoutId);
    // important dependencies:
  }, [
    displayed,
    isDeleting,
    index,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
  ]);

  // optional: pause when user prefers reduced motion
  // (You can extend to respect prefers-reduced-motion if desired)

  return (
    <span className="typewriter" aria-live="polite">
      <span className="typewriter-text">{displayed}</span>
      <span className="typewriter-caret" ref={cursorRef} aria-hidden="true" />
    </span>
  );
}
