"use client";

import Link from "next/link";
import { useRef } from "react";

const cardStyles = [
  {
    bg: "linear-gradient(135deg, var(--sage-pale) 0%, var(--sage-muted) 100%)",
    accent: "var(--sage)",
  },
  {
    bg: "linear-gradient(135deg, var(--blush-light) 0%, var(--blush) 100%)",
    accent: "var(--dusty-rose)",
  },
  {
    bg: "linear-gradient(135deg, var(--lavender-light) 0%, var(--lavender) 100%)",
    accent: "var(--lavender)",
  },
  {
    bg: "linear-gradient(135deg, var(--champagne-light) 0%, var(--champagne) 100%)",
    accent: "var(--gold-soft)",
  },
  {
    bg: "linear-gradient(135deg, var(--ivory) 0%, var(--cream) 100%)",
    accent: "var(--sage-light)",
  },
];

export default function Projects({ projects }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="bg-[--ivory] py-28 md:py-40 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[--sage-muted] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[--sage-muted] to-transparent" />

      <div className="mx-auto xl:max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe] mb-4">
            Featured Work
          </p>
          <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[--charcoal] tracking-wide">
            Key Projects
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[--sage-muted]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
            <span className="w-12 h-px bg-[--sage-muted]" />
          </div>
          <p className="mt-8 text-xl md:text-2xl text-[--graphite] font-light max-w-xl mx-auto">
            AI Voice Agents, distributed microservices, event-driven architectures, and real-time streaming applications
          </p>
        </div>

        <div className="relative">
          {/* Carousel controls */}
          <button
            aria-label="Previous"
            onClick={() => scrollByAmount("prev")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center border border-[--sage-muted] bg-[--cream]/90 backdrop-blur-sm hover:bg-[--sage-pale] hover:border-[--sage] transition-all duration-300 group"
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
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center border border-[--sage-muted] bg-[--cream]/90 backdrop-blur-sm hover:bg-[--sage-pale] hover:border-[--sage] transition-all duration-300 group"
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
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 -mx-4 px-4 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map(({ id, title, description, tech, notion_link }, index) => {
              const style = cardStyles[index % cardStyles.length];
              const CardWrapper = notion_link ? Link : 'div';
              const cardProps = notion_link ? { href: `/projects/${id}` } : {};

              return (
                <CardWrapper
                  key={id}
                  {...cardProps}
                  className={`block group snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[55%] lg:w-[42%] ${notion_link ? 'cursor-pointer' : ''}`}
                >
                  <div
                    className="p-10 md:p-12 h-full transition-all duration-500 relative overflow-hidden border border-white/50 group-hover:border-[--sage]/30"
                    style={{ background: style.bg }}
                  >
                    {/* Corner accent */}
                    <div
                      className="absolute top-0 right-0 w-20 h-20 opacity-30"
                      style={{
                        background: `linear-gradient(135deg, transparent 50%, ${style.accent} 50%)`,
                      }}
                    />

                    {/* Project number */}
                    <span className="font-sans-elegant text-sm tracking-[0.2em] text-[--taupe] mb-6 block">
                      0{index + 1}
                    </span>

                    <h3 className="font-headline text-3xl md:text-4xl text-[--charcoal] tracking-wide leading-tight">
                      {title}
                    </h3>

                    {/* Tech stack */}
                    {tech && (
                      <p className="mt-3 font-sans-elegant text-xs tracking-[0.1em] uppercase text-[--taupe]">
                        {tech}
                      </p>
                    )}

                    <div className="mt-4 w-8 h-px bg-[--charcoal]/20 group-hover:w-16 group-hover:bg-[--sage] transition-all duration-500" />

                    <p className="mt-6 text-[--graphite] leading-relaxed font-light text-base">
                      {description}
                    </p>

                    {notion_link && (
                      <div className="mt-8 flex items-center gap-3 font-sans-elegant text-sm tracking-[0.15em] uppercase text-[--charcoal] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span>View Case Study</span>
                        <span className="w-6 h-px bg-[--charcoal] group-hover:w-10 transition-all duration-300" />
                      </div>
                    )}
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
