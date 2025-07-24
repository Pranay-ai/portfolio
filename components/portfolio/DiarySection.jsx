"use client";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const diaryEntries = [
  {
    date: "January 10, 2025",
    title: "Deep Dive: LSM Trees and Database Magic",
    content: `Been diving deep into LSM (Log-Structured Merge) Trees lately, and honestly? My mind is blown by how elegant this data structure is. 🤯

You know that feeling when you realize how something seemingly complex is actually beautifully simple? That's LSM Trees for me. The way they handle SSTables, Memtables, and the compaction process... it's like watching a perfectly choreographed dance.

I spent hours today breaking down how modern databases like Cassandra and RocksDB use LSM Trees for high-performance data management. The more I understand the internals, the more I appreciate the genius behind distributed systems design.

The best part? Explaining these concepts in simple terms. When you can take something as complex as database storage engines and make it accessible to other devs... that's when you know you truly understand it.

It's fascinating how the same principles that make LSM Trees efficient also apply to so many other distributed systems challenges. Everything is connected in ways that still surprise me daily. 💡`,
    mood: "fascinated",
    tags: ["databases", "LSM-trees", "distributed-systems", "learning", "deep-dive"]
  },
  {
    date: "January 3, 2025", 
    title: "Kafka Learning Journey & Continuous Growth",
    content: `Just completed the Apache Kafka 101 course by Confluent, and wow - what a journey! 🎯

There's something deeply satisfying about understanding how Kafka's building blocks work under the hood. The way it handles distributed streaming, partitioning, and fault tolerance... it's like peering into the engine of the modern data world.

This course reminded me why I love being a developer. Every day there's something new to learn, some technology to master, some problem to solve. The moment you think you know everything, the tech world throws another curveball your way.

What struck me most was how Kafka solves real-world problems at scale. Millions of messages flowing seamlessly, and it all comes down to elegant architecture and solid engineering principles.

Already planning my next learning adventure. Maybe diving deeper into stream processing with Kafka Streams? Or exploring how different companies implement their data pipelines?

The learning never stops, and honestly, I wouldn't have it any other way. 🚀`,
    mood: "accomplished",
    tags: ["kafka", "confluent", "streaming", "continuous-learning", "data-architecture"]
  },
  {
    date: "December 20, 2024",
    title: "Ancient Wisdom Meets Modern Computing",
    content: `Been thinking about something fascinating lately: how ancient military problems mirror modern distributed systems challenges. Mind = blown. 🏛️

The Two Generals Problem? It's basically every distributed system trying to achieve consensus through unreliable networks. The Byzantine Generals Problem? That's us dealing with malicious nodes and ensuring system integrity.

What gets me is that these aren't just academic thought experiments - they're the foundation of everything we build. Paxos, Raft, PBFT... all these consensus algorithms are basically solutions to problems generals faced centuries ago.

The math is beautiful too: "you need at least 3f + 1 generals to tolerate f traitors." Such a simple formula, yet it governs how we build fault-tolerant systems that power the entire internet.

It makes me realize that great engineering isn't just about new technology - it's about understanding timeless principles and applying them to modern challenges. The problems change, but the fundamental logic remains surprisingly constant.

History, mathematics, and computer science all dancing together in perfect harmony. ✨`,
    mood: "philosophical",
    tags: ["distributed-systems", "consensus", "byzantine-fault-tolerance", "history", "mathematics"]
  },
  {
    date: "December 15, 2024",
    title: "Google Interview Reflections: Growth Over Outcomes",
    content: `Just wrapped up the Google interview process - 1 behavioral round and 3 DSA rounds focusing on graphs and dynamic programming. Didn't make it through, but honestly? Best learning experience I've had in months! 📚

The interviewers were brilliant. They pushed me to think about space complexity, time complexity, and edge cases in ways I never had before. Every "what if..." question made me a better problem solver.

What I learned:
- Communication is just as important as coding
- Edge cases aren't just nice-to-haves - they're everything
- There's always another way to optimize
- Whiteboarding forces you to think before you code

Sure, it stings a bit not advancing, but I'm walking away with so much knowledge. Every failed test case, every optimization suggestion, every "can you do better?" - it all makes me stronger.

Currently looking for Associate Developer roles where I can apply my distributed systems and full-stack experience. The journey continues, and every setback is just setup for the comeback! 💪

The tech industry is tough, but it's also incredibly rewarding for those who embrace the grind and keep learning.`,
    mood: "resilient",
    tags: ["interviews", "google", "learning", "growth-mindset", "job-search", "algorithms"]
  }
];

export default function DiarySection() {
  return (
    <section id="diary" className="py-16 notebook-style">
      <div className="sketch-container">
        <ScrollReveal direction="rotate" delay={0.2}>
          <div className="sketch-card ink-splatter">
            <h2 className="sketch-heading text-center scribble-underline">
              📔 Dev Diary: Thoughts from the Code Cave
            </h2>
            <p className="sketch-text text-center max-w-3xl mx-auto text-lg">
              Welcome to my digital journal! This is where I share raw thoughts, 
              late-night coding revelations, and the occasional existential crisis 
              about semicolons. Grab some coffee and peek into my developer brain! ☕
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8 mt-12">
          {diaryEntries.map((entry, index) => (
            <ScrollReveal 
              key={entry.date} 
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.2}
            >
              <motion.div 
                className="torn-edge"
                whileHover={{ scale: 1.02, rotate: Math.random() * 2 - 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="sketch-card paper-texture">
                  {/* Entry Header */}
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div>
                      <div className="typewriter-text inline-block mb-2 text-sm">
                        {entry.date}
                      </div>
                      <h3 className="sketch-subheading">{entry.title}</h3>
                    </div>
                    <div className="sketch-tag !transform-none">
                      {entry.mood} ✏️
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="space-y-4">
                    {entry.content.split('\n\n').map((paragraph, pIndex) => (
                      <motion.p 
                        key={pIndex}
                        className="sketch-text text-base leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + pIndex * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t-2 border-dashed border-secondary/30">
                    {entry.tags.map((tag) => (
                      <motion.span 
                        key={tag} 
                        className="sketch-tag !text-xs"
                        whileHover={{ rotate: Math.random() * 10 - 5 }}
                      >
                        #{tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Decorative sketchy elements */}
                  <div className="absolute -top-2 -right-2 text-secondary opacity-30">
                    📎
                  </div>
                  <div className="absolute -bottom-1 -left-1 text-accent opacity-20 text-xs">
                    ♪♫
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal direction="scale" delay={0.3}>
          <div className="sticky-note max-w-lg mx-auto mt-12 text-center">
            <p className="sketch-text mb-4">
              Want to dive deeper into my thoughts or chat about code? 
              I love connecting with fellow developers and sharing stories! 
            </p>
            <motion.a 
              href="mailto:gudapranaynetha@gmail.com" 
              className="sketch-btn inline-block"
              whileHover={{ y: -3, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              💌 Let's Chat!
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}