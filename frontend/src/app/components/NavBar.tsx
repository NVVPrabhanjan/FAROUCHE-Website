'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, ChevronRight, Home, Calendar, UserCircle } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Admin', href: '/admin/login', icon: UserCircle },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="rounded-lg"
                priority
              />
              <div>
                <span className="text-xl font-semibold text-white">Hostel</span>
                <span className="text-xl font-semibold text-purple-400">Fest</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 mx-1 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="container mx-auto px-6 py-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}