"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Committee, ImageData } from "@/types/home";

interface CommitteesSectionProps {
    committees: Committee[];
    fontClassName?: string;
}

const CommitteeCard = ({ 
  committee, 
  onClick, 
  index 
}: { 
  committee: Committee; 
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
      className="group relative w-full h-[300px] border-r border-b border-white/10 bg-black cursor-pointer overflow-hidden flex flex-col justify-between p-8 hover:bg-neutral-900/50 transition-colors duration-500"
    >
       
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

       
       <div className="flex justify-between items-start">
          <span className="text-xs font-mono text-neutral-500 group-hover:text-purple-400 transition-colors">
            {String(committee.students).padStart(2, '0')} MEMBERS
          </span>
          <ArrowRight className="w-5 h-5 text-neutral-600 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all duration-500" />
       </div>

       
       <div>
         <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
            {committee.name}
         </h3>
         <p className="text-sm text-neutral-500 max-w-sm line-clamp-2 group-hover:text-neutral-400 transition-colors duration-500">
            {committee.description}
         </p>
       </div>
    </motion.div>
  );
};


const CommitteeModal = ({ committee, onClose }: { committee: Committee; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
        >
            
            <div className="sticky top-0 z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference">
                <h2 className="text-sm font-mono uppercase tracking-widest opacity-70">
                   Committee / {committee.name}
                </h2>
                <button 
                  onClick={onClose}
                  className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                    <span>Close</span>
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="container mx-auto px-4 md:px-10 pb-20 pt-10">
                
                <motion.div 
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8 }}
                   className="mb-20 border-b border-white/10 pb-10"
                >
                    <h1 className="text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase mb-8">
                        {committee.name}
                    </h1>
                    <div className="flex flex-col md:flex-row gap-10 md:items-end justify-between">
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
                            {committee.description}
                        </p>
                        <div className="font-mono text-sm text-neutral-500">
                            {String(committee.students).padStart(2, '0')} — Core Members
                        </div>
                    </div>
                </motion.div>

                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {committee.images.map((image, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, scale: 0.9 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.5, delay: idx * 0.05 }}
                           className="group space-y-3"
                        >
                            <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden rounded-sm">
                                <Image
                                    src={image.src}
                                    alt={image.caption}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-medium leading-none">{image.caption}</p>
                                {image.role && (
                                    <p className="text-xs uppercase tracking-widest text-neutral-500">{image.role}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default function CommitteesSection({ committees }: CommitteesSectionProps) {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);


  
  return (
    <>
      <section className="bg-black py-32" id="committees">
         <div className="container mx-auto px-4">
            
            
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 gap-6">
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-none">
                    The<br/>Teams
                </h2>
                <p className="text-neutral-400 max-w-md text-sm md:text-base leading-relaxed text-right md:text-left">
                    Behind every great event is a relentless team. 
                    Explore the groups powering Farouche 2025.
                </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
                {committees.map((committee, idx) => (
                    <CommitteeCard 
                        key={committee.name} 
                        committee={committee} 
                        index={idx}
                        onClick={() => setSelectedCommittee(committee)}
                    />
                ))}
            </div>
         </div>
      </section>

      <AnimatePresence>
        {selectedCommittee && (
            <CommitteeModal 
                committee={selectedCommittee} 
                onClose={() => setSelectedCommittee(null)} 
            />
        )}
      </AnimatePresence>
    </>
  );
}
