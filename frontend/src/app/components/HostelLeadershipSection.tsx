"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ArrowRight, User } from "lucide-react";
import { HostelGroup, Leader } from "@/types/home";

interface HostelLeadershipSectionProps {
  hostelLeadership: HostelGroup[];
}

const LeadershipCard = ({
  leader,
  onClick,
  index,
}: {
  leader: Leader;
  onClick: () => void;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative w-full h-[250px] rounded-xl border border-white/10 bg-neutral-900 cursor-pointer overflow-hidden hover:border-purple-500/50 transition-colors duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
         {leader.image ? (
            <Image
                src={leader.image}
                alt={leader.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
         ) : (
             <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                <User size={32} className="text-neutral-600" />
             </div>
         )}
      </div>

       {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      {/* Content Container */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
          {/* Top: Role */}
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-neutral-300 uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
              {leader.role}
            </span>
             <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-3 h-3 text-white -rotate-45" />
             </div>
          </div>

          {/* Bottom: Name */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 uppercase tracking-tighter leading-none">
              {leader.name}
            </h3>
            {leader.description && (
                <p className="text-[10px] text-neutral-400 max-w-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                {leader.description}
                </p>
            )}
          </div>
      </div>
    </motion.div>
  );
};

const MemberModal = ({
  leader,
  onClose,
}: {
  leader: Leader;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference bg-black/50 backdrop-blur-md">
        <h2 className="text-sm font-mono uppercase tracking-widest opacity-70">
          Profile / {leader.role}
        </h2>
        <button
          onClick={onClose}
          className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-500 transition-colors"
        >
          <span>Close</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="container mx-auto px-4 md:px-10 pb-20 pt-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 lg:w-1/3 max-w-md aspect-[3/4] relative bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
        >
            {leader.image ? (
                <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">
                    <User size={64} />
                </div>
            )}
        </motion.div>

        {/* Info Section */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 lg:w-2/3 space-y-8"
        >
            <div>
                 <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2">
                    {leader.name}
                 </h1>
                 <p className="text-purple-400 text-xl font-mono uppercase tracking-widest">{leader.role}</p>
            </div>

            <div className="w-20 h-1 bg-white/20" />

            {leader.description && (
                <div className="prose prose-invert prose-lg text-neutral-400">
                    <p>{leader.description}</p>
                </div>
            )}

            {leader.achievements && leader.achievements.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-white/50">Recogntion</h3>
                    <ul className="space-y-2">
                        {leader.achievements.map((achievement, idx) => (
                             <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                <ArrowRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                             </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {leader.contact && (
                 <div className="pt-8 border-t border-white/10">
                     <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">Contact</p>
                     <p className="text-white text-lg">{leader.contact}</p>
                 </div>
            )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function HostelLeadershipSection({
  hostelLeadership,
}: HostelLeadershipSectionProps) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <>
      <section className="bg-black py-32" id="leadership">
        <div className="container mx-auto px-4">
            
          {/* Header */}
          <div className="mb-24 text-center">
             <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase mb-6">
                Leadership
             </h2>
             <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                Guiding the vision and ensuring excellence across all faculties.
             </p>
          </div>

          <div className="space-y-32">
            {hostelLeadership.map((group, groupIdx) => (
              <div key={group.title}>
                {/* Group Title */}
                <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                        {group.title}
                    </h3>
                    <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1.5 hidden md:block">
                        // {group.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.members.map((member, idx) => (
                    <LeadershipCard
                      key={member.name}
                      leader={member}
                      index={idx}
                      onClick={() => setSelectedLeader(member)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedLeader && (
          <MemberModal
            leader={selectedLeader}
            onClose={() => setSelectedLeader(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
