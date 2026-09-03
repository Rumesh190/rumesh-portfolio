"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["Work.", "Scale.", "Ship.", "Perform.", "Grow."];
const LOOP = [...WORDS, WORDS[0]];

export default function RotatingWords() {
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [wordHeight, setWordHeight] = useState(0);
  const firstWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const word = firstWordRef.current;
    if (!word) return;

    const measure = () => setWordHeight(word.getBoundingClientRect().height);
    const observer = new ResizeObserver(measure);
    observer.observe(word);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => current + 1);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || index !== WORDS.length) return;
    const timer = window.setTimeout(() => {
      setInstant(true);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstant(false));
      });
    }, 940);
    return () => window.clearTimeout(timer);
  }, [index, reducedMotion]);

  const activeIndex = reducedMotion ? 0 : index;

  return (
    <span className="rotating-words" aria-hidden="true">
      <span
        className={`rotating-words__track${instant ? " rotating-words__track--instant" : ""}`}
        style={{ transform: `translate3d(0, -${activeIndex * wordHeight}px, 0)` }}
      >
        {LOOP.map((word, wordIndex) => (
          <span
            className="rotating-words__word"
            key={`${word}-${wordIndex}`}
            ref={wordIndex === 0 ? firstWordRef : undefined}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
