// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Poppins } from "next/font/google";
// import {
//   ArrowLeft,
//   X,
//   Menu,
//   Calendar,
//   MapPin,
//   Users,
//   ChevronDown,
// } from "lucide-react";


// // Interfaces remain the same
// interface ImageData {
//   src: string;
//   caption: string;
//   role?: string;
// }

// interface Committee {
//   name: string;
//   students: number;
//   images: ImageData[];
//   featured?: boolean;
//   description?: string;
//   achievements?: string[];
//   social?: { platform: string; url: string }[];
// }

// interface Leader {
//   name: string;
//   role: string;
//   image: string;
//   description?: string;
//   contact?: string;
//   achievements?: string[];
// }

// interface HostelGroup {
//   title: string;
//   members: Leader[];
//   description?: string;
// }

// const poppins = Poppins({
//   weight: ["400", "500", "600", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

// const hostelLeadership: HostelGroup[] = [
//   {
//     title: "Council of  Wardens",
//     description: "Faculty core commitee",
//     members: [
//       {
//         name: "Dr. Bheemsha Arya",
//         role: "Working Chairman, BMSETH ",
//         image: "/pr-1.png",
//         description: "",
//       },
//       {
//         name: "Dr. Rahul R",
//         role: "Secretary - NH, BMSETH",
//         image: "/s-1.png",
//         description: "",
//       },
//       {
//         name: "Dr.Boddapati Venkatesh",
//         role: "Secretary - IH, BMSETH",
//         image: "/sr-3.jpg",
//         description: "",
//       },
      
//       {
//         name: "Dr. Srinidhi M",
//         role: "Joint Secretary - NH",
//         image: "/j-1.png",
//         description: "",
//       },
//       {
//         name: "Smt Archana K",
//         role: "Joint Secretary - NH",
//         image: "/j-2.jpeg",
//         description: "",
//       },
//       {
//         name: "Hadagali Ashoka",
//         role: "Joint Secretary - IH",
//         image: "/j-3.jpeg",
//         description: "",
//       }

//     ],
//   },
//   {
//     title: "Hostel Wardens",
//     description: "Faculty members overseeing hostel management",
//     members: [
//       {
//         name: "Dr. Bandaru Mallikarjuna",
//         role: "Mess Warden",
//         image: "/w-1.jpg",
//         description: "",
//       },
//       {
//         name: "Dr. Sreenivasamurthy A",
//         role: "Hostel Warden",
//         image: "/w-2.jpeg",
//         description: "",
//       },
//       {
//         name: "Dr. Chetan Raj D",
//         role: "Hostel Warden",
//         image: "/w-3.jpeg",
//         description: "",
//       },
//       {
//         name: "Dr. Latha H N",
//         role: "Hostel Warden",
//         image: "/w-4.jpeg",
//         description: "",
//       },
//       {
//         name: "Sri Harish V Mekali",
//         role: "Hostel Warden",
//         image: "/w-5.jpeg",
//         description: "",
//       },
//       {
//         name: "Dr. Ambika K",
//         role: "Hostel Warden",
//         image: "/w-6.jpeg",
//         description: "",
//       },
//       {
//         name: "Dr. Shekar M",
//         role: "Hostel Warden",
//         image: "/w-7.jpg",
//         description: "",
//       },
//       {
//         name: "Dr. Shyamala G",
//         role: "Hostel Warden",
//         image: "/w-8.jpeg",
//         description: "",
//       },
//       {
//         name: "Dr. Madhusudhan K N",
//         role: "Hostel Warden",
//         image: "/w-9.jpg",
//         description: "",
//       },
//       {
//         name: "SRI. JOHN",
//         role: "Administrative Officer",
//         image: "/ao-1.png",
//         description: "",
//       }
//     ],
//   },
// ];

