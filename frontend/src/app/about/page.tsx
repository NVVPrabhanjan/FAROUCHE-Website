'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Music, Users, Palette, Utensils, Gamepad, Mic, Film } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const events = [
  {
    title: "Rafaga",
    description: "The yearly orientation event for freshmen, brimming with engaging interactions between newcomers and upperclassmen, featuring a lively schedule of dancing, music, performances, refreshments, and guidance from mentors.",
    icon: Users
  },
  {
    title: "Holi",
    description: "An occasion where we come together to celebrate the joyous festival of Holi, creating cherished memories away from our hometowns in the comforting embrace of our second home, surrounded by beloved friends and companions.",
    icon: Users
  },
  {
    title: "Farouche",
    description: "Farouche is a month-long hostel festival filled with a dynamic array of activities, including spontaneous performances, dancing, singing, trivia competitions, a culinary extravaganza, various sports tournaments, and a mix of indoor and outdoor recreational pursuits.",
    icon: Music
  },
  {
    title: "Flash Mob",
    description: "The Flashmob, performed during the inauguration of Farouche, adds an electrifying start to the festival. This dynamic performance is paired with the logo reveal, creating a memorable visual moment that sets the tone for the month-long celebration.",
    icon: Music
  },
  {
    title: "Chiguru",
    description: "Chiguru is a vibrant celebration that pays homage to Karnataka's diverse cultural legacy, featuring a variety of activities such as indulging in delicious cuisine, engaging in traditional dances, enjoying soulful music, and fostering a profound connection to our cultural heritage.",
    icon: Music
  },
  {
    title: "Movie Night",
    description: "Movie Night is a delightful gathering where we come together to enjoy a curated Kannada film, immerse ourselves in captivating storytelling, share in the joy of cinema, and strengthen our bonds through the shared experience of film and culture.",
    icon: Film
  }
];

const activities = [
  {
    title: "Back Drop",
    description: "Students create a stunning backdrop by painting it according to a specific theme. The backdrop adds a unique visual element, making the event even more memorable.",
    icon: Palette
  },
  {
    title: "Food Fiesta",
    description: "Food Fiesta is a unique event where students take the lead in cooking and serving meals for the entire day, bringing creativity to the kitchen. The mess is transformed with vibrant decorations that align with the chosen theme.",
    icon: Utensils
  }
];

const sports = [
  "OUTDOOR",
  "INDOOR",
  "E-SPORTS"
];

const culturalEvents = [
  { name: "Group Dance", subtitle: "Rhythm Rascals" },
  { name: "Solo Dance", subtitle: "Jackson ka baap" },
  { name: "Duet Dance", subtitle: "Shake it up" },
  { name: "Solo Singing", subtitle: "Pitch Perfect" },
  { name: "Wall Painting", subtitle: "Art beat" },
  { name: "Adult Quiz", subtitle: "Buzzer Kings" },
  { name: "Stand up", subtitle: "One Mic Stand" },
  { name: "Mobile Phone Photography", subtitle: "Click it up" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-[45vh] flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              About Farouche
            </span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            A celebration of talent, culture, and community spirit
          </motion.p>
        </div>
      </div>

      {/* Main Events Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Our Events
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-colors duration-300"
            >
              <event.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-400">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Activities Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Special Activities
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity) => (
            <motion.div
              key={activity.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-colors duration-300"
            >
              <activity.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">{activity.title}</h3>
              <p className="text-gray-400">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Sports Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Sports Categories
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <motion.div
              key={sport}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-colors duration-300 text-center"
            >
              <Gamepad className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold">{sport}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Cultural Events Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Cultural Events
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {culturalEvents.map((event) => (
            <motion.div
              key={event.name}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gradient-to-b from-purple-900/20 to-black/20 rounded-2xl p-6 border border-purple-900/30 hover:border-purple-500 transition-colors duration-300 text-center"
            >
              <Mic className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">{event.name}</h3>
              <p className="text-purple-400 text-sm">{event.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}