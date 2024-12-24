'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { uploadImage } from '@/app/action/uploadImage'
import { Trash2, Plus, X, ArrowLeft } from 'lucide-react'

interface Event {
  id: string
  name: string
  venue: string
  date: string
  image: string | null
  description?: string
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    name: '',
    venue: '',
    date: '',
    image: null,
    description: ''
  })
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const imagePath = await uploadImage(formData)
        setNewEvent({ ...newEvent, image: imagePath })
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during image upload.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.image) {
      setError('Please upload an image for the event.')
      return
    }
    setEvents([...events, newEvent])
    setNewEvent({ id: '', name: '', venue: '', date: '', image: null, description: '' })
    setIsCreating(false)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white flex items-center gap-2">
                <ArrowLeft size={20} />
                Back to Home
              </Link>
            </div>
            <motion.span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Event Management
            </motion.span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCreating(true)}
          className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center"
        >
          <Plus className="mr-2" /> Create New Event
        </motion.button>

        <AnimatePresence>
          {isCreating && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="bg-gradient-to-b from-purple-900/50 to-black/50 p-6 rounded-2xl mb-8 relative border border-purple-900/50"
            >
              <button
                onClick={() => setIsCreating(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Create New Event
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Event Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newEvent.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="id" className="block text-sm font-medium text-gray-300 mb-2">Event ID</label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={newEvent.id}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-300 mb-2">Venue</label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={newEvent.venue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">Event Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 bg-black/50 rounded-lg border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    accept="image/*"
                    ref={fileInputRef}
                    required
                  />
                  {newEvent.image && (
                    <div className="mt-4">
                      <Image src={newEvent.image} alt="Event preview" width={200} height={150} className="rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Create Event
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="bg-gradient-to-b from-purple-900/50 to-black/50 p-6 rounded-2xl border border-purple-900/50">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Existing Events
          </h2>
          {events.length === 0 ? (
            <p className="text-gray-400">No events created yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-black/50 rounded-xl border border-purple-900/50 overflow-hidden group"
                >
                  {event.image && (
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-1"><strong>ID:</strong> {event.id}</p>
                    <p className="text-sm text-gray-400 mb-1"><strong>Venue:</strong> {event.venue}</p>
                    <p className="text-sm text-gray-400 mb-2"><strong>Date:</strong> {event.date}</p>
                    {event.description && (
                      <p className="text-sm text-gray-400 mb-4">{event.description}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(event.id)}
                      className="w-full bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="mr-2" size={16} /> Delete Event
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}