"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const phrases = [
    "Backend-focused full-stack engineer",
    "Scaling distributed systems",
    "Turning complexity into simplicity",
  ];

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      // typing forward
      timeout = setTimeout(() => {
        setText((prev) => prev + current[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      // deleting backward
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 50);
    } else if (!isDeleting && charIndex === current.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      // move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[--porcelain] px-6">
      <div className="text-center max-w-5xl">
        {/* Headline with typing effect */}
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight">
          {text}
          <span className="ml-2 inline-block w-[2px] h-10 bg-black animate-blink"></span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg md:text-xl text-gray-600">
          High-impact solutions for real-world technical challenges.
        </p>

        {/* Call-to-Action */}
        <div className="mt-12">
          <Link
            href="/#experience"
            className="inline-block bg-[--onyx] text-black  font-extrabold py-3 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:bg-[--soft-gold] hover:text-[--onyx]"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
}
