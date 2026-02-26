"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Music,
  Film,
  Palette,
  Utensils,
  Gamepad,
  Mic,
  Paintbrush,
  PartyPopper,
  Sparkles,
  Music2,
  Camera,
  ArrowRight
} from "lucide-react";


const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};


const events = [
  {
    title: "Rafaga",
    description: "The yearly orientation event for freshmen, a lively schedule of dancing, music, and guidance.",
    icon: Users,
  },
  {
    title: "Holi",
    description: "Celebrating the joyous festival of colors away from home with friends and companions.",
    icon: Paintbrush,
  },
  {
    title: "Farouche",
    description: "A month-long hostel festival with sports, cultural events, and culinary extravaganzas.",
    icon: PartyPopper,
  },
  {
    title: "Flash Mob",
    description: "An electrifying performance marking the inauguration and logo reveal of Farouche.",
    icon: Music,
  },
  {
    title: "Chiguru",
    description: "Paying homage to Karnataka's cultural legacy with cuisine, dance, and music.",
    icon: Music2,
  },
  {
    title: "Movie Night",
    description: "A curated cinema experience to strengthen bonds through captivating storytelling.",
    icon: Film,
  },
];

const activities = [
  {
    title: "Back Drop",
    description: "Creating stunning themed backdrops that add unique visual elements to events.",
    icon: Palette,
  },
  {
    title: "Food Fiesta",
    description: "Students take the lead in cooking and serving creative meals for the entire fraternity.",
    icon: Utensils,
  },
];

const sports = [
  { name: "OUTDOOR", icon: Gamepad },
  { name: "INDOOR", icon: Mic },
  { name: "E-SPORTS", icon: Sparkles },
];

const culturalEvents = [
  { name: "Group Dance", subtitle: "Rhythm Rascals", icon: Music },
  { name: "Solo Dance", subtitle: "Jackson ka baap", icon: Users },
  { name: "Duet Dance", subtitle: "Shake it up", icon: PartyPopper },
  { name: "Solo Singing", subtitle: "Pitch Perfect", icon: Mic },
  { name: "Wall Painting", subtitle: "Art beat", icon: Palette },
  { name: "Adult Quiz", subtitle: "Buzzer Kings", icon: Gamepad },
  { name: "Stand up", subtitle: "One Mic Stand", icon: Mic },
  { name: "Mobile Phone Photography", subtitle: "Click it up", icon: Camera },
];

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
        
      
      <section className="relative pt-40 pb-20 border-b border-white/10">
        <div className="container mx-auto px-6">
            <motion.div 
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="max-w-4xl"
            >
                <motion.span variants={fadeInUp} className="block text-purple-500 font-mono text-sm uppercase tracking-widest mb-4">

                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-6xl md:text-9xl font-bold font-cinzel tracking-tighter uppercase leading-none mb-8">
                    About<br/><span className="text-neutral-700">Farouche</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed">
                    More than a festival. A celebration of talent, culture, and the indomitable community spirit that defines our hostel life.
                </motion.p>
            </motion.div>
        </div>
      </section>

      
      <section className="py-24 border-b border-white/10">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <h2 className="text-4xl md:text-5xl font-bold font-cinzel uppercase tracking-wide">Signature Events</h2>
                <p className="font-mono text-neutral-500 text-sm uppercase tracking-widest">Curated Experiences</p>
            </div>

            <motion.div 
               variants={staggerContainer}
               initial="initial"
               whileInView="animate"
               viewport={{ once: true }}
               className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10"
            >
                {events.map((event) => (
                    <motion.div
                        key={event.title}
                        variants={fadeInUp}
                        className="group bg-black p-10 hover:bg-neutral-900/50 transition-colors duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        
                        <div className="mb-8 flex justify-between items-start">
                             <div className="p-3 rounded-full border border-white/10 text-neutral-400 group-hover:text-white group-hover:border-purple-500 transition-colors">
                                {React.createElement(event.icon, { size: 24 })}
                             </div>
                             <span className="font-mono text-xs text-neutral-600 group-hover:text-purple-400 transition-colors">01</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{event.title}</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors">
                            {event.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
         </div>
      </section>

      
      <section className="grid md:grid-cols-2 border-b border-white/10">
          
          <div className="p-12 md:p-20 border-b md:border-b-0 md:border-r border-white/10">
               <h3 className="text-3xl font-cinzel uppercase tracking-wider mb-10 text-center md:text-left">Special Activities</h3>
               <div className="space-y-8">
                   {activities.map(activity => (
                       <div key={activity.title} className="group border border-white/10 p-8 rounded-xl hover:border-purple-500/50 transition-colors">
                           <div className="flex items-center gap-4 mb-4">
                                <activity.icon className="text-purple-500" size={20} />
                                <h4 className="text-xl font-bold uppercase">{activity.title}</h4>
                           </div>
                           <p className="text-neutral-400 text-sm leading-relaxed">{activity.description}</p>
                       </div>
                   ))}
               </div>
          </div>

          
          <div className="p-12 md:p-20 bg-neutral-900/20">
              <h3 className="text-3xl font-cinzel uppercase tracking-wider mb-10 text-center md:text-left">Sports Categories</h3>
              <div className="grid gap-4">
                  {sports.map((sport, i) => (
                      <div key={sport.name} className="flex items-center justify-between p-6 border-b border-white/10 hover:pl-10 transition-all duration-300 group cursor-default">
                          <div className="flex items-center gap-6">
                              <span className="font-mono text-neutral-600 text-xs">0{i+1}</span>
                              <span className="text-xl font-bold tracking-widest">{sport.name}</span>
                          </div>
                          <sport.icon className="text-neutral-600 group-hover:text-purple-500 transition-colors" size={24} />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      
      <section className="py-24">
         <div className="container mx-auto px-6">
             <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-purple-500 font-mono text-sm uppercase tracking-widest mb-4">Talent Showcase</span>
                <h2 className="text-5xl md:text-7xl font-bold font-cinzel uppercase tracking-tight">Cultural Events</h2>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
                 {culturalEvents.map((event) => (
                     <motion.div 
                        key={event.name}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                        className="p-8 border-r border-b border-white/10 flex flex-col items-center text-center group cursor-pointer"
                     >
                         <div className="mb-6 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                             {React.createElement(event.icon, { size: 32 })}
                         </div>
                         <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{event.name}</h3>
                         <p className="text-xs font-mono text-purple-400 uppercase tracking-widest">{event.subtitle}</p>
                     </motion.div>
                 ))}
             </div>
         </div>
      </section>

    </div>
  );
}
