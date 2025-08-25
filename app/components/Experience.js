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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    let isScrolling = false;
    let scrollTimer;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within the section
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const progress = Math.abs(rect.top) / (sectionHeight - viewportHeight);
        const clampedProgress = Math.max(0, Math.min(1, progress));

        setScrollProgress(clampedProgress);

        // Calculate which card should be active
        const cardIndex = Math.min(
          Math.floor(clampedProgress * experienceData.length),
          experienceData.length - 1
        );

        setCurrentIndex(cardIndex);
      }

      // Debounced scroll end detection
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Intersection Observer for section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[--porcelain] relative min-h-[400vh]" // Make it tall for scrolling
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div className="relative w-full max-w-3xl px-6">
          {experienceData.map((exp, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ${
                i === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-lg font-medium text-gray-500">{exp.date}</p>
              <h2 className="font-headline text-3xl md:text-5xl mt-2">
                {exp.company}
              </h2>
              <h3 className="text-xl md:text-2xl text-gray-700 mt-4">
                {exp.role}
              </h3>
              <p className="mt-6 text-lg text-gray-600">{exp.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
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
