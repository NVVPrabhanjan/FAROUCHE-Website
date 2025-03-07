'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import Navbar from '../components/NavBar'
import ScrollProgressBar from '../components/ScrollProgressBar'
import { useEffect, useState } from 'react'

export default function Events() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    document.title = 'FAROUCHE - Events'

    async function fetchData() {
      const res = await fetch('http://127.0.0.1:4000/api/v1/event/getEvents')
      const data = await res.json()
      setData(data.data)
      console.log(data)
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
      return dateB - dateA // Descending order
    })
    //console.log(sortedEvents);
    //console.log(sortedEvents[0]._id)
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Three days of excitement, creativity, and celebration
          </p>
          
          {/* Search Section */}
          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 border border-purple-600 rounded-full bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.eventid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50 h-full flex flex-col"
            >
              <div className="relative z-10 flex-1">
                <h2 className="text-2xl font-bold mb-3">{event.title}</h2>
                <p className="text-gray-300 mb-6">{event.description}</p>
              </div>

              <div className="relative z-10 mt-4">
                <Link 
                  href={`/events/${event.eventid}`}
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  View Details
                </Link>
              </div>

              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <Image
                  src={""}
                  alt={event.title}
                  fill
                  className="object-cover opacity-50"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {sortedEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No events found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}