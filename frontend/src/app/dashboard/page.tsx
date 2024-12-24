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
          <div className="rounded-lg bg-gradient-to-b from-blue-800 to-black p-6 border border-blue-700">
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
          </div>

          {/* Admin Actions */}
          <div className="rounded-lg bg-gradient-to-b from-purple-800 to-black p-6 border border-purple-700">
            <h2 className="text-2xl font-bold text-purple-400 mb-3">Admin Actions</h2>
            <div className="space-y-4">
            <Dialog>
  <DialogTrigger                 className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
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

  <form
    onSubmit={(e) => {
      e.preventDefault();
      // Add your form submission logic here
    //   const newEvent = new Event({
    //     title,
    //     description,
    //     date,
    //     venue,
    //     image: imageUrl.url,
    //     group,
    //   });
      // Process newEvent (e.g., API call)
    }}
    className="space-y-4"
  >
    {/* Title Input */}
    <div>
      <label htmlFor="title" className="block text-sm font-semibold text-white">
        Event Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Event title"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
        required
        // value={title}
        // onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    {/* Description Input */}
    <div>
      <label
        htmlFor="description"
        className="block text-sm font-semibold text-white"
      >
        Description
      </label>
      <textarea
        id="description"
        placeholder="Event description"
        rows={4}
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
        required
     //   value={description}
        //onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    {/* Date Input */}
    <div className=' flex gap-10'>
    <div className=' basis-[30%]'>
      <label htmlFor="date" className="block text-sm font-semibold text-white">
        Event Date
      </label>
      <input
        id="date"
        type="date"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
        required
      //  value={date}
        //onChange={(e) => setDate(e.target.value)}
      />
    </div>

    <div className=' basis-[30%]'>
      <label htmlFor="StartTime" className="block text-sm font-semibold text-white">
        Event start
      </label>
      <input
        id="StartTime"
        type="time"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
        required
      //  value={date}
        //onChange={(e) => setDate(e.target.value)}
      />
    </div>
    <div className=' basis-[30%]'>
      <label htmlFor="EndTime" className="block text-sm font-semibold text-white">
        Event End
      </label>
      <input
        id="EndTime"
        type="time"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
        required
      //  value={date}
        //onChange={(e) => setDate(e.target.value)}
      />
    </div>
    </div>


    {/* Venue Input */}
    <div>
      <label htmlFor="venue" className="block text-sm font-semibold text-white">
        Venue
      </label>
      <input
        id="venue"
        type="text"
        placeholder="Event venue"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
        required
      //  value={venue}
        //onChange={(e) => setVenue(e.target.value)}
      />
    </div>


    {/* Image Input */}
    <div>
      <label
        htmlFor="image"
        className="block text-sm font-semibold text-white"
      >
        Event Image
      </label>
      <input
        id="image"
        type="file"
        accept="image/*"
        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
       // onChange={handleImageUpload}
      />
    </div>

    {/* Submit Button */}
    <DialogFooter>
      <button
        type="submit"
        className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Register Event
      </button>
    </DialogFooter>
  </form>
</DialogContent>
</Dialog>

              <Link
                href="/edit-events"
                className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Edit Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
