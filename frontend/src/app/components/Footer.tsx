'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    // { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/bmshostels?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
    // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/About' },
    { name: 'Events', href: '/events' },
    { name: 'Results', href: '/Results' },
    ]

  return (
    <footer className="bg-black border-t border-purple-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Farouche 25
              </span>
            </h3>
            <p className="text-gray-300 mb-4">
              Join us for three days of excitement, creativity, and celebration at the biggest hostel festival of the year.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-purple-400">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>BMSETH, Bull Temple Rd, Basavanagudi, Bengaluru, Karnataka 560019</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>+91 7483119808</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:hostelfest2023@nmamit.in"
                  className="hover:text-white transition-colors"
                >
                  design.farouche25@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} FAROUCHE25. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}