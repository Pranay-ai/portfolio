"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const projectsData = [
  {
    title: "Distributed Rate Limiter",
    image: "/rate-limiter.png",
    subtitle: "Enterprise-Grade Traffic Control Architecture",
    description:
      "Architected a high-performance distributed rate limiting solution using Go and Redis, achieving 99.99% uptime under heavy production loads with atomic request control.",
    details: [
      "Engineered sophisticated token bucket algorithm with Redis-backed distributed state management for seamless horizontal scaling",
      "Implemented atomic Lua scripting for race-condition-free token operations, ensuring precise rate enforcement across concurrent requests",
      "Containerized with Docker and orchestrated through NGINX for intelligent load balancing and auto-scaling capabilities",
      "Deployed advanced cleanup routines and health monitoring to maintain optimal performance with zero downtime",
    ],
    tags: ["Go", "Redis", "Docker", "NGINX", "Microservices"],
  },
  {
    title: "Distributed Cache Decorator",
    image: "/dis-chache.png",
    subtitle: "High-Performance Caching Infrastructure",
    description:
      "Developed a production-ready Python decorator library that transforms microservice performance through intelligent distributed caching with fault-tolerant mechanisms.",
    details: [
      "Created plug-and-play caching solution with zero-configuration setup, boosting application performance by over 60%",
      "Pioneered code-aware cache invalidation technology that automatically handles logic changes and deployment cycles",
      "Implemented sophisticated Redis hash-based keying with singleton client architecture for maximum fault tolerance",
      "Designed intelligent fallback mechanisms and cache warming strategies for enterprise-level reliability",
    ],
    tags: ["Python", "Redis", "Microservices", "Performance", "Architecture"],
  },
  {
    title: "Real-Time Sync Backend",
    image: "/clipsync.jpeg",
    subtitle: "Multi-Device Synchronization Platform",
    description:
      "Built a cutting-edge real-time synchronization platform enabling seamless content sharing across multiple devices with sub-second latency.",
    details: [
      "Developed lightning-fast Go backend with WebSocket architecture delivering sub-second synchronization across 6+ devices",
      "Implemented Redis Pub/Sub messaging system for instant, reliable content broadcasting with zero message loss",
      "Engineered secure JWT-based authentication with advanced OTP password recovery and session management",
      "Designed extensible cross-platform architecture supporting Windows, macOS, and mobile devices with future-ready APIs",
    ],
    tags: ["Go", "WebSockets", "Redis", "JWT", "Distributed Systems"],
  },
];

const experienceData = [
  {
    company: "Inner Joy Ed",
    image: "/innnerjoyed.jpeg",
    role: "Full-Stack Software Engineer",
    period: "May 2024 - Present",
    description:
      "Spearheaded the development of scalable educational platforms, focusing on high-performance backend systems and responsive frontend architectures.",
    details: [
      "Architected modular curriculum platform with advanced caching and optimization strategies for personalized learning pathways",
      "Engineered responsive, modular UI components using Next.js and Tailwind CSS, accelerating feature deployment by 30%",
      "Built high-performance NestJS APIs with PostgreSQL optimization, ensuring seamless performance under concurrent user loads",
      "Integrated advanced PDF generation and content editing workflows with cloud-native file storage solutions",
    ],
    tags: ["Next.js", "NestJS", "PostgreSQL", "Microservices", "Cloud"],
  },
  {
    company: "One Community Inc.",
    image: "/one community.jpeg",
    role: "Backend Systems Engineer",
    period: "May 2024 - August 2024",
    description:
      "Transformed backend architecture for a global community platform, enhancing scalability and performance through advanced system design patterns.",
    details: [
      "Architected comprehensive Django backend refactoring, dramatically improving system modularity, scalability, and maintainability",
      "Designed robust REST API ecosystem for task management, advanced reporting, and administrative operations",
      "Optimized database performance with strategic index tuning and query optimization, reducing SQL response latency by 30%",
      "Established enterprise-grade CI/CD pipeline using Pytest and GitHub Actions, boosting code coverage and reducing production bugs",
    ],
    tags: ["Django", "REST APIs", "PostgreSQL", "CI/CD", "Performance"],
  },
  {
    company: "CSU Fullerton",
    image: "/CSUF.png",
    role: "Computer Science Instructor",
    period: "August 2023 - June 2024",
    description:
      "Elevated computer science education through advanced systems programming and software engineering methodologies, mentoring the next generation of engineers.",
    details: [
      "Delivered comprehensive C++ curriculum covering advanced data structures, algorithms, and system design to 50+ students per semester",
      "Developed innovative real-world programming examples focusing on memory optimization and system-level programming",
      "Mentored students in software engineering best practices, including design patterns, clean architecture, and distributed systems concepts",
      "Achieved exceptional 15% improvement in class performance metrics with consistently high 90%+ student satisfaction ratings",
    ],
    tags: [
      "C++",
      "Systems Programming",
      "Architecture",
      "Teaching",
      "Mentorship",
    ],
  },
  {
    company: "Tata Consultancy Services",
    image: "/tcs.jpeg",
    role: "Software Engineer",
    period: "March 2022 - June 2022",
    description:
      "Delivered mission-critical automation solutions for automotive diagnostics, streamlining complex data processing workflows with enterprise-grade tooling.",
    details: [
      "Engineered sophisticated Python CLI tool for parsing complex AUTOSAR XML specifications into structured formats",
      "Achieved remarkable 40% reduction in diagnostics processing time through optimized XML handling and data transformation",
      "Delivered production-ready tooling that became the team standard for field troubleshooting and diagnostic analysis",
      "Collaborated effectively using GitLab and Agile methodologies, consistently delivering sprint objectives ahead of schedule",
    ],
    tags: [
      "Python",
      "XML Processing",
      "CLI Tools",
      "Agile",
      "Enterprise Systems",
    ],
  },
];

