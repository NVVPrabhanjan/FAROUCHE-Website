"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import LoadingAnimation from "../components/LoadingAnimation";
import { useAPIConfig } from "@/context/APIConfigContext";

interface GalleryImage {
  imageUrl: string;
  eventName?: string;
}

export default function Gallery() {
  const { GALLERY_API_END_POINT } = useAPIConfig();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [events, setEvents] = useState<string[]>(["All"]);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = "FAROUCHE – Gallery";
    fetch(`${GALLERY_API_END_POINT}/`)
      .then(r => r.json())
      .then(data => {
        const imgs: GalleryImage[] = data.images || [];
        setImages(imgs);
        const unique = ["All", ...Array.from(new Set(imgs.map(i => i.eventName).filter(Boolean)))] as string[];
        setEvents(unique);
      })
      .catch(console.error)
      .finally(() => setTimeout(() => setLoading(false), 700));
  }, []);

  const filtered = selectedEvent === "All"
    ? images
    : images.filter(img => img.eventName === selectedEvent);

  const prev = () => setLightboxIdx(i => i != null ? (i - 1 + filtered.length) % filtered.length : 0);
  const next = () => setLightboxIdx(i => i != null ? (i + 1) % filtered.length : 0);
  const current = lightboxIdx != null ? filtered[lightboxIdx] : null;


  const hero = filtered[0];
  const sidebarImgs = filtered.slice(1, 5);
  const restImgs = filtered.slice(5);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <ScrollProgressBar />
      <AnimatePresence>{loading && <LoadingAnimation />}</AnimatePresence>

      {!loading && (
        <>
          
          <header className="pt-28 pb-10 px-8 md:px-16 border-b border-white/[0.06]">
            <div className="flex items-end justify-between gap-6 flex-wrap">

              
              <div>
                <p className="font-mono text-[10px] text-purple-400/70 uppercase tracking-[0.4em] mb-3">
                  ✦ Farouche 2026 &nbsp;·&nbsp; Visual Archive
                </p>
                <h1
                  className="text-5xl md:text-7xl font-black uppercase font-cinzel tracking-tight leading-none"
                  style={{
                    background: "linear-gradient(120deg,#fff 30%,#c084fc 70%,#f472b6 100%)",
                    WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
                  }}
                >
                  Gallery
                </h1>
                <p className="mt-3 font-mono text-[11px] text-white/20">
                  {filtered.length} photos &nbsp;·&nbsp; {events.length - 1} event{events.length - 1 !== 1 ? "s" : ""}
                </p>
              </div>

              
              <div className="flex flex-wrap gap-2 pb-1">
                {events.map(ev => (
                  <button
                    key={ev}
                    onClick={() => setSelectedEvent(ev)}
                    className={`px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-all duration-200 ${
                      selectedEvent === ev
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white/35 border-white/10 hover:border-purple-400/50 hover:text-purple-300"
                    }`}
                  >
                    {ev}
                  </button>
                ))}
              </div>
            </div>
          </header>

          
          <main className="px-8 md:px-16 py-10 pb-24 space-y-2">

            {filtered.length === 0 ? (
              <div className="py-40 text-center border border-dashed border-white/10">
                <p className="text-white/20 font-mono text-sm uppercase tracking-widest">No photos yet</p>
              </div>
            ) : (
              <>
                
                {hero && (
                  <div className="grid grid-cols-3 gap-2">
                    
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                      className="col-span-2 relative h-[520px] overflow-hidden cursor-zoom-in"
                      onClick={() => setLightboxIdx(0)}
                    >
                      <img
                        src={hero.imageUrl}
                        alt={hero.eventName}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 font-mono text-[10px] text-white/70 uppercase tracking-widest">
                        {hero.eventName}
                      </span>
                    </motion.div>

                    
                    <div className="grid grid-cols-2 gap-2">
                      {sidebarImgs.map((img, i) => (
                        <motion.div
                          key={img.imageUrl + i}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="relative h-[254px] overflow-hidden cursor-zoom-in"
                          onClick={() => setLightboxIdx(i + 1)}
                        >
                          <img
                            src={img.imageUrl}
                            alt={img.eventName}
                            className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-500"
                            loading="lazy"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                
                {restImgs.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {restImgs.map((img, i) => (
                      <motion.div
                        key={img.imageUrl + i}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: (i % 15) * 0.03 }}
                        className="aspect-square overflow-hidden cursor-zoom-in"
                        onClick={() => setLightboxIdx(i + 5)}
                      >
                        <img
                          src={img.imageUrl}
                          alt={img.eventName}
                          className="w-full h-full object-cover hover:scale-[1.06] transition-transform duration-500"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}

            
            <div className="flex items-center gap-4 pt-8">
              <div className="h-px flex-1 bg-white/[0.04]" />
              <p className="font-mono text-[9px] text-white/10 uppercase tracking-[0.4em]">Farouche 2026</p>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>
          </main>

          
          <AnimatePresence>
            {current && lightboxIdx != null && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/97"
                onClick={() => setLightboxIdx(null)}
              >
                <span className="absolute top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/25 tracking-widest uppercase">
                  {lightboxIdx + 1} / {filtered.length}
                  {current.eventName && <>&nbsp;&nbsp;·&nbsp;&nbsp;{current.eventName}</>}
                </span>

                <button onClick={() => setLightboxIdx(null)}
                  className="absolute top-7 right-8 text-white/30 hover:text-white transition-colors font-mono text-xs tracking-widest">
                  ESC
                </button>
                <button onClick={e => { e.stopPropagation(); prev(); }}
                  className="absolute left-6 text-white/20 hover:text-purple-400 transition-colors">
                  <ChevronLeft size={28} />
                </button>

                <motion.img
                  key={lightboxIdx}
                  src={current.imageUrl}
                  alt={current.eventName || ""}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="max-h-[86vh] max-w-[86vw] object-contain"
                  onClick={e => e.stopPropagation()}
                />

                <button onClick={e => { e.stopPropagation(); next(); }}
                  className="absolute right-6 text-white/20 hover:text-purple-400 transition-colors">
                  <ChevronRight size={28} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}