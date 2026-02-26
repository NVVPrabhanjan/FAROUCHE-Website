'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowLeft, Share2, ArrowRight } from 'lucide-react'
import ScrollProgressBar from '@/app/components/ScrollProgressBar'
import { EVENT_API_END_POINT } from '@/utils/constants'


interface EventData {
    eventid: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    image: string;
    teamSize: number;
}

export default function EventDetails() {
  const { id, teamSize } = useParams()
  const [event, setEvent] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true)
        const res = await fetch(`${EVENT_API_END_POINT}/getEventID?id=${id}`)
        if (!res.ok) throw new Error('Failed to fetch event')
        
        const data = await res.json()
        setEvent(data.data)
      } catch (err: any) {
        console.error('Error fetching event:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) fetchEvent()
  }, [id])
  

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Accessing Data...</span>
         </div>
      </div>
    )
  }
  

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-6">
           <h1 className="text-6xl font-cinzel font-bold text-neutral-800">404</h1>
           <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">Event Protocol Not Found</p>
           <Link href="/events" className="inline-block border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all">
              Return to Grid
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <ScrollProgressBar />
      
      
      <div className="fixed inset-0 z-0">
         <div className="absolute inset-0 bg-black/80 z-10" />
         <Image 
            src={event.image || '/placeholder.jpg'} 
            alt={event.title}
            fill
            className="object-cover opacity-50 grayscale"
            priority
         />
      </div>

      
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
          
          
          <header className="p-6 md:p-10 flex justify-between items-center border-b border-white/10 bg-black/50 backdrop-blur-md">
             <Link href="/events" className="group flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Return</span>
             </Link>
             <span className="text-xs font-mono text-purple-500 uppercase tracking-widest">
                 Event ID: {event.eventid}
             </span>
          </header>

          
          <main className="flex-1 container mx-auto px-6 py-20 flex flex-col justify-center">
              <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="max-w-5xl"
              >
                  
                  <div className="flex flex-wrap gap-6 mb-8 font-mono text-xs uppercase tracking-widest text-purple-400">
                      <span className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="w-px h-3 bg-white/20" />
                      <span className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.venue}
                      </span>
                  </div>

                  
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-cinzel uppercase tracking-tighter leading-[0.9] mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                      {event.title}
                  </h1>

                  
                  <div className="grid md:grid-cols-12 gap-12 border-t border-white/10 pt-12">
                      <div className="md:col-span-7">
                          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl">
                              {event.description}
                          </p>
                      </div>
                      
                      <div className="md:col-span-5 flex flex-col gap-6 items-start md:items-end">
                           <Link 
                               href={`/events/${id}/${teamSize}/register`}
                               className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-black text-lg font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors duration-300 w-full md:w-auto"
                           >
                               <span>Register Team</span>
                               <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                           </Link>

                           <button 
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({ title: event.title, text: event.description, url: window.location.href });
                                    } else {
                                        navigator.clipboard.writeText(window.location.href);

                                        alert('Protocol Link Copied');
                                    }
                                }}
                                className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                           >
                               <Share2 size={16} />
                               <span>Share Protocol</span>
                           </button>
                      </div>
                  </div>
              </motion.div>
          </main>
          
          
          <footer className="p-6 md:p-10 border-t border-white/10 flex justify-between items-end bg-black/50 backdrop-blur-md">
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
                    Hostel Department
                    <br/>
                    Confidential
                </div>
                <div className="text-right">
                    <p className="font-cinzel text-2xl font-bold text-white/20">FAROUCHE</p>
                </div>
          </footer>

      </div>
    </div>
  )
}