export default function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white font-sans min-h-screen">
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-black/40 border-b border-amber-500/20 sticky top-0 z-50 shadow-2xl">
        <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 bg-clip-text text-transparent tracking-wide">
          Pranay Guda
        </div>
        <ul className="flex space-x-8 text-base font-medium">
          <li>
            <a
              href="#about"
              className="hover:text-amber-400 transition-all duration-300 hover:scale-105 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-yellow-400 transition-all duration-300 hover:scale-105 relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-105 relative group"
            >
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-yellow-300 transition-all duration-300 hover:scale-105 relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-amber-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        </ul>
      </nav>

      <section
        id="about"
        className="flex flex-col items-center py-20 px-4 md:px-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-amber-800/20 rounded-3xl transform rotate-1 scale-110"></div>
        <div className="relative z-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image
              src="/1500.jpg"
              alt="Pranay Guda"
              width={160}
              height={160}
              className="relative rounded-full w-40 h-40 border-4 border-amber-400/50 shadow-2xl"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Full-Stack Developer
          </h1>
          <p className="text-xl max-w-4xl text-gray-300 leading-relaxed font-light">
            Passionate{" "}
            <span className="font-semibold text-amber-400">
              Software Engineer
            </span>{" "}
            with strong interests in
            <span className="font-semibold text-yellow-400">
              {" "}
              distributed systems
            </span>
            ,{" "}
            <span className="font-semibold text-amber-300">
              high-performance architectures
            </span>
            , and
            <span className="font-semibold text-yellow-300">
              {" "}
              scalable backend solutions
            </span>
            . Building robust, production-ready applications that solve
            real-world problems with clean code and thoughtful engineering.
          </p>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 md:px-12 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Engineering Excellence
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Cutting-edge distributed systems and high-performance architectures
            showcasing advanced engineering expertise
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectsData.map((project) => (
            <Dialog key={project.title}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-amber-500/20 shadow-2xl hover:shadow-amber-500/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] rounded-2xl overflow-hidden backdrop-blur-sm hover:border-amber-400/40">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-amber-900/50 to-yellow-900/50 text-amber-300 rounded-full border border-amber-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-amber-400 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border border-amber-500/30">
                <div className="space-y-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <DialogTitle className="text-2xl font-bold text-white">
                    {project.title}
                  </DialogTitle>
                  <p className="text-amber-400 font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-gray-300">{project.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white">
                      Technical Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-300">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-amber-900/50 to-yellow-900/50 text-amber-300 rounded-full border border-amber-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      <section
        id="experience"
        className="py-20 px-4 md:px-12 bg-gradient-to-br from-gray-900/50 via-black/30 to-gray-800/50 relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,158,11,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Engineering excellence across diverse platforms and technologies,
              building scalable systems that power modern applications
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {experienceData.map((exp) => (
              <Dialog key={exp.company}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-yellow-500/20 shadow-2xl hover:shadow-yellow-500/20 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] rounded-2xl overflow-hidden backdrop-blur-sm hover:border-yellow-400/40">
                    <CardContent className="p-6">
                      <div className="flex gap-4 mb-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={exp.image}
                            alt={exp.company}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-contain rounded-lg bg-white/10 p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                              {exp.company}
                            </h3>
                            <span className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-amber-300 border border-amber-500/30 flex-shrink-0 ml-2">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-yellow-400 mb-3">
                            {exp.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {exp.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-900/50 to-amber-900/50 text-yellow-300 rounded-full border border-yellow-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border border-yellow-500/30">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-contain rounded-lg bg-white/10 p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <DialogTitle className="text-2xl font-bold text-white">
                            {exp.company}
                          </DialogTitle>
                          <span className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30 flex-shrink-0 ml-2">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-yellow-400 font-semibold">
                          {exp.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-white">
                        Key Engineering Accomplishments:
                      </h4>
                      <ul className="space-y-2">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-yellow-900/50 to-amber-900/50 text-yellow-300 rounded-full border border-yellow-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 px-4 md:px-12 text-center bg-gradient-to-br from-amber-900/20 via-black/30 to-yellow-900/20 relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(245,158,11,0.15),transparent)] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to architect the next generation of distributed systems? Let's
            collaborate and engineer solutions that scale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:gudapranaynetha@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black border-0 shadow-lg hover:shadow-xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-semibold">
                📧 Email
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/netha-pranay-10guda/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black border-0 shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-semibold">
                💼 LinkedIn
              </Button>
            </a>
            <a
              href="https://github.com/Pranay-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black border-0 shadow-lg hover:shadow-xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-semibold">
                🚀 GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-gray-400 bg-gradient-to-r from-black via-gray-900 to-black border-t border-amber-500/20">
        <p className="mb-2">
          © 2025 Pranay Guda. Engineered with precision and passion.
        </p>
        <p className="text-xs text-gray-500">
          Architecting the future, one distributed system at a time.
        </p>
      </footer>
    </div>
  );
}
