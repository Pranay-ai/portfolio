"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const phrases = [
    "Full-Stack Software Engineer",
    "Engineering AI Voice Agents",
    "Building Microservices at Scale",
    "Designing Event-Driven Systems",
  ];

  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + current[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, 50);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[--cream] via-[--ivory] to-[--sage-pale] px-6 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[--sage-muted] rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[--blush-light] rounded-full blur-3xl opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[--lavender-light] rounded-full blur-3xl opacity-15" />

      <div className="text-center max-w-5xl relative z-10">
        {/* Elegant pre-title */}
        <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe] mb-8 animate-fade-in-up">
          Welcome to my portfolio
        </p>

        {/* Headline with typing effect */}
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl tracking-wide leading-tight text-[--charcoal] animate-fade-in-up delay-100" style={{ animationFillMode: 'backwards' }}>
          {text}
          <span className="ml-2 inline-block w-[3px] h-10 md:h-14 bg-[--sage] animate-blink"></span>
        </h1>

        {/* Elegant divider */}
        <div className="mt-10 flex items-center justify-center gap-4 animate-fade-in-up delay-200" style={{ animationFillMode: 'backwards' }}>
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[--sage]" />
          <span className="w-2 h-2 rounded-full bg-[--sage]" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[--sage]" />
        </div>

        {/* Subheadline */}
        <p className="mt-8 text-xl md:text-2xl text-[--graphite] font-light leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
          Specializing in AI Voice Agent platforms, real-time telephony integrations (Pipecat, Daily.co, Twilio), LLM orchestration, and Graph RAG pipelines
        </p>

        {/* Call-to-Action */}
        <div className="mt-14 animate-fade-in-up delay-400" style={{ animationFillMode: 'backwards' }}>
          <Link
            href="/#experience"
            className="btn-luxury inline-block"
          >
            Explore My Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-500" style={{ animationFillMode: 'backwards' }}>
        <span className="font-sans-elegant text-[10px] tracking-[0.2em] uppercase text-[--taupe]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[--sage] to-transparent" />
      </div>
    </section>
  );
}
