"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-[--porcelain] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid md:grid-cols-3 gap-12 items-start">
        {/* Profile Image */}
        <motion.div
          className="md:col-span-1 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-36 h-36 md:w-44 md:h-44 bg-gray-300 rounded-full overflow-hidden shadow-xl ring-1 ring-white/50">
            <Image
              src="/png.jpeg"
              alt="Portrait of Pranay Netha Guda"
              className="w-full h-full object-cover"
              width={300}
              height={300}
              priority
            />
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          className="md:col-span-2 space-y-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
            I specialize in building robust, scalable backend systems and
            integrating them with clean, performant frontends. My focus is on
            creating high-impact solutions that drive efficiency and solve
            complex technical challenges.
          </p>

          {/* Certifications */}
          <div className="border-t border-[--soft-gold]/30 pt-10">
            <p className="text-sm font-medium text-gray-500 mb-6 tracking-wide uppercase">
              Certifications
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/40 backdrop-blur-sm px-5 py-2 rounded-full border border-white/60 shadow-sm text-gray-600 text-sm font-medium">
                AWS Certified Developer – Associate
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
