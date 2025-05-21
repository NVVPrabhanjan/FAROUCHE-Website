"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { REGISTRATION_API_END_POINT } from "@/utils/constants";
import { EVENT_API_END_POINT } from "@/utils/constants";

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
  if (lowerError.includes("image")) {
    return "Please upload an image for MH Cricket registration.";
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
  const [eventTitle, setEventTitle] = useState("");
  const [isMHCricket, setIsMHCricket] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hostelName: "",
    year: "",
  });

  // Initialize teamMembers as an array of strings
  const [teamMembers, setTeamMembers] = useState([]);
  const params = useParams();

  // Fetch event details to determine if it's MH Cricket
useEffect(() => {
  const eventId = id || params?.id;
  if (!eventId) return;

  const fetchEventDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${EVENT_API_END_POINT}/getEventID?id=${eventId}`);;
      if (!response.ok) {
        throw new Error(`Failed to fetch event: ${response.status}`);
      }
      const json = await response.json();
      const event = json?.data;

      if (event?.title) {
        setEventTitle(event.title);
        if (event.title === "MH Cricket") {
          setIsMHCricket(true);
          console.log("MH Cricket event detected");
        }
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchEventDetails();
}, [id, params]);


  // For testing - uncomment this to force MH Cricket mode
  // useEffect(() => {
  //   setIsMHCricket(true);
  //   console.log("MH Cricket mode forced via useEffect");
  // }, []);

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

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Image selected:", file.name);
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Simplified handler that directly updates the name string at the given index
  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setShowError(false);

    try {
      validatePhoneNumber(formData.phone);

<<<<<<< HEAD
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(bmsce\.ac\.in|bmsca\.org|bmscl\.ac\.in)$/;
=======
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@(bmsce\.ac\.in|bmsca\.org|bmscl\.ac\.in)$/;
>>>>>>> d3e6724 (added gallery and mh cricket)
      if (!emailRegex.test(formData.email)) {
        throw new Error(
          "Only college email IDs (@bmsce.ac.in or @bmsca.org or @bmscl.ac.in) are allowed."
        );
      }

      // Debug log about cricket event and image
      console.log("Is MH Cricket:", isMHCricket);
      console.log("Has selected image:", !!selectedImage);

      // Check if image is required for MH Cricket
      if (isMHCricket && !selectedImage) {
        throw new Error("Image is required for MH Cricket registration.");
      }

      // Create FormData for multipart/form-data submission ALWAYS
      // Changed approach: Always use FormData for consistency
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("id", id);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("hostelName", formData.hostelName);
      formDataToSubmit.append("phoneNumber", formData.phone);
      formDataToSubmit.append("year", formData.year);

      if (parsedTeamSize > 1 && teamMembers.length > 0) {
        teamMembers.forEach((member, index) => {
          formDataToSubmit.append(`teamMembers[${index}]`, member);
        });
      }

      // Append image if selected (for MH Cricket)
      if (isMHCricket && selectedImage) {
        console.log("Appending image to form data");
        formDataToSubmit.append("image", selectedImage);
      }

      // IMPORTANT FIX: Don't set Content-Type header when using FormData
      // Let the browser set the correct boundary for multipart/form-data
      const fetchOptions = {
        method: "POST",
        headers: undefined, // Let browser handle the headers for multipart/form-data
        body: formDataToSubmit,
      };

      console.log("Submitting registration...");
      const response = await fetch(
        `${REGISTRATION_API_END_POINT}/createRegistration`,
        fetchOptions
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful!");
      setIsSuccess(true);
      setIsLoading(false);

      // Add a delay before redirecting to allow users to see the success animation
      setTimeout(() => {
        window.location.href = "/events"; // Redirect to events page
      }, 5000); // 5 seconds delay
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      const formattedError = formatErrorMessage(error.message);
      setError(formattedError);
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

        {/* Form Container */}
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
                {eventTitle && (
                  <span className="font-medium">{eventTitle}</span>
                )}{" "}
                •{" "}
                {parsedTeamSize > 1
                  ? `Team Event (${parsedTeamSize} members)`
                  : "Individual Event"}
              </p>
              {/* Debug indicator for MH Cricket status - remove in production */}
              {isMHCricket && (
                <span className="inline-block bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full mt-2">
                  MH Cricket Event Detected ✓
                </span>
              )}
            </motion.div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
            encType="multipart/form-data" // Ensure this attribute is set
          >
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
<<<<<<< HEAD
		    <option value="5">5th Year</option>
=======
                    <option value="5">5th Year</option>
>>>>>>> d3e6724 (added gallery and mh cricket)
                  </select>
                </div>
              </div>

              {/* Image Upload Section - Only visible for MH Cricket */}
              {isMHCricket && (
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 rounded-xl border border-purple-500/20 bg-gradient-to-b from-purple-900/20 to-black/20">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-purple-200 text-lg font-medium">
                        Upload Image
                      </h3>
                    </div>

                    <label
                      htmlFor="image-upload"
                      className="block mb-2 text-purple-100 font-medium text-sm"
                    >
                      Photo <span className="text-red-400">*</span>
                    </label>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-upload"
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
                        ${
                          imagePreview
                            ? "border-purple-600/30 bg-black/40"
                            : "border-purple-600/20 bg-black/20 hover:bg-black/30"
                        }`}
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-full overflow-hidden rounded-lg">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <p className="text-white text-sm bg-black/70 px-4 py-2 rounded-full">
                                Click to change image
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 mb-3 text-purple-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-center text-purple-200">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-center text-purple-300">
                              Upload a team photo (JPG, PNG, or JPEG)
                            </p>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          name="image"
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          className="hidden"
                          onChange={handleImageChange}
                          required={isMHCricket}
                          key={selectedImage ? selectedImage.name : "empty"} // force re-render if new image selected
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-xs text-purple-300/80">
                      This image will be used for the MH Cricket tournament
                      display.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Team Members Section - Only visible for team events */}
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
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-purple-900/10 p-5 rounded-xl border border-purple-900/30"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-700/20 h-6 w-6 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-purple-300">
                            {index + 2}
                          </span>
                        </div>
                        <h3 className="text-purple-200 font-medium">
                          Team Member {index + 2}
                        </h3>
                      </div>

                      <div>
                        <label
                          htmlFor={`teamMember-${index}`}
                          className="block mb-2 text-purple-200 font-medium text-sm"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id={`teamMember-${index}`}
                          value={member}
                          onChange={(e) =>
                            handleTeamMemberChange(index, e.target.value)
                          }
                          required
                          className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                          placeholder={`Enter team member ${index + 2}'s name`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 text-white font-medium text-lg rounded-xl transition-all duration-200 shadow-lg ${
                  isLoading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-purple-500/20"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </button>

              <div className="flex justify-center mt-6">
                <Link
                  href="/events"
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Events
                </Link>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
