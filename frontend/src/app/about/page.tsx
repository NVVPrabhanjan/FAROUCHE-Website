// 'use client'
// import React, { useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { 
//   Users, 
//   Music, 
//   Film, 
//   Palette, 
//   Utensils, 
//   Gamepad, 
//   Mic, 
//   Paintbrush,
//   PartyPopper,
//   Sparkles,
//   Music2,
//   Camera
// } from 'lucide-react';
// import CreditCardGrid from '../components/CreditCard';

// // Optimized animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut"
//     }
//   }
// };

// const staggerContainer = {
//   initial: { opacity: 0 },
//   animate: { 
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.1
//     }
//   }
// };

// // Data arrays with unique icons for each event
// const events = [
//   {
//     title: "Rafaga",
//     description: "The yearly orientation event for freshmen, brimming with engaging interactions between newcomers and upperclassmen, featuring a lively schedule of dancing, music, performances, refreshments, and guidance from mentors.",
//     icon: Users
//   },
//   {
//     title: "Holi",
//     description: "An occasion where we come together to celebrate the joyous festival of Holi, creating cherished memories away from our hometowns in the comforting embrace of our second home, surrounded by beloved friends and companions.",
//     icon: Paintbrush
//   },
//   {
//     title: "Farouche",
//     description: "Farouche is a month-long hostel festival filled with a dynamic array of activities, including spontaneous performances, dancing, singing, trivia competitions, a culinary extravaganza, various sports tournaments, and a mix of indoor and outdoor recreational pursuits.",
//     icon: PartyPopper
//   },
//   {
//     title: "Flash Mob",
//     description: "The Flashmob, performed during the inauguration of Farouche, adds an electrifying start to the festival. This dynamic performance is paired with the logo reveal, creating a memorable visual moment that sets the tone for the month-long celebration.",
//     icon: Music
//   },
//   {
//     title: "Chiguru",
//     description: "Chiguru is a vibrant celebration that pays homage to Karnataka's diverse cultural legacy, featuring a variety of activities such as indulging in delicious cuisine, engaging in traditional dances, enjoying soulful music, and fostering a profound connection to our cultural heritage.",
//     icon: Music2
//   },
//   {
//     title: "Movie Night",
//     description: "Movie Night is a delightful gathering where we come together to enjoy a curated Kannada film, immerse ourselves in captivating storytelling, share in the joy of cinema, and strengthen our bonds through the shared experience of film and culture.",
//     icon: Film
//   }
// ];

// const activities = [
//   {
//     title: "Back Drop",
//     description: "Students create a stunning backdrop by painting it according to a specific theme. The backdrop adds a unique visual element, making the event even more memorable.",
//     icon: Palette
//   },
//   {
//     title: "Food Fiesta",
//     description: "Food Fiesta is a unique event where students take the lead in cooking and serving meals for the entire day, bringing creativity to the kitchen. The mess is transformed with vibrant decorations that align with the chosen theme.",
//     icon: Utensils
//   }
// ];

// const sports = [
//   { name: "OUTDOOR", icon: Gamepad },
//   { name: "INDOOR", icon: Mic },
//   { name: "E-SPORTS", icon: Sparkles }
// ];

// const culturalEvents = [
//   { name: "Group Dance", subtitle: "Rhythm Rascals", icon: Music },
//   { name: "Solo Dance", subtitle: "Jackson ka baap", icon: Users },
//   { name: "Duet Dance", subtitle: "Shake it up", icon: PartyPopper },
//   { name: "Solo Singing", subtitle: "Pitch Perfect", icon: Mic },
//   { name: "Wall Painting", subtitle: "Art beat", icon: Palette },
//   { name: "Adult Quiz", subtitle: "Buzzer Kings", icon: Gamepad },
//   { name: "Stand up", subtitle: "One Mic Stand", icon: Mic },
//   { name: "Mobile Phone Photography", subtitle: "Click it up", icon: Camera }
// ];

// // Custom hook for scroll-triggered animations
// const useScrollAnimation = () => {
//   const controls = useAnimation();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('.animate-section');
      
//       sections.forEach(section => {
//         const rect = section.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight * 0.8;
        
//         if (isVisible) {
//           section.classList.add('animate');
//         }
//       });
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Check on initial load
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return controls;
// };

// export default function About() {
//   const controls = useScrollAnimation();
  
