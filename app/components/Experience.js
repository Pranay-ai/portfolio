"use client";
import { useRef, useEffect, useState } from "react";

const experienceData = [
  {
    company: "Innerjoy Ed",
    role: "Full Stack Developer",
    date: "May 2024 – Present",
    desc: "Architected secure NestJS APIs and built an AI-powered curriculum tool with LangChain, optimizing API performance by 50%.",
  },
  {
    company: "One Community Inc.",
    role: "Volunteer Software Engineer",
    date: "Apr 2024 – Jul 2024",
    desc: "Developed RESTful APIs for a global volunteer network, improving server responsiveness by 40%.",
  },
  {
    company: "CSU, Fullerton",
    role: "Teaching Associate",
    date: "Aug 2023 – Jun 2024",
    desc: "Taught Data Structures in C++ to over 70 students, redesigning the curriculum to raise average exam scores from 74% to 85%.",
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if browser is Safari
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      userAgent.includes("safari/") && !userAgent.includes("chrome/");
    setIsSafari(isSafariBrowser);
  }, []);

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

      // More reliable check for when section is in scroll area
      if (rect.top <= 0 && rect.bottom >= 0) {
        // Calculate progress with better Safari handling
        const scrolled = Math.abs(rect.top);
        const maxScroll = Math.max(1, sectionHeight - viewportHeight);
        const progress = Math.min(1, Math.max(0, scrolled / maxScroll));

        // Calculate index with more precise handling
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

    // Safari-compatible IntersectionObserver initialization
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersecting = entry.isIntersecting;

            if (isIntersecting) {
              // Add scroll listener when in view
              window.addEventListener("scroll", onScroll, { passive: true });
              // Initial calculation when entering view
              setTimeout(handleScroll, 10);
            } else {
              // Remove scroll listener when out of view
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
      // Fallback for browsers without IntersectionObserver
      window.addEventListener("scroll", onScroll, { passive: true });
      setTimeout(handleScroll, 100);
    }

    // Initial check in case already in view
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
      className="bg-[--porcelain] relative"
      style={{
        minHeight: "400vh",
        // Ensure consistent behavior across browsers
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-center"
        style={{
          height: "100vh",
          // Safari-specific fixes
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          // Add perspective for Safari hardware acceleration
          WebkitPerspective: "1000",
          perspective: "1000",
          // Prevent flickering in Safari
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-full max-w-3xl px-6 h-full">
          {experienceData.map((exp, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ${
                i === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                // Ensure smooth transitions in Safari
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
                // Add will-change for better performance
                willChange: "opacity",
                // Prevent flickering
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
              }}
            >
              <p className="text-lg font-medium text-gray-500">{exp.date}</p>
              <h2 className="font-headline text-3xl md:text-5xl mt-2">
                {exp.company}
              </h2>
              <h3 className="text-xl md:text-2xl text-gray-700 mt-4">
                {exp.role}
              </h3>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">{exp.desc}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {experienceData.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
