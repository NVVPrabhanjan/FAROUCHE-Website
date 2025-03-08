'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { REGISTRATION_API_END_POINT } from '@/utils/constants'
export default function EventRegistration() {
  const { id, teamSize } = useParams()
  const parsedTeamSize = parseInt(teamSize as string) || 1

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hostelName: '',
    year: ''
  })

  // Change teamMembers to an array of strings instead of objects
  const [teamMembers, setTeamMembers] = useState([])

  // Initialize team members array based on teamSize
  useEffect(() => {
    if (parsedTeamSize > 1) {
      // Initialize with empty strings instead of objects
      setTeamMembers(Array(parsedTeamSize - 1).fill(''))
    }
  }, [parsedTeamSize])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Simplified handler that directly updates the name string at the given index
  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers]
    updatedTeamMembers[index] = value
    setTeamMembers(updatedTeamMembers)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`${REGISTRATION_API_END_POINT}/createRegistration`, {
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
        year: formData.year,
        teamMembers: parsedTeamSize > 1 ? teamMembers : undefined
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Success:", data)
      alert('Registration successful! You will receive confirmation details via email.')
    })
    .catch(error => console.error("Error:", error))
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-24">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full mx-auto bg-gradient-to-b from-purple-900/50 to-black/50 rounded-3xl p-8 border border-purple-900/50 shadow-lg shadow-purple-900/20"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-3">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Event Registration
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full mb-2"></div>
              <p className="text-gray-300 text-lg">
                {parsedTeamSize > 1 ? `Team Event (${parsedTeamSize} members)` : 'Individual Event'}
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Leader Section */}
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
                <h2 className="text-xl font-semibold text-purple-300 px-4">
                  {parsedTeamSize > 1 ? 'Team Leader Details' : 'Participant Details'}
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block mb-2 text-purple-200 font-medium text-sm transition-all">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-purple-200 font-medium text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-purple-200 font-medium text-sm">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    placeholder="Enter your number"
                  />
                </div>
                <div>
                  <label htmlFor="hostelName" className="block mb-2 text-purple-200 font-medium text-sm">Hostel Name</label>
                  <input
                    type="text"
                    id="hostelName"
                    name="hostelName"
                    value={formData.hostelName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    placeholder="Enter your hostel"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block mb-2 text-purple-200 font-medium text-sm">Year of Study</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            {parsedTeamSize > 1 && (
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
                  <h2 className="text-xl font-semibold text-purple-300 px-4">Team Members</h2>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
                </div>
                
                <div className="space-y-6">
                  {teamMembers.map((memberName, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl border border-purple-500/20 bg-black/50"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                          <span className="text-white font-semibold">{index + 1}</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-200">Team Member {index + 1}</h3>
                      </div>
                      
                      <div className="w-full">
                        <label htmlFor={`memberName${index}`} className="block mb-2 text-purple-200 font-medium text-sm">Full Name</label>
                        <input
                          type="text"
                          id={`memberName${index}`}
                          value={memberName}
                          onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                          placeholder={`Enter name for team member ${index + 1}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md shadow-purple-900/30"
              >
                Register Now
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href={`/events/${id}/${teamSize}`}
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Event Details
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}