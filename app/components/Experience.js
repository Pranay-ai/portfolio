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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionHeight = el.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const progress =
          Math.abs(rect.top) / Math.max(1, sectionHeight - viewportHeight);
        const clamped = Math.min(1, Math.max(0, progress));
        const idx = Math.min(
          Math.floor(clamped * experienceData.length),
          experienceData.length - 1
        );
        setCurrentIndex(idx);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(handleScroll);
      }
    };

    // initial paint
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        if (inView)
          window.addEventListener("scroll", onScroll, { passive: true });
        else window.removeEventListener("scroll", onScroll);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="experience"
      // 👇 callback ref ensures React always sees a valid ref function
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="bg-[--porcelain] relative min-h-[400vh]"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center">
        {/* give absolute children a containing height */}
        <div className="relative w-full max-w-3xl px-6 h-full will-change-transform">
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