// const committees: Committee[] = [
//   {
//     name: "Core",
//     students: 11,
//     featured: true,
//     description: "Leading the vision and execution of Farouche",
//     images: [
//       { src: "/co-1.jpg", caption: "Akshanth" },
//       { src: "/co-2.jpg", caption: "Anshu" },
//       { src: "/co-3.jpg", caption: "Ayush" },
//       { src: "/co-4.JPG", caption: "Sachidananda" },
//       { src: "/co-5.jpg", caption: "Chirag" },
//       { src: "/co-6.jpg", caption: "Soumya" },
//       { src: "/co-7.jpg", caption: "Anushka" },
//       { src: "/co-8.jpg", caption: "Sujan" },
//       { src: "/co-9.jpg", caption: "Alok" },
//       { src: "/co-10.jpg", caption: "Aakash" },
//       { src: "/co-11.jpg", caption: "Avani" },
//     ],
//   },
//   {
//     name: "Technical",
//     students: 2,
//     description: "Leading the technical aspects of Farouche",
//     images: [
//       { src: "/t-1.jpg", caption: "Nithish" },
//       { src: "/t-2.png", caption: "Koushik" },
//     ],
//   },
//   {
//     name: "Sports",
//     students: 9,
//     description: "Organizing all sports events for Farouche",
//     images: [
//       { src: "/s-1.jpg", caption: "Lohit" },
//       { src: "/s-2.jpg", caption: "Borish" },
//       { src: "/s-3.jpg", caption: "Samith" },
//       { src: "/s-4.jpg", caption: "Shahid" },
//       { src: "/s-5.jpg", caption: "Tanisha" },
//       { src: "/s-7.jpg", caption: "Deeksha" },
//       { src: "/s-6.jpg", caption: "Dikshyant" },
//       { src: "/s-8.HEIC", caption: "Faraz" },
//       { src: "/s-9.jpeg", caption: "Amisha" },
//     ],
//   },
//   {
//     name: "Organising",
//     students: 5,
//     description: "Managing the overall organization of Farouche",
//     images: [
//       { src: "/o-1.jpg", caption: "Venkatesh" },
//       { src: "/o-3.jpg", caption: "Surakshith" },
//       { src: "/o-4.jpg", caption: "Chethan" },
//       { src: "/o-5.jpg", caption: "Kshitij" },
//       { src: "/o-6.png", caption: "Shashank" },
//     ],
//   },
//   {
//     name: "Cultural",
//     students: 6,
//     description: "Coordinating cultural activities for Farouche",
//     images: [
//       { src: "/c-1.jpg", caption: "Sai Raj" },
//       { src: "/c-2.jpg", caption: "Aadishwar" },
//       { src: "/c-3.jpg", caption: "Chanchal" },
//       { src: "/c-4.jpg", caption: "Varsha" },
//       { src: "/c-5.jpg", caption: "Sahil" },
//       { src: "/c-6.jpg", caption: "Kareena" },
//     ],
//   },
//   {
//     name: "Backdrop",
//     students: 5,
//     description: "Creating the visual experience of Farouche",
//     images: [
//       { src: "/b-1.jpg", caption: "Ankith" },
//       { src: "/b-2.jpg", caption: "Ananya" },
//       { src: "/b-3.jpg", caption: "Gautam" },
//       { src: "/b-4.jpg", caption: "Aarin" },
//       { src: "/b-5.webp", caption: "Parth" },
//     ],
//   },
//   {
//     name: "Food Fiesta",
//     students: 5,
//     description: "Managing food fiesta for Farouche",
//     images: [
//       { src: "/f-1.jpg", caption: "Krishn Maloo" },
//       { src: "/f-2.jpg", caption: "Sujay" },
//       { src: "/f-3.jpg", caption: "Aadhya" },
//       { src: "/f-4.jpg", caption: "Hasnain" },
//       { src: "/f-5.jpg", caption: "Harsh" },
//     ],
//   },
//   {
//     name: "Student Organising",
//     students: 3,
//     description: "Student representatives coordinating Farouche",
//     images: [
//       { src: "/so-1.jpg", caption: "Shreyansh" },
//       { src: "/so-2.jpg", caption: "Pramananda" },
//       { src: "/so-3.jpg", caption: "Robin" },
//     ],
//   },
// ];
// // Enhanced animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 30 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   },
//   exit: {
//     opacity: 0,
//     y: -30,
//     transition: {
//       duration: 0.5,
//       ease: "easeIn"
//     }
//   }
// };

