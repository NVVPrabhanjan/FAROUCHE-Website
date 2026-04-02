"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ArrowRight, User } from "lucide-react";
import { HostelGroup, Leader } from "@/types/home";

interface HostelLeadershipSectionProps {
  hostelLeadership: HostelGroup[];
}

interface LeadershipCardProps {
  leader: Leader;
  onClick: () => void;
  index: number;
}

const LeadershipCard = ({ leader, onClick, index }: LeadershipCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className="group bg-[#111] border border-[#1e1e1e] rounded-sm overflow-hidden cursor-pointer hover:border-[#444] hover:-translate-y-1 transition-all duration-200"
    >
      {/* Rectangular 3:4 portrait image */}
      <div
        className="w-full overflow-hidden bg-[#1a1a1a] relative"
        style={{ aspectRatio: "3/4" }}
      >
        {leader.image ? (
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-[#333] font-bold text-center">
            {leader.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 pb-4">
        <p className="text-[#f0f0f0] text-sm font-medium leading-snug mb-1 text-center">
          {leader.name}
        </p>
        <p className="text-[#555] text-[11px] uppercase tracking-wider text-center">
          {leader.role}
        </p>
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
      <div className="sticky top-0 z-50 flex justify-between items-center p-6 md:p-10 bg-black/50 backdrop-blur-md">
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
        {/* Portrait image */}
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
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-700">
              <User size={64} />
            </div>
          )}
        </motion.div>

        {/* Details */}
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
            <p className="text-zinc-400 text-xl font-mono uppercase tracking-widest">
              {leader.role}
            </p>
          </div>

          <div className="w-20 h-1 bg-white/20" />

          {leader.description && (
            <div className="prose prose-invert prose-lg text-neutral-400">
              <p>{leader.description}</p>
            </div>
          )}

          {leader.achievements && leader.achievements.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/50">
                Recognition
              </h3>
              <ul className="space-y-2">
                {leader.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-300">
                    <ArrowRight className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {leader.contact && (
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1">
                Contact
              </p>
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
          {/* Section heading */}
          <div className="mb-24 text-center">
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase mb-6">
              Leadership
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Guiding the vision and ensuring excellence across all faculties.
            </p>
          </div>

          {/* Groups */}
          <div className="space-y-32">
            {hostelLeadership.map((group) => (
              <div key={group.title}>
                {/* Group header */}
                <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
                    {group.title}
                  </h3>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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