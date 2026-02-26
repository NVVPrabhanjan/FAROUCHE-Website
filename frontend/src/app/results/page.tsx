"use client";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { useState, useEffect } from "react";
import { RESULTS_END_POINT } from "@/utils/constants";
import LoadingAnimation from "../components/LoadingAnimation";
import Link from "next/link";
import { Trophy, Medal, ArrowRight, Search } from "lucide-react";

export default function MatchDetails() {
  const [matchesByCategory, setMatchesByCategory] = useState<any>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [medalCounts, setMedalCounts] = useState({
    National: { gold: 0, silver: 0 },
    International: { gold: 0, silver: 0 }
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "FAROUCHE - Results Protocol";

    async function fetchMatchDetails() {
      try {
        const res = await fetch(`${RESULTS_END_POINT}/getResults`);
        const data = await res.json();


        const groupedMatches: any = {};
        data.data.forEach((match: { category: string; }) => {
          const category = match.category || "Uncategorized";
          if (!groupedMatches[category]) {
            groupedMatches[category] = [];
          }
          groupedMatches[category].push(match);
        });

        setMatchesByCategory(groupedMatches);
        setCategories(Object.keys(groupedMatches));


        const medals = {
          National: { gold: 0, silver: 0 },
          International: { gold: 0, silver: 0 }
        };

        data.data.forEach((match: any) => {
          if (match.matchType === "Finals") {
            if (match.winner && match.hostelType && medals[match.hostelType as keyof typeof medals]) {
              medals[match.hostelType as keyof typeof medals].gold += 1;
            }
            if (match.runner && match.runnerType && medals[match.runnerType as keyof typeof medals]) {
               medals[match.runnerType as keyof typeof medals].silver += 1;
            }
          }
        });

        setMedalCounts(medals);
      } catch {
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    }

    fetchMatchDetails();
  }, []);


  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <ScrollProgressBar />
      <AnimatePresence>
         {isLoading && <LoadingAnimation />}
      </AnimatePresence>

      {!isLoading && (
        <main className="pt-32 pb-20 px-6 container mx-auto">
            
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-white/10 pb-10">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4"
                    >

                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold font-cinzel uppercase tracking-tighter leading-none"
                    >
                        Championship<br/><span className="text-neutral-700">Results</span>
                    </motion.h1>
                </div>

                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 md:gap-8"
                >
                    <div className="bg-white/5 border border-white/10 p-6 w-32 md:w-48 text-center backdrop-blur-sm">
                        <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">National</span>
                        <div className="text-4xl md:text-6xl font-bold font-cinzel text-white">
                            {medalCounts.National.gold + medalCounts.National.silver}
                        </div>
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-purple-500 mt-2">Total Medals</span>
                    </div>
                     <div className="bg-white/5 border border-white/10 p-6 w-32 md:w-48 text-center backdrop-blur-sm">
                        <span className="block text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">International</span>
                        <div className="text-4xl md:text-6xl font-bold font-cinzel text-white">
                             {medalCounts.International.gold + medalCounts.International.silver}
                        </div>
                        <span className="block text-[10px] font-mono uppercase tracking-widest text-purple-500 mt-2">Total Medals</span>
                    </div>
                </motion.div>
            </div>

            
            <div className="mb-16 max-w-xl">
                 <div className="relative group">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="SEARCH CATEGORY PROTOCOL..."
                        className="w-full bg-transparent border-b border-white/20 py-4 pl-0 pr-10 text-xl font-mono uppercase tracking-widest text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" size={20} />
                </div>
            </div>

            
            {filteredCategories.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {filteredCategories.map((category, index) => (
                        <Link 
                            key={category} 
                            href={`/results/${encodeURIComponent(category)}`}
                            className="group block bg-black border border-white/10 p-8 md:p-12 hover:bg-neutral-900/50 transition-all duration-500 relative overflow-hidden"
                        >
                             <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                             
                             <div className="flex justify-between items-start mb-12">
                                 <span className="font-mono text-xs text-neutral-600 group-hover:text-purple-400 transition-colors">TYPE 0{index + 1}</span>
                                 <ArrowRight className="text-neutral-600 group-hover:text-white transform group-hover:-rotate-45 transition-all duration-500" size={20} />
                             </div>

                             <h2 className="text-3xl font-bold font-cinzel uppercase tracking-wide mb-4 text-neutral-200 group-hover:text-white transition-colors">
                                 {category}
                             </h2>
                             
                             <div className="flex items-end gap-2 text-neutral-500 font-mono text-xs uppercase tracking-widest">
                                 <span className="text-white text-lg">
                                     {matchesByCategory[category].length}
                                 </span>
                                 <span>Recorded Matches</span>
                             </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-white/10 border-dashed">
                    <p className="font-mono text-neutral-500 uppercase tracking-widest">No Category Found</p>
                </div>
            )}

        </main>
      )}
    </div>
  );
}