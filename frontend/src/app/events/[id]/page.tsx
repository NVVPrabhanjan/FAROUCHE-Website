'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react'
import ScrollProgressBar from '@/app/components/ScrollProgressBar'

const events = [
  { 
    id: 1, 
    title: 'Opening Ceremony & Cultural Night',
    image: '/event1.jpg',
    description: 'Join us for a spectacular inauguration of HostelFest 2023. The evening begins with traditional lamp lighting and speeches from distinguished guests, followed by mesmerizing cultural performances including classical dance, music, and theatrical presentations. The night culminates in a grand musical ensemble featuring our talented students.',
    date: 'December 15, 2023',
    time: '6:00 PM - 10:00 PM',
    venue: 'Main Campus Grounds',
    coordinator: {
      name: 'Akshanth Kumar',
      phone: '+91 98765 43210'
    }
  },
  { 
    id: 2, 
    title: 'Sports Tournament Finals',
    image: '/event2.jpg',
    description: 'Witness the thrilling conclusion of our inter-hostel sports championships. Features final matches in cricket, football, basketball, and volleyball, along with track and field events. Come support your hostel teams as they compete for the coveted HostelFest Sports Trophy.',
    date: 'December 16, 2023',
    time: '9:00 AM - 5:00 PM',
    venue: 'Sports Complex',
    coordinator: {
      name: 'Lohit Sharma',
      phone: '+91 98765 43211'
    }
  },
  { 
    id: 3, 
    title: 'Food Fiesta',
    image: '/event3.jpg',
    description: 'Experience a gastronomic extravaganza featuring diverse cuisines from across India. Participate in cooking competitions, enjoy live food demonstrations, and savor delicacies prepared by student chefs. Special stalls showcase regional specialties and street food favorites.',
    date: 'December 16, 2023',
    time: '12:00 PM - 8:00 PM',
    venue: 'Hostel Grounds',
    coordinator: {
      name: 'Krishn Maloo',
      phone: '+91 98765 43212'
    }
  },
  { 
    id: 4, 
    title: 'Closing Ceremony & DJ Night',
    image: '/event4.jpg',
    description: 'The grand finale of HostelFest 2023! Join us for the award ceremony celebrating outstanding achievements across all events, followed by an electrifying DJ night. Feature performances by guest artists and our own talented DJs will keep you dancing till the end.',
    date: 'December 17, 2023',
    time: '7:00 PM - 11:00 PM',
    venue: 'Main Stage',
    coordinator: {
      name: 'Sai Raj',
      phone: '+91 98765 43213'
    }
  },
]

export default function EventDetails() {
  const { id } = useParams()
  const event = events.find(e => e.id === parseInt(id as string))

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
                    <span>{event.coordinator.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span>{event.coordinator.phone}</span>
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