//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       {/* Hero Section */}
//       <div className="relative min-h-[45vh] flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
//         <div className="container mx-auto px-4 text-center">
//           <motion.h1 
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             className="text-6xl md:text-8xl font-bold mb-6"
//           >
//             <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//               About Farouche
//             </span>
//           </motion.h1>
//           <motion.p 
//             variants={fadeInUp}
//             initial="initial"
//             animate="animate"
//             className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
//           >
//             A celebration of talent, culture, and community spirit
//           </motion.p>
//         </div>
//       </div>

//       {/* Main Events Section */}
//       <motion.section
//         className="container mx-auto px-4 py-20 animate-section"
//         variants={staggerContainer}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.h2
//           variants={fadeInUp}
//           className="text-4xl md:text-5xl font-bold text-center mb-16"
//         >
//           <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//             Our Events
//           </span>
//         </motion.h2>

//         <motion.div 
//           className="grid md:grid-cols-2 gap-8"
//           variants={staggerContainer}
//         >
//           {events.map((event, idx) => (
//             <motion.div
//               key={event.title}
//               variants={fadeInUp}
//               className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1"
//             >
//               {React.createElement(event.icon, { className: "w-8 h-8 text-purple-400 mb-4" })}
//               <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
//               <p className="text-gray-400">{event.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.section>

//       {/* Activities Section */}
//       <motion.section
//         className="container mx-auto px-4 py-20 animate-section"
//         variants={staggerContainer}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.h2
//           variants={fadeInUp}
//           className="text-4xl md:text-5xl font-bold text-center mb-16"
//         >
//           <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//             Special Activities
//           </span>
//         </motion.h2>

//         <motion.div 
//           className="grid md:grid-cols-2 gap-8"
//           variants={staggerContainer}
//         >
//           {activities.map((activity) => (
//             <motion.div
//               key={activity.title}
//               variants={fadeInUp}
//               className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1"
//             >
//               {React.createElement(activity.icon, { className: "w-8 h-8 text-purple-400 mb-4" })}
//               <h3 className="text-2xl font-bold mb-3">{activity.title}</h3>
//               <p className="text-gray-400">{activity.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.section>

//       {/* Sports Section */}
//       <motion.section
//         className="container mx-auto px-4 py-20 animate-section"
//         variants={staggerContainer}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.h2
//           variants={fadeInUp}
//           className="text-4xl md:text-5xl font-bold text-center mb-16"
//         >
//           <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//             Sports Categories
//           </span>
//         </motion.h2>

//         <motion.div 
//           className="grid md:grid-cols-3 gap-8"
//           variants={staggerContainer}
//         >
//           {sports.map((sport) => (
//             <motion.div
//               key={sport.name}
//               variants={fadeInUp}
//               className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 text-center"
//             >
//               {React.createElement(sport.icon, { className: "w-8 h-8 text-purple-400 mb-4 mx-auto" })}
//               <h3 className="text-2xl font-bold">{sport.name}</h3>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.section>

//       {/* Cultural Events Section */}
//       <motion.section
//         className="container mx-auto px-4 py-20 animate-section"
//         variants={staggerContainer}
//         initial="initial"
//         whileInView="animate"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.h2
//           variants={fadeInUp}
//           className="text-4xl md:text-5xl font-bold text-center mb-16"
//         >
//           <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
//             Cultural Events
//           </span>
//         </motion.h2>

//         <motion.div 
//           className="grid md:grid-cols-3 lg:grid-cols-4 gap-8"
//           variants={staggerContainer}
//         >
//           {culturalEvents.map((event) => (
//             <motion.div
//               key={event.name}
//               variants={fadeInUp}
//               className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 text-center"
//             >
//               {React.createElement(event.icon, { className: "w-8 h-8 text-purple-400 mb-4 mx-auto" })}
//               <h3 className="text-xl font-bold mb-2">{event.name}</h3>
//               <p className="text-purple-400 text-sm">{event.subtitle}</p>
//             </motion.div>
//           ))}


//         </motion.div>
//       </motion.section>
//       <div className='my-10 '>
//       <CreditCardGrid/>
//       </div>
//       {/* Additional CSS for animation control */}
//       <style jsx global>{`
//         .animate-section {
//           opacity: 0;
//           transform: translateY(20px);
//           transition: opacity 0.5s ease, transform 0.5s ease;
//         }
        
//         .animate-section.animate {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       `}</style>
//     </div>
//   );
// }
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}