// const staggerChildren = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const cardHover = {
//   rest: { scale: 1 },
//   hover: { 
//     scale: 1.02,
//     transition: {
//       duration: 0.3,
//       ease: "easeInOut"
//     }
//   }
// };

// // Enhanced Committee Modal Component
// const CommitteeModal = ({ committee, onClose }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     if (!selectedImage) {
//       const timer = setInterval(() => {
//         setCurrentImageIndex((prev) =>
//           prev === committee.images.length - 1 ? 0 : prev + 1
//         );
//       }, 3000);
//       return () => clearInterval(timer);
//     }
//   }, [selectedImage, committee.images.length]);

//   if (!committee) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-lg overflow-y-auto ${poppins.className}`}
//     >
//       <div className="container mx-auto px-4 py-20">
//         <button
//           onClick={onClose}
//           className="fixed top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
//         >
//           <ArrowLeft /> Back
//         </button>

//         <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
//           <h2 className="text-4xl md:text-6xl font-bold mb-4">
//             {committee.name}
//           </h2>
//           <p className="text-xl text-gray-400 mb-8">{committee.description}</p>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {committee.images.map((image, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="relative aspect-square group cursor-pointer"
//                 onClick={() => setSelectedImage(image)}
//               >
//                 <div className="absolute inset-0 rounded-xl overflow-hidden">
//                   <Image
//                     src={image.src}
//                     alt={image.caption}
//                     fill
//                     className="object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="absolute bottom-4 left-4 space-y-1">
//                       <p className="text-white font-medium">{image.caption}</p>
//                       {image.role && (
//                         <p className="text-purple-400 text-sm">{image.role}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
//             onClick={() => setSelectedImage(null)}
//           >
//             <div className="relative w-full max-w-4xl aspect-square">
//               <Image
//                 src={selectedImage.src}
//                 alt={selectedImage.caption}
//                 fill
//                 className="object-contain"
//               />
//               <p className="absolute bottom-4 left-4 text-white text-xl font-medium">
//                 {selectedImage.caption}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // Main Component with Enhanced Animations
// export default function Home() {
//   const [selectedCommittee, setSelectedCommittee] = useState(null);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   useEffect(() => {
//     const handleScroll = () => {
//       const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
//       const currentProgress = window.scrollY;
//       setScrollProgress((currentProgress / totalScroll) * 100);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <div className={`min-h-screen bg-black text-white ${poppins.className}`}>
//       {/* Enhanced progress bar */}
//       <motion.div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 z-50"
//         style={{ 
//           width: `${scrollProgress}%`,
//           backgroundSize: '200% 100%'
//         }}
//         animate={{
//           backgroundPosition: ['0% 50%', '100% 50%'],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           repeatType: "reverse"
//         }}
//       />

//       {/* Enhanced Hero Section */}
//       <div className="relative min-h-screen flex items-center justify-center">
//         <div className="absolute inset-0">
//           <video
//             src="/video.mp4"
//             autoPlay
//             loop
//             playsInline
//             muted
//             className="object-cover w-full h-full"
//           />
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" 
//           />
//         </div>

//         <div className="container mx-auto px-4 pt-20 relative z-10">
//           <motion.div
//             variants={staggerChildren}
//             initial="initial"
//             animate="animate"
//             className="text-center max-w-4xl mx-auto"
//           >
//             <motion.h1 
//               variants={fadeInUp}
//               className="text-6xl md:text-8xl font-bold mb-6"
//             >
//               <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//                 Farouche 25
//               </span>
//             </motion.h1>
            
//             <motion.p 
//               variants={fadeInUp}
//               className="text-xl md:text-2xl text-gray-300 mb-8"
//             >
//               Join us for an incredible celebration of talent, creativity, and community
//             </motion.p>

//             <motion.div 
//               variants={fadeInUp}
//               className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
//             >
//               <div className="flex items-center gap-2 text-gray-300">
//                 <Calendar className="w-5 h-5 text-purple-400" />
//                 <span>April - June, 2025</span>
//               </div>
//               <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-purple-400" />
//               <div className="flex items-center gap-2 text-gray-300">
//                 <Users className="w-5 h-5 text-purple-400" />
//                 <span>2000+ Participants</span>
//               </div>
//             </motion.div>

