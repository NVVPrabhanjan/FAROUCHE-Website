'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// const events = [
//   { id: 1, title: 'Opening Ceremony & Cultural Night' },
//   { id: 2, title: 'Sports Tournament Finals' },
//   { id: 3, title: 'Food Fiesta' },
//   { id: 4, title: 'Closing Ceremony & DJ Night' }
// ]

export default function EventRegistration() {
  const { id } = useParams()
  // const event = events.find(e => e.id === parseInt(id as string)) || { title: 'Event Registration' }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hostelName: '',
    rollNumber: '',
    year: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    fetch("http://localhost:4000/api/v1/registration/createRegistration", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          id,
          name: formData.name,
          email: formData.email,
          hostelName: formData.hostelName,
          phoneNumber: formData.phone,
      })
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));
  
    console.log('Form submitted:', formData)
    alert('Registration successful! You will receive confirmation details via email.')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto bg-gradient-to-b from-purple-900/50 to-black/50 rounded-2xl p-8 border border-purple-900/50"
        >
          <h1 className="text-4xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Event Registration
            </span>
          </h1>
          <p className="text-center text-gray-300 mb-8">{event.title}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label htmlFor="rollNumber" className="block mb-2 text-gray-300">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="hostelName" className="block mb-2 text-gray-300">Hostel Name</label>
                <input
                  type="text"
                  id="hostelName"
                  name="hostelName"
                  value={formData.hostelName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label htmlFor="year" className="block mb-2 text-gray-300">Year of Study</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:border-purple-400"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Register for Event
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href={`/events/${id}`}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Back to Event Details
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}