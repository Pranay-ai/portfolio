"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const projectDetails = {
  "Distributed Rate Limiter": [
    "Developed a distributed token bucket rate limiter in Go, integrating Redis for centralized token tracking.",
    "Used Lua scripting to ensure atomic token operations for accurate enforcement under concurrency.",
    "Containerized using Docker and fronted by NGINX for routing, rate enforcement, and auto-scaling.",
    "Achieved 99.99% uptime under production loads with cleanup routines to handle inactive clients."
  ],
  "Distributed Cache Decorator": [
    "Created a Python decorator library for plug-and-play caching across microservices.",
    "Implemented TTL and code-aware cache invalidation to handle logic changes and redeployments.",
    "Used Redis hash-based keying and singleton client setup for performance and fault tolerance.",
    "Enabled fallback logic for expired cache entries and improved hit ratio by over 40%."
  ],
  "Real-Time Clipboard Sync": [
    "Built a Go-based backend enabling cross-device clipboard sync using WebSockets.",
    "Used Redis Pub/Sub for broadcasting clipboard updates with sub-second latency.",
    "JWT-authenticated session management with secure OTP-based password recovery.",
    "Designed for extensibility with support for Windows/macOS clients and mobile adaptation."
  ]
};

const experienceDetails = {
  "Inner Joy Ed": [
    "Built an AI curriculum tool by integrating LangChain, GPT-4, and FAISS for personalized learning paths.",
    "Developed modular UIs in Next.js + Tailwind CSS, improving feature rollout speed by 30%.",
    "Deployed NestJS-based APIs using PostgreSQL and optimized performance under high concurrency.",
    "Enabled PDF generation/editing flow with Canva integration and cloud-based file storage."
  ],
  "One Community Inc.": [
    "Refactored Django backend to improve modularity, scalability, and testability.",
    "Designed REST APIs for task tracking, reporting, and admin operations.",
    "Reduced SQL response latency by 30% through index tuning and query optimization.",
    "Set up CI/CD with Pytest and GitHub Actions to boost coverage and reduce bugs."
  ],
  "CSU Fullerton": [
    "Taught C++ data structures and algorithms (trees, recursion, lists) to a 50+ student cohort.",
    "Created real-world examples and exam assessments to deepen student understanding.",
    "Mentored students on software design patterns (OOP, DRY) and clean code practices.",
    "Improved class performance by 15% and received 90%+ student satisfaction scores."
  ],
  "TCS": [
    "Built a Python CLI tool to parse AUTOSAR XML into structured JSON/CSV formats.",
    "Reduced diagnostics processing time by 40% through efficient XML handling (lxml, ElementTree).",
    "Delivered reliable tooling adopted as standard by the team for field troubleshooting.",
    "Collaborated using GitLab and Agile boards to deliver all sprint tasks on time."
  ]
};

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <div className="bg-[#f8f4f0] text-[#1a1a1a] font-sans min-h-screen">
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-[#e8e1dc] sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-wide">Pranay Guda</div>
        <ul className="flex space-x-6 text-base">
          <li><a href="#about" className="hover:text-[#8c7c73] transition-colors duration-200">About</a></li>
          <li><a href="#projects" className="hover:text-[#8c7c73] transition-colors duration-200">Projects</a></li>
          <li><a href="#experience" className="hover:text-[#8c7c73] transition-colors duration-200">Experience</a></li>
          <li><a href="#contact" className="hover:text-[#8c7c73] transition-colors duration-200">Contact</a></li>
        </ul>
      </nav>

      <section id="about" className="flex flex-col items-center py-16 px-4 md:px-12 text-center">
        <img src="/1500.jpg" alt="Pranay Guda" className="rounded-full w-36 h-36 mb-6 border-4 border-[#d4c1b8]" />
        <h1 className="text-4xl font-semibold mb-4">Hi, I'm Pranay</h1>
        <p className="text-lg max-w-2xl text-[#3a3a3a]">
          Full-Stack Developer with hands-on experience building scalable systems and AI-powered applications using Go, Python, React, and cloud-native tech.
        </p>
      </section>

      <section id="projects" className="py-16 px-4 md:px-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">Projects</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          {Object.entries(projectDetails).map(([title, points]) => (
            <CarouselItem key={title}>
              <Dialog>
                <DialogTrigger asChild>
                  <Card onClick={() => setSelectedProject(title)} className="bg-[#f3ebe6] border border-[#d4c1b8] shadow-lg cursor-pointer hover:shadow-xl transition-transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{title}</h3>
                      <ul className="text-[#6e625c] text-sm list-disc pl-5 space-y-2">
                        {points.slice(0, 2).map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>{title}</DialogTitle>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                    {points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </Carousel>
      </section>

      <section id="experience" className="py-16 px-4 md:px-12 bg-[#f2e9e4]">
        <h2 className="text-3xl font-semibold mb-8 text-center">Experience</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {Object.entries(experienceDetails).map(([company, points]) => (
            <Dialog key={company}>
              <DialogTrigger asChild>
                <Card onClick={() => setSelectedExperience(company)} className="bg-[#fffaf7] border border-[#e0ccc2] shadow cursor-pointer hover:shadow-md hover:scale-[1.02] transition-transform">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{company}</h3>
                    <ul className="text-[#85736c] text-sm list-disc pl-5 space-y-2">
                      {points.slice(0, 2).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{company}</DialogTitle>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  {points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 px-4 md:px-12 text-center">
        <h2 className="text-3xl font-semibold mb-8">Contact</h2>
        <p className="text-[#5c504b] mb-4">Reach out via email or connect on LinkedIn</p>
        <div className="space-x-4">
          <a href="mailto:gudapranaynetha@gmail.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-[#1a1a1a] border-[#c1b0a8] hover:bg-[#e6ded9] hover:scale-105 transition-transform">Email</Button>
          </a>
          <a href="https://www.linkedin.com/in/netha-pranay-10guda/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-[#1a1a1a] border-[#c1b0a8] hover:bg-[#e6ded9] hover:scale-105 transition-transform">LinkedIn</Button>
          </a>
          <a href="https://github.com/Pranay-ai" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-[#1a1a1a] border-[#c1b0a8] hover:bg-[#e6ded9] hover:scale-105 transition-transform">GitHub</Button>
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-[#7b6e67] bg-[#f8f4f0]">
        © 2025 Pranay Guda. All rights reserved.
      </footer>
    </div>
  );
}
