"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-[--blush-light]/30 via-[--cream] to-[--sage-pale]/50 py-28 md:py-40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[--sage-muted] rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[--lavender-light] rounded-full blur-3xl opacity-20" />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-[--taupe] mb-4">
            Get to Know Me
          </p>
          <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[--charcoal] tracking-wide">
            About
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-[--sage-muted]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[--sage]" />
            <span className="w-12 h-px bg-[--sage-muted]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <motion.div
            className="md:col-span-4 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[--sage]/30" />
              <div className="absolute -inset-8 border border-[--sage]/10" />

              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden relative">
                <Image
                  src="/png.jpeg"
                  alt="Portrait of Pranay Netha Guda"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  width={400}
                  height={400}
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[--sage]/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            className="md:col-span-8 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-[--charcoal] leading-relaxed font-light">
                Full-Stack Software Engineer specializing in scalable GenAI applications, AI Voice Agent platforms, and production backend systems.
              </p>
              <p className="text-lg md:text-xl text-[--graphite] leading-relaxed font-light">
                Building real-time conversational AI pipelines with Pipecat, Daily.co, and WebRTC telephony. Expert in LangChain/LangGraph orchestration, Graph RAG systems, and prompt engineering for voice agents achieving sub-500ms latencies.
              </p>
            </div>

            {/* Education */}
            <div className="flex items-center gap-4 py-5 border-y border-[--sage-muted]/30">
              <div className="w-12 h-12 flex items-center justify-center bg-[--sage-pale] border border-[--sage]/20">
                <svg className="w-6 h-6 text-[--sage]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <p className="font-sans-elegant text-base md:text-lg text-[--charcoal] tracking-wide">Master of Science in Computer Science</p>
                <p className="font-sans-elegant text-sm text-[--taupe] tracking-wide">California State University, Fullerton • 2022 – 2024</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="font-sans-elegant text-sm tracking-[0.2em] uppercase text-[--taupe] mb-4">
                Technical Skills
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                {[
                  { label: "Languages", value: "Python, JavaScript, TypeScript, Go" },
                  { label: "Backend", value: "FastAPI, Node.js, Express, NestJS, Microservices, gRPC" },
                  { label: "Frontend", value: "React, Next.js, Redux, Tailwind, WebSockets, SSE" },
                  { label: "Data Layer", value: "PostgreSQL, MongoDB, Redis, Neo4j, Pinecone" },
                  { label: "AI/ML Stack", value: "LangChain, LangGraph, Graph RAG, OpenAI, Pipecat" },
                  { label: "Voice & Telephony", value: "Daily.co, Telnyx, Twilio, WebRTC, SIP" },
                  { label: "DevOps", value: "Docker, Kubernetes, Kafka, AWS Lambda, Terraform, Jenkins" },
                ].map((skill, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-sans-elegant text-[--sage] tracking-wide shrink-0">{skill.label}:</span>
                    <span className="text-[--graphite] font-light">{skill.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="font-sans-elegant text-sm tracking-[0.2em] uppercase text-[--taupe] mb-4">
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "AWS Certified Developer – Associate",
                  "Apache Kafka 101 by Confluent",
                  "Open Source: Pipecat Flows Contributor",
                ].map((cert, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-[--cream] border border-[--sage]/20 px-5 py-3 text-[--charcoal] font-sans-elegant text-sm tracking-wide hover:border-[--sage]/40 hover:bg-[--sage-pale]/30 transition-all duration-300">
                    <span className="w-2 h-2 rounded-full bg-[--gold-accent]" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[--sage-muted]/30">
              {[
                { value: "1K+", label: "Daily Users Served" },
                { value: "35%", label: "API Response Gains" },
                { value: "70+", label: "Students Taught" },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="font-headline text-3xl md:text-4xl text-[--sage]">
                    {stat.value}
                  </p>
                  <p className="font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--taupe] mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
