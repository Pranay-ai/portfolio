"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + experienceData.length * window.innerHeight, // scroll length = numCards * 100vh
          scrub: true,
          pin: true,
        },
      });

      // fade in/out each card one after the other
      cardsRef.current.forEach((card, i) => {
        tl.to(card, { opacity: 1, duration: 1 }, i);

        if (i !== cardsRef.current.length - 1) {
          tl.to(card, { opacity: 0, duration: 1 }, i + 0.8);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-[--porcelain] relative"
    >
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="relative w-full max-w-3xl px-6">
          {experienceData.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0"
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
      </div>
    </section>
  );
}
