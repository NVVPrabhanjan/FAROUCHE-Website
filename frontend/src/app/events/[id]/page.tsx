'use client'
 
import { useEffect,useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react'
import ScrollProgressBar from '@/app/components/ScrollProgressBar'


export default function EventDetails() {
  const { id } = useParams()
  const [event,setEvent]=useState(null)


  useEffect(
    ()=>{

    async function fetchEvent(){
      const res = await fetch(`http://127.0.0.1:4000/api/v1/event/getEventID?id=${id}`, {
        method: 'GET', // Optional for GET requests
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json()

      console.log(data)
      setEvent(data.data)

    }
  fetchEvent()
  },[])
      
  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link 
            href="/events"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Events
          </Link>
        </div>
      </div>
    )
  }

  return (
      <div className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden border border-purple-900/50"
        >
          <div className="relative h-96">
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          <div className="relative p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {event.title}
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-8">{event.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-900/50">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">Event Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-900/50">
                <h2 className="text-xl font-semibold mb-4 text-purple-400">Coordinator</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-400" />
                    <span>{event.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span>{event.title}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link 
                href="/events" 
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                ← Back to Events
              </Link>
              <Link 
                href={`/events/${id}/register`}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Register for Event
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}