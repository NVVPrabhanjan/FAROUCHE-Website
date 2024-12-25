'use client'
import { motion } from 'framer-motion';
import Navbar from '../components/NavBar';
import ScrollProgressBar from '../components/ScrollProgressBar';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MatchDetails() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    document.title = 'Match Details';

    async function fetchMatchDetails() {
      const res = await fetch('http://127.0.0.1:4000/api/v1/results/getResults');
      const data = await res.json();
      console.log(data);
      setMatches(data.data);
    }

    fetchMatchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Results
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights from recent matches
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          {matches.map((match, index) => (
            <motion.div
              key={match._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50"
            >
              <div className="flex items-center">
                <div className="w-1/2 pr-4">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-3">Match: {match.name}</h2>
                    <p className="text-gray-300 mb-6">
                      Teams: {match.teams.replace(/[\[\]]/g, '').replace(/,/g, ' vs ')}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-400">Winner: </span>
                        {match.win}
                      </div>
                      <div className="text-gray-300">
                        <span className="font-semibold text-purple-400">Man of the Match: </span>
                        {match.manofthematch}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-1/2 z-50 relative">
                  <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Image
                      src={match.image}
                      alt={match.name}
                      layout="fill"
                      className="object-cover opacity-50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
