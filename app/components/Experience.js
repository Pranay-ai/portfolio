// This component remains largely the same as the JS logic was self-contained.
// In a real app, you might fetch this data from your CMS.
"use client";
import { useState, useEffect, useRef } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollableHeight));
      const index = Math.floor(progress * experienceData.length);
      setCurrentIndex(Math.min(index, experienceData.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentExperience = experienceData[currentIndex];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[--porcelain] relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          {currentExperience && (
            <>
              <p className="text-lg font-medium text-gray-500">
                {currentExperience.date}
              </p>
              <h2 className="font-headline text-3xl md:text-5xl mt-2">
                {currentExperience.company}
              </h2>
              <h3 className="text-xl md:text-2xl text-gray-700 mt-4">
                {currentExperience.role}
              </h3>
              <p className="mt-6 text-lg text-gray-600">
                {currentExperience.desc}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
