"use client";
import { useRef, useEffect, useState } from "react";

const experienceData = [
  {
    company: "BuzzWisely",
    role: "Software Engineer",
    date: "Oct 2025 – Present",
    desc: "Building an AI-powered voice agent platform serving as an intelligent phone receptionist for businesses. Architected real-time conversational AI pipelines using Pipecat framework with Daily.co telephony, achieving sub-500ms response latencies. Implemented warm transfer functionality with LLM-powered context briefing and integrated Telnyx/Twilio with WebRTC streaming.",
    highlight: "Sub-500ms Latency",
  },
  {
    company: "Innerjoy Ed",
    role: "Full Stack Developer",
    date: "May 2024 – Sep 2025",
    desc: "Engineered secure authentication and content management APIs serving 1,000+ DAU with NestJS, PostgreSQL, MongoDB. Leveraged LangChain agent modules with OpenAI APIs for adaptive learning assistants, improving content relevance by 45%. Optimized performance with Redis caching, reducing API latency by 35%.",
    highlight: "45% Relevance Boost",
  },
  {
    company: "One Community Inc.",
    role: "Software Engineer (Volunteer)",
    date: "Apr 2024 – Jul 2024",
    desc: "Architected RESTful microservices with Express.js for a volunteer platform supporting 100+ users with RBAC (Role-Based Access Control). Implemented CI/CD pipelines and achieved 90% code coverage through comprehensive Jest unit and integration testing.",
    highlight: "90% Code Coverage",
  },
  {
    company: "CSU, Fullerton",
    role: "Teaching Associate",
    date: "Aug 2023 – Jun 2024",
    desc: "Instructed Data Structures and Algorithms in C++ to 70+ students, covering Big-O complexity, graph traversals, dynamic programming, and system design fundamentals. Redesigned curriculum, improving scores from 74% to 85%.",
    highlight: "74% → 85% Scores",
  },
  {
    company: "Tata Consultancy Services",
    role: "Software Engineer Intern",
    date: "Mar 2022 – Jun 2022",
    desc: "Developed Python ETL automation tool for parsing AUTOSAR XML schemas, implementing parallel processing pipelines that reduced processing time from 2 hours to 10 minutes — a 92% efficiency gain.",
    highlight: "92% Time Reduction",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;
    let isIntersecting = false;
    let observer;

    const handleScroll = () => {
      if (!isIntersecting || !el) {
        ticking = false;
        return;
      }

      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= 0) {
        const scrolled = Math.abs(rect.top);
        const maxScroll = Math.max(1, sectionHeight - viewportHeight);
        const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
        const rawIndex = progress * (experienceData.length - 1);
        const idx = Math.round(rawIndex);

        if (idx !== currentIndex && idx >= 0 && idx < experienceData.length) {
          setCurrentIndex(idx);
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting;
            if (isIntersecting) {
              window.addEventListener("scroll", onScroll, { passive: true });
              setTimeout(handleScroll, 10);
            } else {
              window.removeEventListener("scroll", onScroll);
            }
          });
        },
        {
          threshold: [0, 0.1],
          rootMargin: "50px 0px",
        }
      );
      observer.observe(el);
    } catch (e) {
      console.error("IntersectionObserver not supported:", e);
      window.addEventListener("scroll", onScroll, { passive: true });
      setTimeout(handleScroll, 100);
    }

    setTimeout(handleScroll, 100);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [currentIndex]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-gradient-to-b from-[--sage-pale] via-[--cream] to-[--ivory] relative"
      style={{
        minHeight: "625vh",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-center"
        style={{
          height: "100vh",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Section title */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2">
          <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe]">
            Professional Journey
          </p>
        </div>

        <div className="relative w-full max-w-4xl px-6 h-full">
          {experienceData.map((exp, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ${
                i === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
                willChange: "opacity, transform",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Date badge */}
              <span className="font-sans-elegant text-sm tracking-[0.2em] uppercase text-[--taupe] bg-[--sage-pale]/50 px-5 py-2 rounded-full border border-[--sage-muted]/30">
                {exp.date}
              </span>

              {/* Company name */}
              <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl mt-6 text-[--charcoal] tracking-wide">
                {exp.company}
              </h2>

              {/* Role */}
              <h3 className="font-sans-elegant text-base md:text-lg tracking-[0.15em] uppercase text-[--sage] mt-4">
                {exp.role}
              </h3>

              {/* Elegant divider */}
              <div className="mt-8 flex items-center gap-3">
                <span className="w-12 h-px bg-[--sage-muted]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
                <span className="w-12 h-px bg-[--sage-muted]" />
              </div>

              {/* Description */}
              <p className="mt-8 text-xl md:text-2xl text-[--graphite] leading-relaxed max-w-2xl font-light">
                {exp.desc}
              </p>

              {/* Highlight badge */}
              <div className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-[--sage-light]/30 to-[--champagne-light]/30 px-6 py-3 border border-[--sage]/20">
                <span className="w-2 h-2 rounded-full bg-[--gold-accent]" />
                <span className="font-sans-elegant text-sm tracking-[0.1em] uppercase text-[--charcoal]">
                  {exp.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4">
            {experienceData.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-px transition-all duration-500 ${
                    i === currentIndex
                      ? "bg-[--sage] scale-x-100"
                      : "bg-[--sage-muted] scale-x-50"
                  }`}
                />
                <span
                  className={`font-sans-elegant text-[10px] tracking-widest transition-colors duration-300 ${
                    i === currentIndex ? "text-[--charcoal]" : "text-[--taupe]"
                  }`}
                >
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