//             <motion.div variants={fadeInUp}>
//               <Link href="/events">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
//                 >
//                   Explore Events
//                 </motion.button>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>

//         <motion.div
//           animate={{ 
//             y: [0, 10, 0],
//             opacity: [0.5, 1, 0.5]
//           }}
//           transition={{ 
//             repeat: Infinity, 
//             duration: 2,
//             ease: "easeInOut"
//           }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2"
//         >
//           <ChevronDown className="w-6 h-6 text-purple-400" />
//         </motion.div>
//       </div>

//       {/* Enhanced Leadership Sections */}
//       {hostelLeadership.map((group, groupIndex) => (
//         <motion.section
//           key={group.title}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="container mx-auto px-4 py-20"
//         >
//           <motion.h2
//             variants={fadeInUp}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             className="text-5xl md:text-7xl font-bold text-center mb-16"
//           >
//             <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//               {group.title}
//             </span>
//           </motion.h2>

//           {group.description && (
//             <motion.p
//               variants={fadeInUp}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//               className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
//             >
//               {group.description}
//             </motion.p>
//           )}

//           <motion.div
//             variants={staggerChildren}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {group.members.map((member, idx) => (
//               <motion.div
//                 key={member.name}
//                 variants={fadeInUp}
//                 whileHover={cardHover.hover}
//                 className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50"
//               >
//                 <div className="relative z-10 flex flex-col items-center text-center">
//                   <motion.div 
//                     whileHover={{ scale: 1.05 }}
//                     className="relative w-32 h-32 mb-4 rounded-full overflow-hidden"
//                   >
//                     <Image
//                       src={member.image}
//                       alt={member.name}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-110"
//                       priority={idx < 3}
//                     />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
//                   <p className="text-purple-400 mb-2">{member.role}</p>
//                   {member.description && (
//                     <p className="text-gray-400 text-sm">{member.description}</p>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.section>
//       ))}

//       {/* Enhanced Committees Section */}
//       <motion.section
//   id="committees"
//   initial={{ opacity: 0 }}
//   whileInView={{ opacity: 1 }}
//   viewport={{ once: true }}
//   className="container mx-auto px-4 py-20"
// >
//   <motion.h2
//     variants={fadeInUp}
//     initial="initial"
//     whileInView="animate"
//     viewport={{ once: true }}
//     className="text-5xl md:text-7xl font-bold text-center mb-16"
//   >
//     <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//       Our Committees
//     </span>
//   </motion.h2>

//   <motion.div
//     variants={staggerChildren}
//     initial="initial"
//     whileInView="animate"
//     viewport={{ once: true }}
//     className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//   >
//     {committees.map((committee, idx) => (
//       <motion.div
//         key={committee.name}
//         variants={fadeInUp}
//         whileHover={cardHover.hover}
//         onClick={() => setSelectedCommittee(committee)}
//         className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50 cursor-pointer hover:border-purple-500 transition-colors duration-300"
//       >
//         <div className="relative z-10">
//           <h3 className="text-2xl font-bold mb-2">{committee.name}</h3>
//           <p className="text-gray-400 mb-4">{committee.description}</p>
//           <motion.span 
//             whileHover={{ scale: 1.05 }}
//             className="inline-block px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm"
//           >
//             {committee.students} Members
//           </motion.span>
//         </div>
//       </motion.div>
//     ))}
//   </motion.div>
// </motion.section>

//       {/* Committee Modal */}
//       <AnimatePresence mode="wait">
//         {selectedCommittee && (
//           <CommitteeModal
//             committee={selectedCommittee}
//             onClose={() => setSelectedCommittee(null)}
//           />
//         )}
//       </AnimatePresence>
//       {/* Footer with scroll to top button */}
//       <motion.footer 
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="bg-black/50 border-t border-purple-900/30 py-8 mt-20"
//       >
        
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col items-center justify-center gap-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//               className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
//             >
//               Back to Top
//             </motion.button>
//           </div>
//         </div>
//       </motion.footer>
//     </div>
//   );
// }
'use client'

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}