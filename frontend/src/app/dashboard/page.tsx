'use client'
import { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import ScrollProgressBar from '../components/ScrollProgressBar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import {RegisterForm} from "../components/CreateEvent"
  import {ResultForm} from "../components/CreateResult"  
  // import { Toaster, toast } from 'sonner';

export default function Dashboard() {
  const [events, setEvents] = useState([])


  useEffect(() => {
    document.title = 'FAROUCHE - Dashboard'

    async function fetchEvents() {
      const res = await fetch('http://127.0.0.1:4000/api/v1/event/getEvents')
      const data = await res.json()
      setEvents(data.data)
    }
    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Toaster /> */}
      <ScrollProgressBar />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your events and view insights
          </p>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Total Events */}
          <div className="rounded-lg bg-gradient-to-b from-green-800 to-black p-6 border border-green-700">
            <h2 className="text-2xl font-bold text-green-400 mb-3">Total Events</h2>
            <p className="text-4xl font-semibold text-gray-100">{events.length}</p>
          </div>

          {/* Upcoming Events */}
          {/* <div className="rounded-lg bg-gradient-to-b from-blue-800 to-black p-6 border border-blue-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">Upcoming Events</h2>
            <ul className="text-gray-300 space-y-2">
              {events.slice(0, 5).map((event) => (
                <li key={event.id}>
                  <Link href={`/events/${event.id}`} className="hover:underline">
                    {event.title} - {new Date(event.date).toLocaleDateString()}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Admin Actions */}
          <div className="rounded-lg bg-gradient-to-b from-purple-800 to-black p-6 border border-purple-700">
            <h2 className="text-2xl font-bold text-purple-400 mb-3">Admin Actions</h2>
            <div className=" flex gap-3">
            <div className="space-y-4 ">
<Dialog>
  <DialogTrigger     onClick={()=>{
  }}            className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
  >                Add Event
</DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Create a New Event</DialogTitle>
    <DialogDescription>
      Please fill in the details below to register your event. This action will
      create a permanent event entry in our system.
    </DialogDescription>
  </DialogHeader>
  <RegisterForm/>

 
</DialogContent>
</Dialog>
              
            </div>
            <div className="space-y-4">
            <Dialog>
  <DialogTrigger                 className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
  >                Add Results
</DialogTrigger>
<DialogContent>
  <DialogHeader>
    <DialogTitle>Create a New Result</DialogTitle>
    <DialogDescription>
      Please fill in the details below to add a new result.
    </DialogDescription>
  </DialogHeader>
  <ResultForm/>

 
</DialogContent>
</Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
