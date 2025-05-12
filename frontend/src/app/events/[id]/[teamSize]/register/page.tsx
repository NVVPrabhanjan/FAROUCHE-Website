"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { REGISTRATION_API_END_POINT } from "@/utils/constants";

const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    throw new Error("Phone number must be exactly 10 digits");
  }
  return true;
};

const formatErrorMessage = (error: string) => {
  const lowerError = error.toLowerCase();
  if (lowerError.includes("already registered")) {
    return "You are already registered for this event. Each participant can only register once.";
  }
  if (lowerError.includes("phone")) {
    return "Please enter a valid 10-digit phone number.";
  }
  return error || "An error occurred during registration. Please try again.";
};
export default function EventRegistration() {
  const { id, teamSize } = useParams();
  const parsedTeamSize = parseInt(teamSize as string) || 1;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hostelName: "",
    year: "",
  });

  // Change teamMembers to an array of strings instead of objects
  const [teamMembers, setTeamMembers] = useState([]);

  // Initialize team members array based on teamSize
  useEffect(() => {
    if (parsedTeamSize > 1) {
      // Initialize with empty strings instead of objects
      setTeamMembers(Array(parsedTeamSize - 1).fill(""));
    }
  }, [parsedTeamSize]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simplified handler that directly updates the name string at the given index
  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShowError(false);

    // fetch(`${REGISTRATION_API_END_POINT}/createRegistration`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     id,
    //     name: formData.name,
    //     email: formData.email,
    //     hostelName: formData.hostelName,
    //     phoneNumber: formData.phone,
    //     year: formData.year,
    //     teamMembers: parsedTeamSize > 1 ? teamMembers : undefined
    //   })
    // })
    try {
      validatePhoneNumber(formData.phone);

      const emailRegex = /^[a-zA-Z0-9._%+-]+@(bmsce\.ac\.in|bmsca\.org|bmscl\.ac\.in)$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error(
          "Only college email IDs (@bmsce.ac.in or @bmsca.org or @bmscl.ac.in) are allowed."
        );
      }
      fetch(`${REGISTRATION_API_END_POINT}/createRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: formData.name,
          email: formData.email,
          hostelName: formData.hostelName,
          phoneNumber: formData.phone,
          year: formData.year,
          teamMembers: parsedTeamSize > 1 ? teamMembers : undefined,
        }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Registration failed");
          }
          setIsSuccess(true);
          setIsLoading(false);

          // Add a delay before redirecting to allow users to see the success animation
          setTimeout(() => {
            window.location.href = `/events`; // Redirect to events page
          }, 5000); // 3 seconds delay

          return response.json();
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
          const formattedError = formatErrorMessage(error.message);
          setError(formattedError);
          setShowError(true);

          setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    } catch (error: any) {
      setIsLoading(false);
      setError(formatErrorMessage(error.message));
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  // Improved confetti particles for success animation
  const generateConfettiParticles = () => {
    const particles = [];
    // More professional color palette
    const colors = [
      "#8B5CF6",
      "#EC4899",
      "#6366F1",
      "#10B981",
      "#F59E0B",
      "#F3F4F6",
    ];

    for (let i = 0; i < 60; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        initialDelay: Math.random() * 1.5,
      });
    }

    return particles;
  };

  const confettiParticles = generateConfettiParticles();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-24 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4 relative">
        {/* Enhanced Error notification */}
        <AnimatePresence>
          {showError && (
            <motion.div
              className="fixed top-8 inset-x-0 mx-auto max-w-md z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-gradient-to-r from-red-900/90 to-pink-900/90 border border-red-500/30 rounded-xl p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-200">
                      Registration Error
                    </h3>
                    <div className="mt-1 text-sm text-red-100">{error}</div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      onClick={() => setShowError(false)}
                      className="bg-red-800/50 rounded-md inline-flex text-red-300 hover:text-red-200 focus:outline-none"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Success animation overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-b from-black/95 to-purple-950/95 z-50 flex items-center justify-center flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* Professional animated success card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 shadow-xl overflow-hidden"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {/* Subtle animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(0,0,0,0) 70%)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated check mark container */}
                <motion.div
                  className="mb-8 w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    boxShadow: [
                      "0 0 0px rgba(139, 92, 246, 0)",
                      "0 0 20px rgba(139, 92, 246, 0.5)",
                      "0 0 0px rgba(139, 92, 246, 0)",
                    ],
                  }}
                  transition={{
                    delay: 0.2,
                    boxShadow: { duration: 2, repeat: Infinity },
                  }}
                >
                  {/* Animated checkmark with drawing effect */}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      stroke="currentColor"
                      fill="none"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                </motion.div>

                {/* Success message with animation sequence */}
                <div className="text-center space-y-4">
                  <motion.h2
                    className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Registration Complete
                  </motion.h2>

                  <motion.div
                    className="h-0.5 w-16 mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 64, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  />

                  <motion.p
                    className="text-gray-300 max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Thank you for registering! A confirmation email has been
                    sent with all the details.
                  </motion.p>

                  {/* Animated timeline */}
                  <motion.div
                    className="pt-6 flex items-center justify-center space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-purple-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.9 + i * 0.1,
                          duration: 0.2,
                          type: "spring",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Return to events button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-6"
                  >
                    <Link
                      href={`/events/${id}`}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Return to Events</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Subtle corner decorations */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(0,0,0,0) 70%)",
                    transform: "translate(30%, -30%)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 opacity-10"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(0,0,0,0) 70%)",
                    transform: "translate(-30%, 30%)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>

              {/* Refined confetti with fade out */}
              {confettiParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute"
                  style={{
                    width: particle.size,
                    height: particle.size * (Math.random() > 0.5 ? 1 : 2.5), // Some particles are elongated
                    backgroundColor: particle.color,
                    borderRadius:
                      Math.random() > 0.7
                        ? "50%"
                        : Math.random() > 0.5
                        ? "2px"
                        : "0%",
                    left: `${particle.x}%`,
                  }}
                  initial={{
                    y: particle.y,
                    rotate: 0,
                    opacity: 0.8,
                  }}
                  animate={{
                    y: ["0vh", "100vh"],
                    x: [0, (Math.random() - 0.5) * 100], // More subtle horizontal movement
                    rotate: [0, particle.rotation],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 1.5,
                    delay: particle.initialDelay,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Subtle floating decorative elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`decoration-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 3 + Math.random() * 5,
                    height: 3 + Math.random() * 5,
                    border: `1px solid ${
                      [
                        "rgba(139,92,246,0.3)",
                        "rgba(236,72,153,0.3)",
                        "rgba(99,102,241,0.3)",
                      ][Math.floor(Math.random() * 3)]
                    }`,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    opacity: 0.6,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rest of your form code remains the same */}
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
                {parsedTeamSize > 1
                  ? `Team Event (${parsedTeamSize} members)`
                  : "Individual Event"}
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team Leader Section */}
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
                <h2 className="text-xl font-semibold text-purple-300 px-4">
                  {parsedTeamSize > 1
                    ? "Team Leader Details"
                    : "Participant Details"}
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-purple-200 font-medium text-sm transition-all"
                  >
                    Full Name
                  </label>
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
                  <label
                    htmlFor="email"
                    className="block mb-2 text-purple-200 font-medium text-sm"
                  >
                    Email
                  </label>
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
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-purple-200 font-medium text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    placeholder="Enter your number (without +91)"
                  />
                  <p className="mt-1.5 text-xs text-red-300/80 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Please enter only 10 digits without +91
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="hostelName"
                    className="block mb-2 text-purple-200 font-medium text-sm"
                  >
                    Hostel Name
                  </label>
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
                  <label
                    htmlFor="year"
                    className="block mb-2 text-purple-200 font-medium text-sm"
                  >
                    Year of Study
                  </label>
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
		    <option value="5">5th Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            {parsedTeamSize > 1 && (
              <div className="mb-6">
                <div className="flex items-center mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent flex-grow"></div>
                  <h2 className="text-xl font-semibold text-purple-300 px-4">
                    Team Members
                  </h2>
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
                          <span className="text-white font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-200">
                          Team Member {index + 1}
                        </h3>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor={`memberName${index}`}
                          className="block mb-2 text-purple-200 font-medium text-sm"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id={`memberName${index}`}
                          value={memberName}
                          onChange={(e) =>
                            handleTeamMemberChange(index, e.target.value)
                          }
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                          placeholder={`Enter name for team member ${
                            index + 1
                          }`}
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
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transition-all shadow-md shadow-purple-900/30 relative overflow-hidden ${
                  isLoading
                    ? "cursor-not-allowed opacity-80"
                    : "hover:from-purple-700 hover:to-pink-700"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-6 h-6 border-3 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="ml-3">Registering...</span>
                  </div>
                ) : (
                  <span>Register Now</span>
                )}

                {/* Animated button background for loading state */}
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link
              href={`/events/${id}/${teamSize}`}
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Event Details
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
