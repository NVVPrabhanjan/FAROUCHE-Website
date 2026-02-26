'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Instagram, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Results', href: '/results' },
    { name: 'Gallery', href: '/gallery' },
  ]

  const contactInfo = [
    { icon: MapPin, text: 'BMSETH, Bull Temple Rd, Bengaluru' },
    { icon: Phone, text: '+91 7483119808' },
    { icon: Mail, text: 'technical.farouche25@gmail.com' },
  ]

  return (
    <footer className="bg-black border-t border-white/10 relative overflow-hidden">
      
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03]">
         <h1 className="text-[20vw] font-bold font-cinzel tracking-tighter text-white leading-none">FAROUCHE</h1>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
         
         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-b border-white/10 pb-16">
            
            <div className="md:col-span-5 space-y-8">
                <div>
                    <h2 className="text-3xl font-bold font-cinzel text-white tracking-wider mb-2">FAROUCHE<span className="text-purple-500">.</span></h2>
                    <p className="text-neutral-500 max-w-sm leading-relaxed">
                        The ultimate hostel festival celebrating creativity, competition, and camaraderie. 
                        Join the legacy of excellence.
                    </p>
                </div>
                <div className="flex gap-4">
                     <a 
                        href="https://www.instagram.com/bmshostels/" 
                        target="_blank"
                        className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                         <Instagram size={18} />
                     </a>
                </div>
            </div>

            
            <div className="md:col-span-3">
                <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Explore</h3>
                <ul className="space-y-4">
                    {quickLinks.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors">
                                <span className="uppercase tracking-wider text-sm">{link.name}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

             
             <div className="md:col-span-4">
                <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Contact</h3>
                <ul className="space-y-6">
                    {contactInfo.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                            <div className="mt-1 text-purple-500"><item.icon size={18} /></div>
                            <span className="text-neutral-300 text-sm leading-relaxed">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
         </div>

         
         <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-600 uppercase tracking-widest">
            <p>&copy; {currentYear} Farouche. All rights reserved.</p>
            <div className="flex gap-8">
                <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            </div>
         </div>
      </div>
    </footer>
  )
}