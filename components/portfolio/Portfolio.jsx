"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

const projectsData = [
  {
    title: "Distributed Rate Limiter",
    image: "/rate-limiter.png",
    subtitle: "High-Performance Traffic Control System",
    description: "Architected an enterprise-grade distributed rate limiting solution using Go and Redis, achieving 99.99% uptime under heavy production loads.",
    details: [
      "Engineered a sophisticated token bucket algorithm with Redis-backed distributed state management for seamless horizontal scaling",
      "Implemented atomic Lua scripting for race-condition-free token operations, ensuring precise rate enforcement across concurrent requests",
      "Containerized with Docker and orchestrated through NGINX for intelligent load balancing and auto-scaling capabilities",
      "Deployed advanced cleanup routines and health monitoring to maintain optimal performance with zero downtime"
    ],
    tags: ["Go", "Redis", "Docker", "NGINX", "Microservices"]
  },
  {
    title: "Distributed Cache Decorator",
    image: "/dis-chache.png",
    subtitle: "Intelligent Caching Infrastructure",
    description: "Developed a revolutionary Python decorator library that transforms microservice performance through intelligent distributed caching.",
    details: [
      "Created a plug-and-play caching solution with zero-configuration setup, boosting application performance by over 40%",
      "Pioneered code-aware cache invalidation technology that automatically handles logic changes and deployment cycles",
      "Implemented sophisticated Redis hash-based keying with singleton client architecture for maximum fault tolerance",
      "Designed intelligent fallback mechanisms and cache warming strategies for enterprise-level reliability"
    ],
    tags: ["Python", "Redis", "Microservices", "Performance", "Architecture"]
  },
  {
    title: "ClipSync Pro",
    image: "/clipsync.jpeg",
    subtitle: "Real-Time Cross-Platform Clipboard Sync",
    description: "Built a cutting-edge real-time clipboard synchronization platform enabling seamless content sharing across all devices.",
    details: [
      "Developed a lightning-fast Go backend with WebSocket architecture delivering sub-second clipboard synchronization",
      "Implemented Redis Pub/Sub messaging system for instant, reliable content broadcasting across multiple devices",
      "Engineered secure JWT-based authentication with advanced OTP password recovery and session management",
      "Designed extensible cross-platform architecture supporting Windows, macOS, and mobile devices with future-ready APIs"
    ],
    tags: ["Go", "WebSockets", "Redis", "JWT", "Cross-Platform"]
  }
];

const experienceData = [
  {
    company: "Inner Joy Ed",
    image: "/innnerjoyed.jpeg",
    role: "Full-Stack AI Engineer",
    period: "2023 - Present",
    description: "Spearheaded the development of next-generation AI-powered educational tools, revolutionizing personalized learning experiences.",
    details: [
      "Architected an intelligent curriculum platform integrating LangChain, GPT-4, and FAISS vector databases for personalized learning pathways",
      "Engineered responsive, modular UI components using Next.js and Tailwind CSS, accelerating feature deployment by 30%",
      "Built high-performance NestJS APIs with PostgreSQL optimization, ensuring seamless performance under concurrent user loads",
      "Integrated advanced PDF generation and Canva editing workflows with cloud-native file storage solutions"
    ],
    tags: ["AI/ML", "Next.js", "NestJS", "PostgreSQL", "GPT-4"]
  },
  {
    company: "One Community Inc.",
    image: "/one community.jpeg",
    role: "Backend Engineer",
    period: "2022 - 2023",
    description: "Transformed backend architecture for a global community platform, enhancing scalability and performance for thousands of users.",
    details: [
      "Architected comprehensive Django backend refactoring, dramatically improving system modularity, scalability, and maintainability",
      "Designed robust REST API ecosystem for task management, advanced reporting, and administrative operations",
      "Optimized database performance with strategic index tuning and query optimization, reducing SQL response latency by 30%",
      "Established enterprise-grade CI/CD pipeline using Pytest and GitHub Actions, boosting code coverage and reducing production bugs"
    ],
    tags: ["Django", "REST APIs", "PostgreSQL", "CI/CD", "Performance"]
  },
  {
    company: "CSU Fullerton",
    image: "/CSUF.png",
    role: "Computer Science Instructor",
    period: "2021 - 2022",
    description: "Elevated computer science education through innovative teaching methodologies and mentorship, inspiring the next generation of developers.",
    details: [
      "Delivered comprehensive C++ curriculum covering advanced data structures, algorithms, and system design to 50+ students per semester",
      "Developed innovative real-world programming examples and assessments that significantly enhanced student comprehension and engagement",
      "Mentored students in software engineering best practices, including OOP principles, design patterns, and clean code methodologies",
      "Achieved exceptional 15% improvement in class performance metrics with consistently high 90%+ student satisfaction ratings"
    ],
    tags: ["C++", "Data Structures", "Algorithms", "Teaching", "Mentorship"]
  },
  {
    company: "Tata Consultancy Services",
    image: "/tcs.jpeg",
    role: "Software Engineer",
    period: "2020 - 2021",
    description: "Delivered mission-critical automation solutions for automotive diagnostics, streamlining complex data processing workflows.",
    details: [
      "Engineered a sophisticated Python CLI tool for parsing complex AUTOSAR XML specifications into structured JSON/CSV formats",
      "Achieved remarkable 40% reduction in diagnostics processing time through optimized XML handling using lxml and ElementTree",
      "Delivered production-ready tooling that became the team standard for field troubleshooting and diagnostic analysis",
      "Collaborated effectively using GitLab and Agile methodologies, consistently delivering sprint objectives ahead of schedule"
    ],
    tags: ["Python", "XML Processing", "CLI Tools", "Agile", "Automation"]
  }
];

