"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link"; // Added missing import

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Dynamic Background */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0 select-none"
      >
        <video
          src="/video.mp4"
          autoPlay
          loop
          playsInline
          muted
          className="object-cover w-full h-full opacity-50 scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Dispersed Layout Grid */}
      <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-end">
        
        {/* Center Section: Massive Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-difference">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, letterSpacing: "-0.05em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "-0.02em" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Custom bezier for "luxurious" feel
            className="text-[12vw] leading-none font-bold tracking-tighter text-white"
          >
            FAROUCHE
          </motion.h1>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="mt-4 text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400"
          >
             The Convergence
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ opacity }}
            className="flex flex-col md:flex-row justify-between items-end gap-8"
        >
          {/* Date & Time */}
          <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-neutral-400">
             <div className="w-20 h-[1px] bg-white/20 mb-2" />
             <p><span className="text-white">April 24</span> — Kickoff</p>
             <p><span className="text-white">June 02</span> — Finale</p>
          </div>

          {/* CTA */}
          <Link href="/events" className="group flex items-center gap-4 cursor-pointer">
             <span className="text-sm font-medium uppercase tracking-widest group-hover:text-neutral-400 transition-colors">
               Enter Experience
             </span>
             <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45" />
             </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
