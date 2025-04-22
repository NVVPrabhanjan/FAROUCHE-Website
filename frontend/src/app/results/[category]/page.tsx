'use client'
import { motion } from 'framer-motion';
import Navbar from '../../components/NavBar';
import ScrollProgressBar from '../../components/ScrollProgressBar';
import { useState, useEffect } from 'react';
import { RESULTS_END_POINT } from '@/utils/constants';
import LoadingAnimation from "../../components/LoadingAnimation";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CategoryResults() {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const category = params.category ? decodeURIComponent(params.category) : '';

  useEffect(() => {
    if (!category) return;
    
    document.title = `${category} Matches`;

    async function fetchCategoryMatches() {
      try {
        const res = await fetch(`${RESULTS_END_POINT}/getResults`);
        const data = await res.json();
        
        // Filter matches by category
        const categoryMatches = data.data.filter(match => 
          (match.category || 'Uncategorized') === category
        );
        
        setMatches(categoryMatches);
      } catch (error) {
        console.error("Error fetching category matches:", error);
      } finally {
        // Set a minimum loading time for a better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }

    fetchCategoryMatches();
  }, [category]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      {isLoading && <LoadingAnimation />}
      
      {!isLoading && (
        <>
          <ScrollProgressBar />
          <Navbar />
          
          <div className="container mx-auto px-4 py-12 md:py-20 pt-16 md:pt-20">
            <div className="flex items-center mb-8">
              <Link 
                href="/results"
                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Categories
              </Link>
            </div>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10 md:mb-16"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {category} Matches
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-gray-300">
                Explore all matches in the {category} category
              </p>
            </motion.section>

            {matches.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2"
              >
                {matches.map((match) => (
                  <motion.div
                    key={match._id}
                    variants={itemVariants}
                    className="rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-b from-purple-900/30 to-black/90 border border-purple-800/30"
                  >
                    {/* Match card content */}
                    <div className="flex flex-col md:flex-row">
                      {/* Content section - Full width on mobile, left side on desktop */}
                      <div className="p-4 sm:p-6 md:w-3/5">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                          {match.name}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl font-bold text-gray-300 mb-4">
                          {match.teams.replace(/[\[\]]/g, '').replace(/,/g, ' vs ')}
                        </p>
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex items-center gap-3 p-3 bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                            <div className="flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                            <div>
                              <span className="block text-xs md:text-sm text-purple-300">Winner</span>
                              <span className="font-semibold">{match.win}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 bg-pink-900/20 rounded-lg border-l-4 border-pink-500">
                            <div className="flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div>
                              <span className="block text-xs md:text-sm text-pink-300">Man of the Match</span>
                              <span className="font-semibold">{match.manofthematch}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image container - Uses aspect ratio to maintain image dimensions */}
                      <div className="md:w-2/5 order-first md:order-last">
                        {match.image ? (
                          <div className="w-full h-60 sm:h-72 md:h-full">
                            <img
                              src={match.image}
                              alt={match.name}
                              className="w-full h-full object-cover"
                              style={{ aspectRatio: "1/1", objectFit: "cover" }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-60 sm:h-72 md:h-full flex items-center justify-center bg-purple-900/50">
                            <span className="text-purple-300">No image available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 md:py-16 bg-purple-900/20 rounded-xl border border-purple-800/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-400">No matches found in this category</p>
                <Link
                  href="/results"
                  className="inline-block mt-6 px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-white transition-colors"
                >
                  Return to Categories
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}