export default function Portfolio() {

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 text-slate-800 font-sans min-h-screen">
      <nav className="flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent tracking-wide">Pranay Guda</div>
        <ul className="flex space-x-8 text-base font-medium">
          <li><a href="#about" className="hover:text-emerald-600 transition-all duration-300 hover:scale-105">About</a></li>
          <li><a href="#projects" className="hover:text-blue-600 transition-all duration-300 hover:scale-105">Projects</a></li>
          <li><a href="#experience" className="hover:text-violet-600 transition-all duration-300 hover:scale-105">Experience</a></li>
          <li><a href="#contact" className="hover:text-indigo-600 transition-all duration-300 hover:scale-105">Contact</a></li>
        </ul>
      </nav>

      <section id="about" className="flex flex-col items-center py-20 px-4 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-blue-100/30 to-violet-100/30 rounded-3xl transform rotate-1 scale-110"></div>
        <div className="relative z-10">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-violet-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <Image src="/1500.jpg" alt="Pranay Guda" width={160} height={160} className="relative rounded-full w-40 h-40 border-4 border-white/50 shadow-2xl" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-700 via-blue-700 to-violet-700 bg-clip-text text-transparent">
            Creative Technologist & AI Engineer
          </h1>
          <p className="text-xl max-w-4xl text-slate-600 leading-relaxed font-light">
            Passionate <span className="font-semibold text-emerald-600">Full-Stack Engineer</span> crafting next-generation solutions at the intersection of 
            <span className="font-semibold text-blue-600"> artificial intelligence</span>, <span className="font-semibold text-violet-600">distributed systems</span>, and 
            <span className="font-semibold text-indigo-600">user experience</span>. Transforming complex challenges into elegant, scalable technologies that shape the future.
          </p>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 md:px-12 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Innovative solutions showcasing advanced engineering and creative problem-solving
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projectsData.map((project) => (
            <Dialog key={project.title}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer h-full bg-gradient-to-br from-white via-emerald-50/20 to-blue-50/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={400} 
                      height={250} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <p className="text-sm font-medium text-blue-600 mb-3">{project.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <div className="space-y-4">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={600} 
                    height={300} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <DialogTitle className="text-2xl font-bold text-slate-800">{project.title}</DialogTitle>
                  <p className="text-blue-600 font-medium">{project.subtitle}</p>
                  <p className="text-slate-600">{project.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-800">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {project.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-slate-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full">
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

      <section id="experience" className="py-20 px-4 md:px-12 bg-gradient-to-br from-violet-50/50 via-blue-50/30 to-emerald-50/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Transforming ideas into impactful solutions across diverse industries and technologies
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {experienceData.map((exp) => (
              <Dialog key={exp.company}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer h-full bg-gradient-to-br from-white via-violet-50/20 to-blue-50/20 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="relative overflow-hidden rounded-t-2xl">
                      <Image 
                        src={exp.image} 
                        alt={exp.company} 
                        width={400} 
                        height={200} 
                        className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700">
                        {exp.period}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {exp.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-slate-800 group-hover:text-violet-600 transition-colors">{exp.company}</h3>
                      <p className="text-sm font-semibold text-violet-600 mb-3">{exp.role}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <div className="space-y-4">
                    <Image 
                      src={exp.image} 
                      alt={exp.company} 
                      width={600} 
                      height={300} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <DialogTitle className="text-2xl font-bold text-slate-800">{exp.company}</DialogTitle>
                        <p className="text-violet-600 font-semibold">{exp.role}</p>
                      </div>
                      <span className="bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-600">{exp.description}</p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800">Key Accomplishments:</h4>
                      <ul className="space-y-2">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-slate-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 rounded-full">
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

      <section id="contact" className="py-20 px-4 md:px-12 text-center bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-violet-50/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(34,197,94,0.1),transparent)] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
            Let's Create Something Amazing
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Ready to collaborate on your next breakthrough project? Let's connect and transform your vision into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:gudapranaynetha@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-medium">
                📧 Email
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/netha-pranay-10guda/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-medium">
                💼 LinkedIn
              </Button>
            </a>
            <a href="https://github.com/Pranay-ai" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-6 py-3 rounded-full font-medium">
                🚀 GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-slate-500 bg-gradient-to-r from-emerald-50 via-blue-50 to-violet-50 border-t border-white/20">
        <p className="mb-2">© 2025 Pranay Guda. Crafted with passion and precision.</p>
        <p className="text-xs text-slate-400">Building the future, one line of code at a time.</p>
      </footer>
    </div>
  );
}
