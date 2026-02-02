"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import LoadingAnimation from "../components/LoadingAnimation";

// Define Types
interface GalleryImage {
  imageUrl: string;
  event?: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Hardcoded events list for filter - keeping original list
  const events = ["All", "Inaguration", "Food Fiesta - 3rd Year","Chiguru", "Food Fiesta - IH", "Food Fiesta - 1 & 2nd Year"];

  useEffect(() => {
    document.title = "FAROUCHE - Visual Archive";

    const fetchImages = async () => {
      try {
        const res = await fetch("https://farouche25.tech/api/v1/gallery/"); // Using direct URL as in previous file
        const data = await res.json();
        setImages(data.images || []);
      } catch (error) {
        console.error("Failed to load archive:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchImages();
  }, []);

  // Filter Logic
  const filteredImages = selectedEvent === "All" 
    ? images 
    : images.filter(img => img.event === selectedEvent);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <ScrollProgressBar />

      {/* Loading State */}
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      {!loading && (
        <main className="pt-32 pb-20 px-6 container mx-auto">
            
             {/* Header Section */}
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-white/10 pb-10">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4"
                    >
                        // Captured Moments
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold font-cinzel uppercase tracking-tighter leading-none"
                    >
                        Visual<br/><span className="text-neutral-700">Archive</span>
                    </motion.h1>
                </div>

                {/* Filter System */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 md:gap-4 max-w-xl justify-start md:justify-end"
                >
                    {events.map((event) => (
                        <button
                            key={event}
                            onClick={() => setSelectedEvent(event)}
                            className={`px-4 py-2 border text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                                selectedEvent === event 
                                    ? "bg-white text-black border-white" 
                                    : "bg-transparent text-neutral-500 border-white/10 hover:border-purple-500 hover:text-purple-500"
                            }`}
                        >
                            {event}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.length > 0 ? (
                    filteredImages.map((img, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`image-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setLightboxImage(img)}
                            className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-white/5 border border-white/10"
                        >
                            <Image 
                                src={img.imageUrl} 
                                alt={img.event || "Event Image"}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="p-4 border border-white/20 rounded-full bg-black/50 backdrop-blur-sm">
                                    <ZoomIn className="text-white" size={24} />
                                </div>
                            </div>

                            {/* Caption Tag */}
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-xs font-mono uppercase tracking-widest text-white">
                                    {img.event || "Farouche 2025"}
                                </span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border border-white/10 border-dashed">
                        <p className="font-mono text-neutral-500 uppercase tracking-widest">No Visuals Found</p>
                    </div>
                )}
            </div>

        </main>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                onClick={() => setLightboxImage(null)}
            >
                {/* Close Button */}
                <button 
                    className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                >
                    <X size={32} />
                </button>

                {/* Content */}
                <div 
                    className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center" 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-[70vh] md:h-[80vh]">
                        <Image 
                            src={lightboxImage.imageUrl} 
                            alt={lightboxImage.event || "Gallery Content"}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="font-cinzel text-xl text-white uppercase tracking-wider">
                            {lightboxImage.event || "Farouche Archive"}
                        </p>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}