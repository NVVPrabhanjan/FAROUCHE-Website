import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        {/* Improved background effects with multiple layers */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 via-fuchsia-500/10 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-gradient-radial from-indigo-500/15 to-transparent rounded-full blur-2xl"></div>
        
        <motion.div className="relative">
          {/* Enhanced particle ring with more particles and varied sizes */}
          <motion.div
            className="absolute -inset-12"
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 20}deg) translateY(-${28 + (i % 3) * 6}px)`,
                }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className={`rounded-full bg-gradient-to-r ${i % 3 === 0 ? 'from-purple-400 to-pink-500' : i % 3 === 1 ? 'from-indigo-500 to-purple-400' : 'from-pink-500 to-rose-400'}`}
                  style={{
                    width: `${(i % 3 + 1) * 2}px`,
                    height: `${(i % 3 + 1) * 2}px`,
                    boxShadow: `0 0 6px ${i % 3 === 0 ? 'rgba(168, 85, 247, 0.7)' : i % 3 === 1 ? 'rgba(99, 102, 241, 0.7)' : 'rgba(236, 72, 153, 0.7)'}`,
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Outer spinning orbit */}
          <motion.div
            className="absolute -inset-16"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 60}deg) translateY(-48px)`,
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                <div className="w-1 h-1 rounded-full bg-indigo-300"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Improved animated circles with varying colors and timing */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{
                scale: [0, 2.2, 0],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: i % 2 === 0 ? 3.5 : 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            >
              <div 
                className="rounded-full -ml-10 -mt-10"
                style={{
                  width: `${i % 2 === 0 ? '20px' : '24px'}`,
                  height: `${i % 2 === 0 ? '20px' : '24px'}`,
                  border: `2px solid ${i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#818cf8' : '#ec4899'}`,
                  boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(168, 85, 247, 0.6)' : i % 3 === 1 ? 'rgba(129, 140, 248, 0.6)' : 'rgba(236, 72, 153, 0.6)'}`,
                }}
              />
            </motion.div>
          ))}
          
          {/* Enhanced pulsing logo with better animation */}
          <motion.div
            className="relative z-10 mx-auto"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              rotate: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          >
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
              {/* Inner glow */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm"></div>
              
              <div className="text-center relative">
                <span className="font-bold text-white text-lg tracking-wide">Farouche</span>
                <div className="text-xs text-white/90 font-semibold mt-0.5">2025</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced animated text with shimmer effect */}
        <motion.div
          className="mt-12 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h3
            className="text-4xl font-bold relative z-10 tracking-wider"
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: "200% auto",
              backgroundImage: "linear-gradient(to right, #a855f7, #ec4899, #818cf8, #a855f7)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            FAROUCHE
          </motion.h3>
          
          {/* Enhanced glow behind text */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/15 to-pink-500/10 rounded-lg blur-xl -z-10"></div>
        </motion.div>
        
        {/* Improved loading indicator with fading dots */}
        <div className="flex items-center mt-6 text-gray-300">
          <span className="mr-2 text-sm font-medium tracking-wide">Loading Experience</span>
          <div className="flex space-x-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -5, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;