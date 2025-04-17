'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, ChevronRight, Home, Calendar, Trophy, Info } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Home')

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Results', href: '/results', icon: Trophy }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6">
          {/* Increased height from h-16 to h-20 */}
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-4">
              {/* Increased logo size */}
              <Image
                src="/logo1.png"
                alt="Logo"
                width={90}
                height={60}
                className="rounded-lg"
                priority
              />
              <div>
                {/* Increased text sizes */}
                {/* <span className="text-2xl font-semibold text-white">Farouche </span>
                <span className="text-2xl font-semibold text-purple-400">25</span> */}
              </div>
            </Link>

            <div className="hidden md:flex items-center">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-5 py-3 mx-1 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all text-lg"
                  >
                    {/* Increased icon size */}
                    <Icon size={22} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3"
            >
              {/* Increased icon size */}
              {mobileMenuOpen ? <X className="text-white" size={28} /> : <Menu className="text-white" size={28} />}
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
                    className="flex items-center justify-between p-4 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg text-lg my-1"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Increased icon size */}
                      <Icon size={22} />
                      <span>{item.name}</span>
                    </div>
                    {/* Increased icon size */}
                    <ChevronRight size={20} />
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