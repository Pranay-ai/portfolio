"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const phrases = [
      "Backend-focused full-stack engineer",
      "Scaling distributed systems",
      "Turning complexity into simplicity",
    ];

    // Create timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    phrases.forEach((phrase) => {
      tl.to(textRef.current, {
        duration: 2,
        text: phrase,
        ease: "none",
      })
        .to({}, { duration: 1 }) // pause
        .to(textRef.current, {
          duration: 1.5,
          text: "",
          ease: "none",
        });
    });

    // ✅ Clean up timeline when component unmounts
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-[--porcelain] px-6">
      <div className="text-center max-w-5xl">
        {/* Headline with typing effect */}
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight">
          <span ref={textRef}></span>
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
            className="inline-block bg-[--onyx] text-black font-extrabold py-3 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:bg-[--soft-gold] hover:text-[--onyx]"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
}
