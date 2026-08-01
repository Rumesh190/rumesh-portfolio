"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = [
  "Love",
  "Use",
  "Enjoy",
  "Remember",
  "Trust",
  "Recommend",
  "Adopt",
  "Return To",
];

// Clone the first word at the end so the loop resets invisibly.
const LOOP = [...WORDS, WORDS[0]];

// Line-height used by the parent h1 — each slot item must be the same height.
const LH = 0.82;

export default function RotatingWords() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [idx, setIdx] = useState(0);
  const [instant, setInstant] = useState(false);

  // Entrance animation — mirrors Hero's 3rd word (delay = 180 + 2 × 130 = 440 ms).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform = "translateY(115%) rotate(6deg)";
    el.style.transition = "transform 1s cubic-bezier(.2,.85,.25,1)";
    const t = setTimeout(() => {
      el.style.transform = "none";
    }, 440);
    return () => clearTimeout(t);
  }, []);

  // Advance one word every 2 s.
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => p + 1), 2000);
    return () => clearInterval(id);
  }, []);

  // Seamless loop: when we reach the clone, snap back to real index 0.
  useEffect(() => {
    if (idx !== WORDS.length) return;
    const t = setTimeout(() => {
      setInstant(true);
      setIdx(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setInstant(false))
      );
    }, 700); // after the 650 ms slide finishes
    return () => clearTimeout(t);
  }, [idx]);

  return (
    /*
     * Outer span — receives the entrance animation translateY.
     * font-size matches the existing data-word spans on lines 1 & 2.
     * color matches the existing accent span (was the ♥).
     */
    <span
      ref={wrapRef}
      data-word=""
      style={{
        display: "inline-block",
        color: "var(--accent)",
        fontSize: "clamp(42px,13vw,180px)",
      }}
    >
      {/*
       * Clip window — exactly one line tall, hides every word
       * except the current one.  verticalAlign:"bottom" aligns
       * the window flush with the baseline of the surrounding text.
       */}
      <span
        style={{
          display: "inline-block",
          overflow: "hidden",
          height: `${LH}em`,
          verticalAlign: "bottom",
        }}
      >
        {/*
         * Sliding column — translateY moves it up one slot per tick.
         * cubic-bezier(.22,1,.36,1) = requested easing.
         */}
        <span
          style={{
            display: "block",
            transform: `translateY(-${idx * LH}em)`,
            transition: instant
              ? "none"
              : "transform .65s cubic-bezier(.22,1,.36,1)",
            willChange: "transform",
          }}
        >
          {LOOP.map((word, i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: `${LH}em`,
                lineHeight: LH,
                whiteSpace: "nowrap",
              }}
            >
              {word.toUpperCase()}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
