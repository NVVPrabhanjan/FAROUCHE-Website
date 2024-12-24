'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, MapPin } from 'lucide-react'
import Navbar from '../components/NavBar'
import ScrollProgressBar from '../components/ScrollProgressBar'

const events = [
  {
    id: 1,
    title: 'Opening Ceremony & Cultural Night',
    image: '/event1.jpg',
    description: 'Grand inauguration followed by spectacular cultural performances.',
    date: 'December 15, 2023',
    time: '6:00 PM - 10:00 PM',
    venue: 'Main Campus Grounds',
  },
  {
    id: 2,
    title: 'Sports Tournament Finals',
    image: '/event2.jpg',
    description: 'Championship matches across multiple sports categories.',
    date: 'December 16, 2023',
    time: '9:00 AM - 5:00 PM',
    venue: 'Sports Complex',
  },
  { 
    id: 3, 
    title: 'Food Fiesta', 
    image: '/event3.jpg',
    description: 'A culinary journey featuring diverse cuisines and food competitions.',
    date: 'December 16, 2023',
    time: '12:00 PM - 8:00 PM',
    venue: 'Hostel Grounds',
  },
  { 
    id: 4, 
    title: 'Closing Ceremony & DJ Night', 
    image: '/event4.jpg',
    description: 'Award distribution followed by an electrifying DJ performance.',
    date: 'December 17, 2023',
    time: '7:00 PM - 11:00 PM',
    venue: 'Main Stage',
  },
]

export default function Events() {
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
              Festival Events
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three days of excitement, creativity, and celebration
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50"
            >
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-3">{event.title}</h2>
                <p className="text-gray-300 mb-6">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <Link 
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  View Details
                </Link>
              </div>

              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-50"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}