"use client";
import { motion } from "framer-motion";
import ScrollProgressBar from "../../components/ScrollProgressBar";
import { useState, useEffect } from "react";
import { RESULTS_END_POINT } from "@/utils/constants";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Trophy, Medal, Star } from "lucide-react";

// Types
interface Match {
  _id: string;
  name: string;
  teams: string;
  winner: string;
  runner?: string;
  matchType: string;
  hostelType: string;
  runnerType?: string;
  ManOftheMatch?: string;
  imageWinner?: string;
  imageRunner?: string;
  category: string;
}

export default function CategoryResults() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [finals, setFinals] = useState<Match | null>(null);
  const params = useParams();
  const category = params.category ? decodeURIComponent(params.category as string) : "";

  useEffect(() => {
    if (!category) return;
    document.title = `PROTOCOL: ${category.toUpperCase()}`;

    async function fetchCategoryMatches() {
      try {
        const res = await fetch(`${RESULTS_END_POINT}/getResults`);
        const data = await res.json();
        
        const categoryMatches: Match[] = data.data.filter(
          (match: Match) => (match.category || "Uncategorized") === category
        );

        setMatches(categoryMatches);
        
        // Isolate Final Match
        const finalMatch = categoryMatches.find(m => m.matchType === "Finals");
        if (finalMatch) setFinals(finalMatch);

      } catch (error) {
        console.error("Error fetching category matches:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    }

    fetchCategoryMatches();
  }, [category]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <ScrollProgressBar />

      {isLoading ? (
         <div className="h-screen flex items-center justify-center">
             <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Retrieving Protocol...</span>
             </div>
         </div>
      ) : (
        <main className="pt-36 pb-20 px-4 md:px-6 container mx-auto">
            
            {/* Minimal Header */}
            <div className="mb-12 border-b border-white/10 pb-6">
                <Link href="/results" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors mb-4 group">
                    <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </Link>
                <div className="flex justify-between items-end">
                    <h1 className="text-3xl md:text-4xl font-bold font-cinzel uppercase tracking-tighter leading-none">
                        {category}
                    </h1>
                     <span className="font-mono text-[10px] text-purple-500 uppercase tracking-widest">{matches.length} Records</span>
                </div>
            </div>

            {/* Finals - Single Unified Box */}
            {finals && (
                <motion.section 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 max-w-4xl mx-auto"
                >
                    <div className="bg-neutral-900/30 border border-white/10 rounded-lg overflow-hidden">
                        {/* Header of Box */}
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Trophy size={14} className="text-purple-400" />
                                <span className="font-mono text-[10px] uppercase tracking-widest text-white">Championship Result</span>
                            </div>
                            <span className="font-cinzel text-xs text-neutral-400">Finals Protocol</span>
                        </div>

                        {/* Content Grid */}
                        <div className="grid md:grid-cols-2 gap-px bg-white/5">
                            {/* Winner Side */}
                            <div className="bg-black p-6 flex flex-col items-center text-center">
                                <span className="inline-block px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] font-mono uppercase tracking-widest mb-4">
                                    Gold Medalist
                                </span>
                                <h3 className="text-2xl font-bold font-cinzel text-white mb-1">{finals.winner}</h3>
                                <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-6">{finals.hostelType} Hostel</p>
                                
                                {finals.imageWinner && (
                                    <div className="w-full aspect-[4/3] relative rounded overflow-hidden border border-white/10">
                                        <img 
                                            src={finals.imageWinner} 
                                            alt="Winner" 
                                            className="w-full h-full object-cover" // User asked for visible fully, but object-contain might be too small if aspect ratio varies. Defaulting to cover but in a controlled aspect ratio box.
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Runner Side */}
                            <div className="bg-black p-6 flex flex-col items-center text-center">
                                <span className="inline-block px-2 py-0.5 bg-neutral-500/10 border border-neutral-500/20 text-neutral-400 text-[9px] font-mono uppercase tracking-widest mb-4">
                                    Silver Medalist
                                </span>
                                <h3 className="text-2xl font-bold font-cinzel text-neutral-400 mb-1">{finals.runner}</h3>
                                <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest mb-6">{finals.runnerType} Hostel</p>

                                {finals.imageRunner && (
                                    <div className="w-full aspect-[4/3] relative rounded overflow-hidden border border-white/10">
                                        <img 
                                            src={finals.imageRunner} 
                                            alt="Runner" 
                                            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Match Manifest - Simplified List */}
            <section className="max-w-4xl mx-auto">
                 <div className="flex items-center gap-2 mb-4">
                    <Star size={12} className="text-neutral-600" />
                    <h2 className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Match Manifest</h2>
                </div>

                <div className="flex flex-col gap-px bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    {matches.map((match, idx) => (
                        <div 
                            key={match._id}
                            className="bg-black p-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group hover:bg-white/5 transition-colors"
                        >
                            <span className="font-mono text-[10px] text-neutral-700 w-8">0{idx + 1}</span>
                            
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-neutral-300 group-hover:text-purple-400 transition-colors uppercase">{match.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] text-neutral-600 font-mono uppercase border border-white/10 px-1 rounded">{match.matchType}</span>
                                    <span className="text-[9px] text-neutral-500 font-mono uppercase">{match.teams}</span>
                                </div>
                            </div>

                            <div className="text-right pl-4 border-l border-white/10 md:border-none md:pl-0">
                                <span className="block text-[10px] font-mono text-purple-900 uppercase tracking-widest mb-0.5">Winner</span>
                                <span className="block text-xs font-bold text-white uppercase">{match.winner}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {matches.length === 0 && (
                     <div className="py-12 text-center border border-white/10 border-dashed rounded mt-4">
                        <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">No Matches Recorded</p>
                    </div>
                )}
            </section>

        </main>
      )}
    </div>
  );
}