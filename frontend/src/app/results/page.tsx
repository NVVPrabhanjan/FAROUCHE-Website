"use client";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { useState, useEffect } from "react";
import { RESULTS_END_POINT } from "@/utils/constants";
import LoadingAnimation from "../components/LoadingAnimation";
import Link from "next/link";

export default function MatchDetails() {
  const [matchesByCategory, setMatchesByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [medalCounts, setMedalCounts] = useState({
    National: { gold: 0, silver: 0 },
    International: { gold: 0, silver: 0 }
  });

  useEffect(() => {
    document.title = "Match Details";

    async function fetchMatchDetails() {
      try {
        const res = await fetch(`${RESULTS_END_POINT}/getResults`);
        const data = await res.json();

        // Group matches by category
        const groupedMatches = {};
        data.data.forEach((match: { category: string; }) => {
          const category = match.category || "Uncategorized";
          if (!groupedMatches[category]) {
            groupedMatches[category] = [];
          }
          groupedMatches[category].push(match);
        });

        setMatchesByCategory(groupedMatches);
        setCategories(Object.keys(groupedMatches));

        // Calculate medal counts for Finals matches only
        const medals = {
          National: { gold: 0, silver: 0 },
          International: { gold: 0, silver: 0 }
        };

        data.data.forEach((match) => {
          if (match.matchType === "Finals") {
            // Count gold (winner) medals
            if (match.winner && match.hostelType) {
              medals[match.hostelType].gold += 1;
            }
            
            // Count silver (runner-up) medals based on runnerType
            if (match.runner && match.runnerType) {
              medals[match.runnerType].silver += 1;
            }
          }
        });

        setMedalCounts(medals);
      } catch (error) {
        console.error("Error fetching match details:", error);
      } finally {
        // Set a minimum loading time for a better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }

    fetchMatchDetails();
  }, []);

  // Animation variants
  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const medalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar />
      {isLoading && <LoadingAnimation />}
      <div className="relative min-h-[45vh] pt-16 md:pt-20 flex items-center justify-center bg-gradient-to-b from-purple-900/60 to-black text-white">
        {!isLoading && (
          <>
            <div className="container mx-auto px-4 py-12 md:py-20">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10 md:mb-16"
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Match Results
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  Celebrating victories and outstanding performances
                </p>

                {/* Medal Counts Section */}
                <motion.div 
                  variants={medalVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-12 grid gap-6 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                >
                  {/* National Medals */}
                  <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-6 border border-blue-800/30 shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">National Hostel</h3>
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="inline-block p-3 bg-yellow-500 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-3xl font-bold text-yellow-400">{medalCounts.National.gold}</p>
                        <p className="text-sm text-gray-300">Gold</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-block p-3 bg-gray-400 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-3xl font-bold text-gray-300">{medalCounts.National.silver}</p>
                        <p className="text-sm text-gray-300">Silver</p>
                      </div>
                    </div>
                  </div>

                  {/* International Medals */}
                  <div className="bg-gradient-to-br from-pink-900/40 to-red-900/40 rounded-xl p-6 border border-pink-800/30 shadow-lg">
                    <h3 className="text-2xl font-bold text-pink-300 mb-4">International Hostel</h3>
                    <div className="flex justify-around items-center">
                      <div className="text-center">
                        <div className="inline-block p-3 bg-yellow-500 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-900" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-3xl font-bold text-yellow-400">{medalCounts.International.gold}</p>
                        <p className="text-sm text-gray-300">Gold</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-block p-3 bg-gray-400 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-3xl font-bold text-gray-300">{medalCounts.International.silver}</p>
                        <p className="text-sm text-gray-300">Silver</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {categories.length > 0 ? (
                <motion.div
                  variants={categoryVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/results/${encodeURIComponent(category)}`}
                      className="block"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl overflow-hidden border border-purple-800/30 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/30 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
                      >
                        <div className="p-6 md:p-8">
                          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
                            {category}
                          </h2>

                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                              {matchesByCategory[category].length}{" "}
                              {matchesByCategory[category].length === 1
                                ? "Match"
                                : "Matches"}
                            </span>

                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-700/50">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 md:py-16">
                  <p className="text-xl text-gray-400">
                    No match results available yet
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}