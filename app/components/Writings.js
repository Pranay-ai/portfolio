"use client";

import Link from "next/link";
import { useRef } from "react";

// An array of the CSS variables for the pastel background colors
const cardColors = [
  "var(--mist-blue)",
  "var(--dusty-rose)",
  "var(--sage-mist)",
  "var(--porcelain)",
];

export default function Writings({ writings }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="writings" className="bg-[--porcelain] py-24 md:py-32">
      <div className="mx-auto xl:max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl">
            Technical Writing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Exploring concepts in distributed systems, performance, and data
            structures.
          </p>
        </div>

        <div className="relative">
          {/* Carousel controls */}
          <button
            aria-label="Previous"
            onClick={() => scrollByAmount("prev")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white transition shadow-sm"
          >
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByAmount("next")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur hover:bg-white transition shadow-sm"
          >
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Horizontal scroll area */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {writings.map(({ id, title, Description }, index) => (
              <Link
                key={id}
                href={`/writings/${id}`}
                className="block group snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[55%] lg:w-[40%]"
              >
                <div
                  className="p-8 rounded-lg h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] border border-transparent"
                  style={{
                    backgroundColor: cardColors[index % cardColors.length],
                  }}
                >
                  <h3 className="font-headline text-2xl text-[--onyx]">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-700">{Description}</p>
                  <div className="mt-4 font-medium text-[--onyx] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Article{" "}
                    <span className="group-hover:translate-x-1 transition-transform inline-block">
                      -&gt;
                    </span>
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
