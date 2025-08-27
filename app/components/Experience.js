"use client";
import { useRef, useEffect, useState } from "react";

const experienceData = [
  /* …your items… */
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

      // compute progress only while section spans the viewport
      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const progress =
          Math.abs(rect.top) / Math.max(1, sectionHeight - viewportHeight);
        const clamped = Math.min(1, Math.max(0, progress));
        const idx = Math.min(
          Math.floor(clamped * experienceData.length),
          experienceData.length - 1
        );
        setCurrentIndex(idx);
      } else if (rect.top > 0) {
        setCurrentIndex(0); // before entering, show first
      } else if (rect.bottom < viewportHeight) {
        setCurrentIndex(experienceData.length - 1); // after leaving, show last
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="bg-[--porcelain] relative min-h-[400vh]"
    >
      {/* Sticky viewport panel — fallback first, then optional dvh override */}
      <div className="sticky top-0 h-screen [height:100vh] [height:100dvh] will-change-[opacity] [backface-visibility:hidden] flex flex-col items-center justify-center">
        <div className="relative w-full max-w-3xl px-6 h-full">
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
