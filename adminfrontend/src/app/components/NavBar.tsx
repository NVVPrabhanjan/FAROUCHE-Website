'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Calendar, Trophy, Info, ImageIcon, LayoutDashboard, PlusCircle } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Home', href: '/', icon: Home },
    // { name: 'Create Event', href: '/create-event', icon: PlusCircle }, // Example future route
  ]

  return (
    <>
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                scrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'
            }`}
        >
          <div className="container mx-auto px-6 flex items-center justify-between">
             {/* Logo Section */}
             <Link href="/" className="flex items-center gap-4 group">
                {/* 
                <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-white/20 group-hover:border-purple-500 transition-colors">
                     <Image
                        src="/logo1.png"
                        alt="Farouche Logo"
                        fill
                        className="object-cover"
                     />
                </div>
                */}
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold tracking-[0.2em] font-cinzel leading-none text-white">FAROUCHE</span>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-purple-400">ADMIN</span>
                </div>
             </Link>

             {/* Desktop Navigation */}
             <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
                {navItems.map((item) => (
                    <Link 
                        key={item.name} 
                        href={item.href}
                        className="relative px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                    >
                         <span className="relative z-10">{item.name}</span>
                    </Link>
                ))}
             </nav>

             {/* Mobile Menu Trigger */}
             <button
               onClick={() => setMobileMenuOpen(true)}
               className="md:hidden p-2 text-white hover:text-purple-400 transition-colors"
             >
                <Menu size={24} />
             </button>
          </div>
        </header>

        {/* Full Screen Mobile Menu */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-8"
                >
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="absolute top-8 right-8 p-2 text-neutral-500 hover:text-white transition-colors"
                    >
                        <X size={32} />
                    </button>

                    <div className="flex flex-col items-center space-y-6">
                        {navItems.map((item, i) => (
                             <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                             >
                                <Link 
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-4xl md:text-6xl font-bold font-cinzel text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
                                >
                                    {item.name}
                                </Link>
                             </motion.div>
                        ))}
                    </div>

                    <div className="absolute bottom-10 left-0 w-full text-center">
                        <p className="text-xs font-mono text-neutral-600 uppercase tracking-[0.3em]">Farouche Admin</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  )
}