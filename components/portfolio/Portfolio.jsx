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
import { motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import ScrollReveal from "./ScrollReveal";
import DiarySection from "./DiarySection";
import ParallaxBackground from "./ParallaxBackground";

const fullProjectsData = [
  {
    title: "AI Agent for Natural Language SQL Query Processing",
    image: "/SqlAgent.png",
    subtitle: "Intelligent Database Interaction System",
    description:
      "Developed an advanced AI-powered system that converts natural language queries into SQL, enabling non-technical users to interact with databases seamlessly.",
    achievements: [
      "Built sophisticated natural language processing pipeline using LangChain and OpenAI APIs for accurate query interpretation",
      "Engineered robust SQL generation engine with query validation and optimization capabilities",
      "Implemented intelligent context awareness for complex multi-table queries and relationships",
      "Created comprehensive error handling and query suggestion system for improved user experience",
      "Designed secure database access layer with role-based permissions and query sanitization",
      "Achieved 92% accuracy in query translation across diverse database schemas and business domains",
    ],
    tags: [
      "Python",
      "LangChain",
      "OpenAI",
      "SQL",
      "NLP",
      "AI/ML",
      "Database Systems",
    ],
    impact:
      "Reduced time for data analysis queries by 75% and enabled non-technical stakeholders to access insights independently",
  },
  {
    title: "Distributed Rate Limiter & Cache System",
    image: "/rate-limiter.png",
    subtitle: "High-Performance Traffic Control & Caching",
    description:
      "Built a comprehensive distributed rate limiting and caching solution using Go and Redis, handling enterprise-scale traffic with sub-millisecond response times.",
    achievements: [
      "Engineered sophisticated token bucket algorithm with Redis-backed distributed state management for seamless horizontal scaling",
      "Implemented atomic Lua scripting for race-condition-free operations, ensuring precise rate enforcement across concurrent requests",
      "Developed intelligent caching layer with TTL management and cache invalidation strategies",
      "Containerized with Docker and orchestrated through NGINX for intelligent load balancing and auto-scaling",
      "Built comprehensive monitoring dashboard with real-time metrics and alerting capabilities",
      "Achieved 99.99% uptime handling 100,000+ requests per second with sub-millisecond latency",
    ],
    tags: [
      "Go",
      "Redis",
      "Docker",
      "NGINX",
      "Microservices",
      "Lua",
      "Load Balancing",
    ],
    impact:
      "Reduced server overload incidents by 95% and improved API response consistency across the platform",
  },
  {
    title: "Distributed MapReduce Framework",
    image: "/mapreduce.png",
    subtitle: "Scalable Big Data Processing Engine",
    description:
      "Implemented a distributed MapReduce framework from scratch in Go, enabling efficient processing of large datasets across multiple nodes with fault tolerance.",
    achievements: [
      "Architected complete MapReduce implementation with coordinator and worker node coordination",
      "Built robust fault tolerance mechanisms with automatic task reassignment and node failure recovery",
      "Implemented efficient data partitioning and load balancing algorithms for optimal resource utilization",
      "Designed pluggable interface for custom map and reduce functions supporting various data processing tasks",
      "Created comprehensive logging and monitoring system for tracking job progress and performance metrics",
      "Achieved linear scalability processing terabytes of data across 50+ worker nodes",
    ],
    tags: [
      "Go",
      "Distributed Systems",
      "Big Data",
      "Concurrency",
      "Fault Tolerance",
      "Algorithms",
    ],
    impact:
      "Enabled processing of 10TB+ datasets in under 2 hours, reducing traditional processing time by 80%",
  },
  {
    title: "Real-Time Clipboard Sync Backend",
    image: "/clipsync.jpeg",
    subtitle: "Multi-Device Synchronization Platform",
    description:
      "Built a cutting-edge real-time synchronization platform enabling seamless clipboard content sharing across multiple devices with sub-second latency.",
    achievements: [
      "Developed lightning-fast Go backend with WebSocket architecture delivering sub-second synchronization across 6+ devices",
      "Implemented Redis Pub/Sub messaging system for instant, reliable content broadcasting with zero message loss",
      "Engineered secure JWT-based authentication with OTP password recovery and comprehensive session management",
      "Designed extensible cross-platform architecture supporting Windows, macOS, and mobile devices",
      "Built conflict resolution algorithms for handling simultaneous clipboard updates from multiple devices",
      "Implemented end-to-end encryption for all synchronized content with automatic key rotation",
    ],
    tags: [
      "Go",
      "WebSockets",
      "Redis",
      "JWT",
      "Distributed Systems",
      "Encryption",
      "Cross-Platform",
    ],
    impact:
      "Enabled seamless productivity workflows for remote teams, increasing collaboration efficiency by 40%",
  },
  {
    title: "Sentiment Analysis API",
    image: "/SentimentAnalysis.png",
    subtitle: "Advanced Text Analytics Service",
    description:
      "Developed a comprehensive sentiment analysis API using machine learning models to provide real-time emotion and sentiment detection for text data.",
    achievements: [
      "Built robust NLP pipeline using transformers and BERT models for accurate sentiment classification",
      "Implemented multi-language support with 95%+ accuracy across English, Spanish, and French text",
      "Designed scalable REST API with rate limiting, authentication, and comprehensive documentation",
      "Created real-time batch processing capabilities handling 10,000+ requests per minute",
      "Integrated advanced emotion detection beyond basic sentiment (joy, anger, fear, surprise, etc.)",
      "Built comprehensive analytics dashboard with sentiment trends and visualization capabilities",
    ],
    tags: [
      "Python",
      "NLP",
      "BERT",
      "Transformers",
      "REST API",
      "Machine Learning",
      "Analytics",
    ],
    impact:
      "Processed over 1M+ text samples for business intelligence, improving customer satisfaction insights by 60%",
  },
];

const fullExperienceData = [
  {
    company: "Innerjoy Ed",
    image: "/innnerjoyed.jpeg",
    role: "Full Stack Developer",
    period: "May 2024 - Present",
    location: "Los Angeles, CA (Remote)",
    description:
      "Leading full-stack development of educational technology platforms, building scalable web applications and APIs to enhance learning experiences for students and educators.",
    achievements: [
      "Developed responsive web applications using React.js and Node.js, serving educational content to thousands of users",
      "Built robust backend APIs with proper authentication, authorization, and data validation",
      "Implemented database design and optimization strategies for efficient data storage and retrieval",
      "Collaborated with cross-functional teams to deliver features on time and within scope",
      "Participated in code reviews and maintained high code quality standards",
      "Integrated third-party services and APIs to enhance platform functionality",
      "Contributed to technical documentation and knowledge sharing within the development team",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "JavaScript",
      "HTML/CSS",
      "MongoDB",
      "Express.js",
      "Git",
      "AWS",
    ],
    keyProjects: [
      "Educational Content Management System",
      "Student Progress Tracking Dashboard",
      "Interactive Learning Platform Features",
    ],
  },
  {
    company: "California State University, Fullerton",
    image: "/CSUF.png",
    role: "Teaching Associate",
    period: "August 2023 - December 2023",
    location: "Fullerton, CA",
    description:
      "Supported computer science education by assisting with course instruction, student mentoring, and academic support for undergraduate computer science students.",
    achievements: [
      "Assisted in teaching computer science fundamentals including data structures and algorithms",
      "Provided one-on-one tutoring and academic support to help students understand complex programming concepts",
      "Graded assignments and provided constructive feedback to help students improve their coding skills",
      "Conducted office hours and study sessions to support student learning",
      "Helped develop course materials and programming exercises",
      "Collaborated with faculty to improve curriculum delivery and student engagement",
      "Mentored students in best practices for software development and problem-solving approaches",
    ],
    technologies: [
      "C++",
      "Python",
      "Java",
      "Data Structures",
      "Algorithms",
      "Teaching",
      "Academic Support",
    ],
    keyProjects: [
      "Student Programming Workshop Series",
      "Course Material Development",
      "Academic Mentoring Program",
    ],
  },
];

const skillsAndTechnologies = {
  "Programming Languages": [
    "JavaScript/TypeScript",
    "Python",
    "Go",
    "C++",
    "Java",
    "SQL",
  ],
  "Frontend Technologies": [
    "React.js",
    "Next.js",
    "HTML5/CSS3",
    "Tailwind CSS",
    "Responsive Design",
  ],
  "Backend Technologies": [
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "REST APIs",
    "GraphQL",
  ],
  "Databases & Storage": [
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "MySQL",
    "Database Design",
  ],
  "AI/ML & Data Science": [
    "LangChain",
    "OpenAI API",
    "NLP",
    "BERT",
    "Transformers",
    "Sentiment Analysis",
  ],
  "Cloud & DevOps": [
    "AWS",
    "Docker",
    "Git",
    "GitHub Actions",
    "CI/CD",
    "Linux",
  ],
  "Distributed Systems": [
    "Microservices",
    "MapReduce",
    "WebSockets",
    "Load Balancing",
    "Fault Tolerance",
  ],
};

const education = {
  degree: "Master of Science in Computer Science",
  university: "California State University, Fullerton",
  period: "August 2022 - May 2024",
  gpa: "3.8/4.0",
  relevantCourses: [
    "Advanced Algorithms and Data Structures",
    "Distributed Systems",
    "Database Systems",
    "Software Engineering",
    "Computer Networks",
    "Machine Learning",
  ],
};

const certifications = [
  // Add your actual certifications here when you have them
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background relative">
      <ParallaxBackground />
      <SidebarMenu />
      <div className="sketch-container relative z-10">
        {/* Floating Doodles */}
        <motion.div
          className="doodle floating-element"
          style={{ top: "10%", left: "5%" }}
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🚀
        </motion.div>
        <motion.div
          className="doodle floating-element"
          style={{ top: "20%", right: "8%" }}
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="doodle floating-element"
          style={{ top: "60%", left: "3%" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          💡
        </motion.div>
        <motion.div
          className="doodle floating-element"
          style={{ bottom: "20%", right: "5%" }}
          animate={{ y: [0, -25, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🎯
        </motion.div>
        <motion.div
          className="doodle floating-element"
          style={{ top: "40%", right: "2%" }}
          animate={{ scale: [1, 0.8, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          ✨
        </motion.div>

        {/* Hero Section */}
        <section id="hero" className="py-16">
          <ScrollReveal direction="scale" delay={0.2}>
            <div className="sketch-card paper-texture" style={{ marginTop: "2rem" }}>
              <div className="text-center relative">
                <motion.div
                  className="sketch-image mx-auto w-fit mb-6"
                  style={{ transform: "rotate(2deg)" }}
                  whileHover={{ rotate: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/1500.jpg"
                    alt="Pranay Guda"
                    width={150}
                    height={150}
                    className="w-32 robject-cover"
                  />
                </motion.div>
                
                <motion.h1 
                  className="sketch-title"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Hey! I'm Pranay Guda 👋
                </motion.h1>
                
                <motion.p 
                  className="sketch-subheading typewriter-text inline-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Full-Stack Software Engineer & Problem Solver
                </motion.p>
                
                <motion.p 
                  className="sketch-text max-w-2xl mx-auto mt-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Passionate about building{" "}
                  <span className="sketch-highlight">distributed systems</span>,{" "}
                  <span className="sketch-highlight">
                    high-performance applications
                  </span>
                  , and{" "}
                  <span className="sketch-highlight">scalable solutions</span> that
                  make a real impact! I love turning complex problems into elegant,
                  efficient code. 🌟
                </motion.p>

                {/* Quick Stats Scattered */}
                <motion.div 
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <motion.div
                    className="sketch-highlight"
                    style={{ transform: "rotate(-2deg)" }}
                    whileHover={{ rotate: 2, scale: 1.1 }}
                  >
                    <strong>15+</strong> Projects Built 🏗️
                  </motion.div>
                  <motion.div
                    className="sketch-highlight"
                    style={{ transform: "rotate(1deg)" }}
                    whileHover={{ rotate: -1, scale: 1.1 }}
                  >
                    <strong>1+</strong> Years Experience 📅
                  </motion.div>
                  <motion.div
                    className="sketch-highlight"
                    style={{ transform: "rotate(-1deg)" }}
                    whileHover={{ rotate: 1, scale: 1.1 }}
                  >
                    <strong>20+</strong> Technologies Mastered 🔧
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Current Role */}
        <section id="about" className="py-16">
          <ScrollReveal direction="left" delay={0.2}>
            <div className="sketch-card ink-splatter">
              <h2 className="sketch-heading arrow-doodle scribble-underline">
                Currently Building Amazing Things! 🚀
              </h2>
              <div className="relative">
                <h3 className="sketch-subheading">
                  Full Stack Developer @ Innerjoy Ed
                </h3>
                <p className="typewriter-text mb-4 inline-block">
                  <strong>May 2024 - Present | Remote</strong>
                </p>
                <p className="sketch-text mb-4 text-lg">
                  Leading the development of scalable educational platforms that
                  serve 10,000+ students! Building everything from high-performance
                  backend APIs to responsive frontend experiences.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React.js", "Node.js", "MongoDB", "AWS", "JavaScript"].map(
                    (tech, index) => (
                      <motion.span 
                        key={tech} 
                        className="sketch-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        whileHover={{ rotate: Math.random() * 10 - 5 }}
                      >
                        {tech}
                      </motion.span>
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-16">
          <ScrollReveal direction="rotate" delay={0.2}>
            <div className="sketch-card paper-texture torn-edge">
              <h2 className="sketch-heading sketch-line">
                🎯 Featured Projects That I'm Proud Of!
              </h2>
              <p className="sketch-text mb-6 text-lg">
                Here are some of the coolest distributed systems and
                high-performance architectures I've built from scratch!
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Project Cards Grid */}
        <div className="projects-grid">
          {fullProjectsData.map((project, index) => (
            <ScrollReveal 
              key={project.title}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.2}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div
                    className="sketch-card sketch-card-project cursor-pointer paper-texture"
                    whileHover={{ 
                      scale: 1.03, 
                      rotate: Math.random() * 4 - 2,
                      y: -10
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div 
                      className="sketch-image mb-4"
                      whileHover={{ rotate: Math.random() * 6 - 3 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </motion.div>
                    <div>
                      <h3 className="sketch-subheading scribble-underline">{project.title}</h3>
                      <p className="typewriter-text text-sm mb-2 inline-block">
                        {project.subtitle}
                      </p>
                      <p className="sketch-text mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                          <motion.span 
                            key={tag} 
                            className="sketch-tag"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.1 }}
                            whileHover={{ rotate: Math.random() * 10 - 5 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <p className="sketch-text text-accent font-semibold">
                        💡 {project.impact}
                      </p>
                    </div>
                  </motion.div>
                </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                  <div className="sketch-image mx-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>

                  <DialogTitle className="sketch-heading">
                    {project.title}
                  </DialogTitle>
                  <p className="sketch-subheading">{project.subtitle}</p>
                  <p className="sketch-text text-lg">{project.description}</p>

                  <div>
                    <h4 className="sketch-subheading">
                      🛠️ What I Built & Achieved:
                    </h4>
                    <ul className="achievement-list mt-4">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="achievement-item">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="sketch-subheading">💪 Impact & Results:</h4>
                    <p className="sketch-text text-lg font-semibold text-accent">
                      {project.impact}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="sketch-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </DialogContent>
              </Dialog>
            </ScrollReveal>
          ))}
        </div>

        {/* Work Experience Section */}
        <section id="experience" className="py-16">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="sketch-card notebook-style ink-splatter">
              <h2 className="sketch-heading sketch-line">
                💼 My Professional Journey
              </h2>
              <p className="sketch-text mb-6 text-lg">
                Here's where I've been building amazing software and growing as an
                engineer!
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Experience Cards Grid */}
        <div className="experience-grid">
          {fullExperienceData.map((exp) => (
            <Dialog key={exp.company}>
              <DialogTrigger asChild>
                <div
                  className={`sketch-card sketch-card-experience cursor-pointer transition-transform`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="sketch-image flex-shrink-0">
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        width={80}
                        height={80}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="sketch-subheading">{exp.company}</h3>
                      <p className="sketch-text font-bold text-primary mb-1">
                        {exp.role}
                      </p>
                      <p className="sketch-text text-secondary font-semibold mb-2">
                        {exp.period} | {exp.location}
                      </p>
                    </div>
                  </div>
                  <p className="sketch-text mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="sketch-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="sketch-image flex-shrink-0">
                      <Image
                        src={exp.image}
                        alt={exp.company}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <DialogTitle className="sketch-heading">
                        {exp.company}
                      </DialogTitle>
                      <p className="sketch-subheading">{exp.role}</p>
                      <p className="sketch-text text-secondary font-semibold">
                        {exp.period} | {exp.location}
                      </p>
                    </div>
                  </div>

                  <p className="sketch-text text-lg">{exp.description}</p>

                  <div>
                    <h4 className="sketch-subheading">
                      🎯 Key Achievements & Impact:
                    </h4>
                    <ul className="achievement-list mt-4">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="achievement-item">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="sketch-subheading">🚀 Key Projects:</h4>
                    <ul className="achievement-list mt-4">
                      {exp.keyProjects.map((project, idx) => (
                        <li key={idx} className="achievement-item">
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="sketch-subheading">
                      🔧 Technologies & Tools:
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="sketch-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Add Diary Section */}
        <DiarySection />

        {/* Skills & Technologies */}
        <section id="skills" className="py-16">
          <ScrollReveal direction="rotate" delay={0.2}>
            <div className="sketch-card paper-texture torn-edge">
              <h2 className="sketch-heading sketch-line">
                🔧 My Technical Arsenal
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skillsAndTechnologies).map(([category, skills], catIndex) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIndex * 0.1 }}
                  >
                    <h3 className="sketch-subheading scribble-underline">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIndex) => (
                        <motion.span 
                          key={skill} 
                          className="sketch-tag"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                          whileHover={{ rotate: Math.random() * 10 - 5 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Education */}
        <div className="sketch-card">
          <h2 className="sketch-heading">🎓 Education & Learning</h2>
          <div className="mb-6">
            <h3 className="sketch-subheading">{education.degree}</h3>
            <p className="sketch-text font-semibold text-primary mb-2">
              {education.university}
            </p>
            <p className="sketch-text text-secondary mb-2">
              {education.period} | GPA: {education.gpa}
            </p>
            <div>
              <h4 className="sketch-text font-bold mb-2">
                Relevant Coursework:
              </h4>
              <div className="flex flex-wrap gap-2">
                {education.relevantCourses.map((course) => (
                  <span key={course} className="sketch-tag">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {certifications.length > 0 && (
            <div>
              <h3 className="sketch-subheading">🏆 Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span key={cert} className="sketch-tag">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <ScrollReveal direction="scale" delay={0.2}>
            <div className="sketch-card text-center paper-texture ink-splatter">
              <h2 className="sketch-heading scribble-underline">
                🤝 Let's Build Something Amazing Together!
              </h2>
              <p className="sketch-text text-lg mb-8">
                Ready to create the next big thing? I'm always excited to work on
                challenging projects and collaborate with awesome people! Drop me a
                line! ✨
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a 
                  href="mailto:gudapranaynetha@gmail.com" 
                  className="sketch-btn"
                  whileHover={{ y: -5, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧 Email Me!
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/netha-pranay-10guda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-btn"
                  whileHover={{ y: -5, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💼 LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/Pranay-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sketch-btn"
                  whileHover={{ y: -5, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 GitHub
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Fun Footer */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="sketch-card text-center sticky-note">
            <motion.p 
              className="sketch-text text-lg"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              © 2025 Pranay Guda | Made with ❤️, lots of ☕, and a sprinkle of ✨
              magic!
            </motion.p>
            <motion.p 
              className="sketch-text text-secondary mt-2 typewriter-text inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              "Code is like humor. When you have to explain it, it's bad." - Cory
              House 😄
            </motion.p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
