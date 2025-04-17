import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
      <div className="flex flex-col items-center">
        {/* Subtle background effects that don't compete with the logo */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-amber-900/20 via-yellow-800/15 to-amber-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-gradient-radial from-yellow-800/20 to-transparent rounded-full blur-2xl"></div>
        
        <motion.div className="relative">
          {/* Reduced particle effects to not distract from the logo */}
          <motion.div
            className="absolute -inset-10"
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${i * 30}deg) translateY(-${24 + (i % 3) * 5}px)`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                <div 
                  className={`rounded-full bg-gradient-to-r ${i % 3 === 0 ? 'from-amber-300 to-yellow-500' : i % 3 === 1 ? 'from-yellow-500 to-amber-400' : 'from-amber-200 to-yellow-400'}`}
                  style={{
                    width: `${(i % 3 + 1) * 1.5}px`,
                    height: `${(i % 3 + 1) * 1.5}px`,
                    boxShadow: `0 0 5px ${i % 3 === 0 ? 'rgba(245, 158, 11, 0.6)' : i % 3 === 1 ? 'rgba(252, 211, 77, 0.6)' : 'rgba(251, 191, 36, 0.6)'}`,
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced prominent logo container - INCREASED SIZE */}
          <motion.div
            className="relative z-10 mx-auto"
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          >
            {/* Dark background circle to create contrast for the gold logo - LARGER CIRCLE */}
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shadow-xl">
              {/* Gold rim glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/50 to-yellow-500/50 blur-md"></div>
              
              {/* Inner darker area for better contrast */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {/* Gold lighting accent */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-70"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(252, 211, 77, 0.15), transparent 60%)',
                      'radial-gradient(circle at 70% 70%, rgba(245, 158, 11, 0.15), transparent 60%)',
                      'radial-gradient(circle at 30% 30%, rgba(252, 211, 77, 0.15), transparent 60%)'
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                
                {/* Gold directional lighting to enhance the gold logo */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent rounded-full"></div>
                
                {/* Centralized and LARGER logo container relative to the circle */}
                <div className="relative flex items-center justify-center w-full h-full p-2">
                  {/* Dynamic gold highlight behind logo */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        'inset 0 0 12px rgba(252, 211, 77, 0.3)',
                        'inset 0 0 20px rgba(252, 211, 77, 0.5)',
                        'inset 0 0 12px rgba(252, 211, 77, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  {/* ENLARGED Logo with optimized sizing and enhanced visibility */}
                  <Image
                    src="/logo1.png"
                    alt="Gold Logo"
                    width={160}
                    height={112}
                    className="relative z-10 drop-shadow-[0_0_8px_rgba(252,211,77,0.7)]"
                    priority
                    style={{ 
                      objectFit: "contain",
                      filter: "brightness(1.3) contrast(1.2)",
                      transform: "scale(1.3)" // Additional scaling to make logo larger relative to circle
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Gold accent rings - adjusted for larger center */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{
                scale: [0, 2.5, 0],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: i === 0 ? 4 : i === 1 ? 5 : 6,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            >
              <div 
                className="rounded-full -ml-16 -mt-16"
                style={{
                  width: "32px",
                  height: "32px",
                  border: `2px solid ${i === 0 ? '#f59e0b' : i === 1 ? '#fbbf24' : '#fcd34d'}`,
                  boxShadow: `0 0 20px ${i === 0 ? 'rgba(245, 158, 11, 0.6)' : i === 1 ? 'rgba(251, 191, 36, 0.6)' : 'rgba(252, 211, 77, 0.6)'}`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gold text branding with Festivr Roman font */}
        <motion.div
          className="mt-10 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h3
            className="text-5xl font-bold relative z-10 tracking-wider"
            animate={{ 
              backgroundPosition: ["0% center", "100% center", "0% center"] 
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              fontFamily: "Cinzel",
              backgroundSize: "300% auto",
              backgroundImage: "linear-gradient(to right, #f59e0b, #fcd34d, #d97706, #fbbf24, #f59e0b)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            FAROUCHE
          </motion.h3>
          
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 rounded-lg blur-xl -z-10"></div>
        </motion.div>
        
        {/* Gold-themed loading indicator */}
        <div className="flex items-center mt-5">
          <motion.span 
            className="mr-3 text-sm font-medium tracking-wider text-amber-200"
          >
            Loading Experience
          </motion.span>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  y: [0, -4, 0],
                  scale: [0.8, 1.2, 0.8],
                  boxShadow: [
                    '0 0 2px rgba(245, 158, 11, 0.5)',
                    '0 0 8px rgba(245, 158, 11, 0.8)',
                    '0 0 2px rgba(245, 158, 11, 0.5)'
                  ]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
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