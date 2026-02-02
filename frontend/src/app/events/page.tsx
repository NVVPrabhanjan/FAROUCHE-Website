'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ArrowRight, Calendar, MapPin } from 'lucide-react'
import ScrollProgressBar from '../components/ScrollProgressBar'
import { useEffect, useState } from 'react'
import { EVENT_API_END_POINT } from '@/utils/constants'
import LoadingAnimation from "../components/LoadingAnimation";

// Define Event Interface
interface Event {
    eventid: string;
    title: string;
    description: string;
    date: string;
    teamSize: number;
    image?: string; // Assuming API returns image, if not we handle it
}

export default function Events() {
  const [data, setData] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    document.title = 'FAROUCHE - Events'

    async function fetchData() {
      try {
        const res = await fetch(`${EVENT_API_END_POINT}/getEvents`);
        const result = await res.json()
        // Ensure we are setting an array
        if (Array.isArray(result.data)) {
            setData(result.data)
        } else if (Array.isArray(result)) {
            setData(result)
        } else {
             console.error("Unexpected API response format:", result)
             setData([])
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setData([])
      } finally {
        setTimeout(() => setLoading(false), 1200)
      }
    }
    fetchData()
  }, [])
  
  // Filter by search term and sort by date in descending order
  const sortedEvents = data
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime() // Descending order
    })

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <AnimatePresence>
        {loading && <LoadingAnimation />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgressBar />
          
          <main className="pt-32 pb-20 px-6 container mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-white/10 pb-10">
                <div>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-purple-500 font-mono text-xs uppercase tracking-widest mb-4"
                    >
                        // Official Schedule
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-9xl font-bold font-cinzel uppercase tracking-tighter leading-none"
                    >
                        Events<span className="text-neutral-800">.</span>
                    </motion.h1>
                </div>

                {/* Architectural Search */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full md:w-auto min-w-[300px]"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="SEARCH PROTOCOL..."
                            className="w-full bg-transparent border-b border-white/20 py-4 pl-0 pr-10 text-xl font-mono uppercase tracking-widest text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-purple-500 transition-colors" size={20} />
                    </div>
                </motion.div>
            </div>

            {/* Event List - Architectural/Brutalist Style */}
            <div className="space-y-4">
                {sortedEvents.length > 0 ? (
                    sortedEvents.map((event, index) => (
                        <motion.div
                            key={event.eventid}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/events/${event.eventid}/${event.teamSize}`} className="block group">
                                <article className="relative border border-white/10 p-8 md:p-12 transition-all duration-500 hover:border-purple-500/50 hover:bg-white/[0.02] flex flex-col md:flex-row gap-8 justify-between items-start md:items-center overflow-hidden">
                                    
                                    {/* Hover Background Accent */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

                                    {/* Event Info */}
                                    <div className="flex-1 z-10">
                                        <div className="flex items-center gap-4 mb-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={12} className="text-purple-500" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </span>
                                            <span className="w-px h-3 bg-white/10" />
                                            <span>Team Size: {event.teamSize}</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                            {event.title}
                                        </h2>
                                        <p className="text-neutral-400 max-w-2xl line-clamp-2 md:line-clamp-1 group-hover:text-neutral-300 transition-colors">
                                            {event.description}
                                        </p>
                                    </div>

                                    {/* Action Arrow */}
                                    <div className="z-10 bg-white/5 p-4 rounded-full border border-white/10 group-hover:bg-purple-500 group-hover:text-black group-hover:border-purple-500 transition-all duration-300">
                                        <ArrowRight className="transform group-hover:-rotate-45 transition-transform duration-500" size={24} />
                                    </div>

                                </article>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center border border-white/10 border-dashed"
                     >
                        <p className="font-mono text-neutral-500 uppercase tracking-widest">No Events Found</p>
                     </motion.div>
                )}
            </div>
          </main>
        </>
      )}
    </div>
  )
}