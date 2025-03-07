'use client'
 
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowLeft, Share2, Ticket, AlertCircle } from 'lucide-react'
import ScrollProgressBar from '@/app/components/ScrollProgressBar'

export default function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(id)
    async function fetchEvent() {
      try {
        setLoading(true)
        const res = await fetch(`http://127.0.0.1:4000/api/v1/event/getEventID?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch event')
        }
        
        const data = await res.json()
        console.log(data)
        setEvent(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching event:', error)
        setError(error.message)
        setLoading(false)
      }
    }
    
    fetchEvent()
  }, [id])
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-purple-400">Loading event details...</p>
        </div>
      </div>
    )
  }
  
  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-8 bg-gray-900/50 rounded-2xl border border-purple-900/50"
        >
          <AlertCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-300 mb-6">The event you're looking for doesn't exist or may have been removed.</p>
          <Link 
            href="/events"
            className="inline-flex items-center px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      
      <div className="container mx-auto px-4 py-20">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden border border-purple-900/50"
          >
            {/* Rearranged Layout: Left Details, Right Image */}
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Event Details */}
              <div className="lg:w-1/2 p-8 order-2 lg:order-1">
                {/* Title Section */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                    {event.title}
                  </span>
                </h1>
                
                <div className="flex flex-wrap gap-3 mb-6 text-sm">
                  <span className="px-3 py-1 rounded-full bg-purple-900/20 border border-purple-900/50 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-purple-400" />
                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-900/20 border border-purple-900/50 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-purple-400" />
                    {event.venue}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-lg mb-8">{event.description}</p>

                {/* Event Details Card */}
                <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-900/50 mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-purple-400">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <div>
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link 
                    href="/events" 
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                  </Link>
                  <div className="flex gap-3">
                    <button 
                      className="px-4 py-2 rounded-full border border-purple-900 text-purple-400 hover:bg-purple-900/20 flex items-center transition-colors"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: event.title,
                            text: event.description,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                    <Link 
                      href={`/events/${id}/register`}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Event Image */}
              <div className="lg:w-1/2 relative order-1 lg:order-2">
                <div className="relative h-80 lg:h-full">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent lg:from-transparent lg:to-black/70" />
                  
                  {/* Floating event date */}
                  <div className="absolute top-6 right-6 bg-purple-900/80 p-3 rounded-xl border border-purple-900/50 text-center">
                    <div className="text-sm font-bold text-purple-400">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                    <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}