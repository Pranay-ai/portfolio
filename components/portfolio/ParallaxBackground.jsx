"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Sketchy Elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-10"
        style={{ y: y1, rotate }}
      >
        <div className="text-6xl text-secondary">⚡</div>
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20 opacity-10"
        style={{ y: y2, scale }}
      >
        <div className="text-4xl text-primary">🎨</div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-20 opacity-10"
        style={{ y: y1, rotate: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
      >
        <div className="text-5xl text-accent">💫</div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 opacity-10"
        style={{ y: y2 }}
      >
        <div className="text-3xl text-secondary">🌟</div>
      </motion.div>
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-60 left-1/3 opacity-5"
        style={{ y: y1, rotate }}
      >
        <div className="w-20 h-20 border-4 border-primary rounded-lg transform rotate-45"></div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-60 right-1/3 opacity-5"
        style={{ y: y2, scale }}
      >
        <div className="w-16 h-16 bg-secondary rounded-full"></div>
      </motion.div>
    </div>
  );
}