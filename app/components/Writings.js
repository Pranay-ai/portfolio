"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Writings({ writings }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="writings" className="bg-gradient-to-b from-[--ivory] via-[--cream] to-[--blush-light]/30 py-28 md:py-40 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[--blush]/30 to-transparent" />

      <div className="mx-auto xl:max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe] mb-4">
            Insights & Knowledge
          </p>
          <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[--charcoal] tracking-wide">
            Technical Writing
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[--blush]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
            <span className="w-12 h-px bg-[--blush]" />
          </div>
          <p className="mt-8 text-xl md:text-2xl text-[--graphite] font-light max-w-xl mx-auto">
            Deep dives into distributed systems, database internals, performance optimization, and scalability patterns
          </p>
        </div>

        <div className="relative">
          {/* Carousel controls */}
          <button
            aria-label="Previous"
            onClick={() => scrollByAmount("prev")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center border border-[--blush] bg-[--cream]/90 backdrop-blur-sm hover:bg-[--blush-light] hover:border-[--sage] transition-all duration-300 group"
          >
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-4 w-4 text-[--graphite] group-hover:text-[--charcoal] transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByAmount("next")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center border border-[--blush] bg-[--cream]/90 backdrop-blur-sm hover:bg-[--blush-light] hover:border-[--sage] transition-all duration-300 group"
          >
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-4 w-4 text-[--graphite] group-hover:text-[--charcoal] transition-colors"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Horizontal scroll area */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {writings.map(({ id, title, Description }, index) => (
              <Link
                key={id}
                href={`/writings/${id}`}
                className="block group snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[35%]"
              >
                <div className="p-8 md:p-10 h-full bg-[--cream] border border-[--sage-muted]/30 transition-all duration-500 group-hover:border-[--sage]/40 group-hover:shadow-lg group-hover:shadow-[--sage]/5 relative overflow-hidden">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[--sage-light] via-[--blush] to-[--lavender-light] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Article number */}
                  <span className="font-sans-elegant text-xs tracking-[0.2em] text-[--taupe] mb-4 block">
                    Article {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="font-headline text-2xl md:text-3xl text-[--charcoal] tracking-wide leading-snug">
                    {title}
                  </h3>

                  <div className="mt-3 w-6 h-px bg-[--sage-muted] group-hover:w-12 group-hover:bg-[--sage] transition-all duration-500" />

                  <p className="mt-4 text-[--graphite] leading-relaxed font-light text-base">
                    {Description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--taupe] group-hover:text-[--charcoal] transition-colors duration-300">
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
