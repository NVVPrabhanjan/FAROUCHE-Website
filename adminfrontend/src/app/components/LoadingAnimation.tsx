import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

      <div className="flex flex-col items-center relative z-10">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
           className="relative"
        >
            {/* Central Monolith */}
            <motion.div
                className="w-24 h-24 border border-purple-500/30 bg-purple-900/10 backdrop-blur-sm relative"
                animate={{
                    boxShadow: ["0 0 20px rgba(168,85,247,0.1)", "0 0 40px rgba(168,85,247,0.3)", "0 0 20px rgba(168,85,247,0.1)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {/* Inner Scanning Line */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent h-1/2 w-full"
                    animate={{ top: ["-50%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
            </motion.div>
        </motion.div>

        {/* Text */}
        <div className="mt-8 text-center space-y-2 overflow-hidden">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-purple-500 text-xs tracking-[0.3em] uppercase"
            >
                Initializing Admin Protocol
            </motion.div>

            <motion.div 
                 className="flex gap-1 justify-center mt-2"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 h-1 bg-white/50"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
