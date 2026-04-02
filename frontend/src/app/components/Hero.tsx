"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

/* ─── floating gold particle ─── */
const Particle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      bottom: "-10%",
      background: `radial-gradient(circle, rgba(161,161,170,${0.25 + Math.random() * 0.35}) 0%, transparent 70%)`,
    }}
    animate={{
      y: [0, -window.innerHeight * 1.2],
      x: [0, (Math.random() - 0.5) * 120],
      opacity: [0, 0.8, 0.6, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

/* ─── staggered letter reveal ─── */
const title = "FAROUCHE";
const letterVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const ringRotate = useTransform(scrollY, [0, 800], [0, 45]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* generate particles only on client */
  const particles = mounted
    ? Array.from({ length: 18 }, (_, i) => ({
      id: i,
      delay: i * 0.8 + Math.random() * 2,
      size: 3 + Math.random() * 6,
      left: `${5 + Math.random() * 90}%`,
      duration: 8 + Math.random() * 6,
    }))
    : [];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* ── video bg ── */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 select-none">
        <video
          src="/video.mp4"
          autoPlay
          loop
          playsInline
          muted
          className="object-cover w-full h-full opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-zinc-950/10 mix-blend-multiply" />
      </motion.div>

      {/* ── floating particles ── */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* ── heritage ring / emblem ── */}
      <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ rotate: ringRotate }}
          className="relative"
        >
          {/* outer ring */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full border border-zinc-500/10"
          />
          {/* inner ring */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-4 md:inset-8 rounded-full border border-zinc-500/[0.07]"
          />
          {/* dashed detail ring */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-10 md:inset-16 rounded-full border border-dashed border-zinc-500/[0.05]"
          />
          {/* center golden dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-500/40"
          />
          {/* cardinal markers */}
          {[0, 90, 180, 270].map((deg) => (
            <motion.div
              key={deg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + deg * 0.002 }}
              className="absolute top-1/2 left-1/2 w-3 h-[1px] bg-zinc-500/20"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(min(27.5vw, 300px))`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* ── yugdhara watermark ── */}
      <div className="absolute inset-0 z-[7] flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.025, scale: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-[22vw] font-bold font-cinzel tracking-[0.15em] text-white whitespace-nowrap select-none"
        >

          {/* YUGDHARA */}
        </motion.span>
      </div>

      {/* ── main content ── */}
      <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-end">

        {/* center title block */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
          {/* staggered title */}
          <div className="flex justify-center items-center overflow-hidden perspective-[800px]">
            {title.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={letterVariants}
                className="text-[12vw] leading-none font-bold tracking-tighter inline-block"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(161,161,170,0.7) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* gold separator line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"
          />

          {/* subtitle */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-5 text-xs md:text-sm uppercase tracking-[0.3em] text-neutral-400"
          >
            <span className="text-zinc-400/90 font-medium">Yugdhara</span> — The Flow of Generations
          </motion.div> */}

          {/* tagline */}
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-3 text-[10px] md:text-xs font-mono text-neutral-600 tracking-widest uppercase"
          >
            Legacy · Culture · Continuity
          </motion.p> */}
        </div>

        {/* bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          style={{ opacity }}
          className="flex flex-col md:flex-row justify-between items-end gap-8"
        >
          {/* dates */}
          <div className="flex flex-col gap-2 font-mono text-xs md:text-sm text-neutral-400">
            <div className="w-20 h-[1px] bg-zinc-500/30 mb-2" />
            <p><span className="text-zinc-400">March 27</span> — Kickoff</p>
            <p><span className="text-zinc-400">May 02</span> — Finale</p>
          </div>

          {/* CTA */}
          <Link href="/events" className="group flex items-center gap-4 cursor-pointer">
            <span className="text-sm font-medium uppercase tracking-widest group-hover:text-zinc-400 transition-colors duration-300">
              Enter Experience
            </span>
            <div className="relative w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-zinc-500 group-hover:text-black group-hover:border-zinc-500 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_25px_rgba(161,161,170,0.4)]" />
              <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45 relative z-10" />
            </div>
          </Link>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{ opacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-500/50" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
