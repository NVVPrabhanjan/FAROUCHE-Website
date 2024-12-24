'use client'
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Poppins } from 'next/font/google';
import {
  ArrowLeft,
  X,
  Menu,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
} from "lucide-react";

// Interfaces
interface ImageData {
  src: string;
  caption: string;
  role?: string;
}

interface Committee {
  name: string;
  students: number;
  images: ImageData[];
  featured?: boolean;
  description?: string;
  achievements?: string[];
  social?: { platform: string; url: string }[];
}

interface Leader {
  name: string;
  role: string;
  image: string;
  description?: string;
  contact?: string;
  achievements?: string[];
}

interface HostelGroup {
  title: string;
  members: Leader[];
  description?: string;
}
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});
// Data
const hostelLeadership: HostelGroup[] = [
  {
    title: "Hostel Secretaries",
    description: "Student leaders managing hostel affairs",
    members: [
      {
        name: "Rahul Kumar",
        role: "Boys Hostel Secretary",
        image: "/rahul.jpg",
        description: "Managing boys hostel operations",
      },
      {
        name: "Priya Singh",
        role: "Girls Hostel Secretary",
        image: "/priya.jpg",
        description: "Managing girls hostel operations",
      },
    ],
  },
  {
    title: "Hostel Wardens",
    description: "Faculty members overseeing hostel management",
    members: [
      {
        name: "Dr. Rajesh Sharma",
        role: "Chief Warden",
        image: "/sharma.jpg",
        description: "Overall hostel administration",
      },
      {
        name: "Dr. Meera Patel",
        role: "Girls Hostel Warden",
        image: "/patel.jpg",
        description: "Girls hostel supervision",
      },
      {
        name: "Dr. Suresh Kumar",
        role: "Boys Hostel Warden",
        image: "/kumar.jpg",
        description: "Boys hostel supervision",
      },
    ],
  },
  {
    title: "Hostel Members",
    description: "Key personnel supporting hostel operations",
    members: [
      {
        name: "Amit Verma",
        role: "Maintenance Supervisor",
        image: "/amit.jpg",
        description: "Facility maintenance",
      },
      {
        name: "Sunita Devi",
        role: "Mess Manager",
        image: "/sunita.jpg",
        description: "Food services management",
      },
      {
        name: "Ravi Singh",
        role: "Security Head",
        image: "/ravi.jpg",
        description: "Security operations",
      },
    ],
  },
];

const committees: Committee[] = [
  {
    name: "Hostel Core",
    students: 11,
    featured: true,
    description: "Leading the vision and execution of HostelFest 2023",
    images: [
      { src: "/Akshant.jpg", caption: "Akshanth" },
      { src: "/Anshu.jpg", caption: "Anshu" },
      { src: "/Ayush.jpg", caption: "Ayush" },
      { src: "/Benner.jpg", caption: "Sachidananda" },
      { src: "/Chirag.jpg", caption: "Chirag" },
      { src: "/Soumya.jpg", caption: "Soumya" },
      { src: "/Anuskha.jpg", caption: "Anushka" },
      { src: "/Mama.jpg", caption: "Sujan" },
      { src: "/Aalok.jpg", caption: "Alok" },
      { src: "/hostel-core-10.jpg", caption: "Aakash" },
      { src: "/hostel-core-11.jpg", caption: "Avani" },
    ],
  },
  {
    name: "Technical Committee",
    students: 2,
    description: "Leading the technical aspects of HostelFest 2023",
    images: [
      { src: "/Koushik2.jpg", caption: "Nithish" },
      { src: "/Koushik.png", caption: "Koushik" },
    ],
  },
  {
    name: "Sport Committee",
    students: 9,
    description: "Organizing all sports events for HostelFest 2023",
    images: [
      { src: "/s1.jpg", caption: "Borish" },
      { src: "/s2.jpg", caption: "Lohit" },
      { src: "/s3.jpg", caption: "Samith" },
      { src: "/s4.jpg", caption: "Shahid" },
      { src: "/s5.jpg", caption: "Tanisha" },
      { src: "/s6.jpg", caption: "Deeksha" },
      { src: "/s7.jpg", caption: "Dikshyant" },
      { src: "/s8.HEIC", caption: "Faraz" },
      { src: "/s9.HEIC", caption: "Amisha" },
    ],
  },
  {
    name: "Organising",
    students: 6,
    description: "Managing the overall organization of HostelFest 2023",
    images: [
      { src: "/o1.jpg", caption: "Venkatesh" },
      { src: "/Sathvik.jpg", caption: "Saathvik" },
      { src: "/o3.jpg", caption: "Surakshith" },
      { src: "/o4.jpg", caption: "Chethan" },
      { src: "/o5.jpg", caption: "Kshitij" },
      { src: "/o6.png", caption: "Shashank" },
    ],
  },
  {
    name: "Cultural",
    students: 6,
    description: "Coordinating cultural activities for HostelFest 2023",
    images: [
      { src: "/c1.jpg", caption: "Sai Raj" },
      { src: "/c2.jpg", caption: "Aadishwar" },
      { src: "/c3.jpg", caption: "Chanchal" },
      { src: "/c4.jpg", caption: "Varsha" },
      { src: "/c5.jpg", caption: "Sahil" },
      { src: "/c6.jpg", caption: "Kareena" },
    ],
  },
  {
    name: "Backdrop",
    students: 5,
    description: "Creating the visual experience of HostelFest 2023",
    images: [
      { src: "/b1.jpg", caption: "Ankith" },
      { src: "/b2.jpg", caption: "Ananya" },
      { src: "/b3.jpg", caption: "Gautam" },
      { src: "/b4.jpg", caption: "Aarin" },
      { src: "/b5.webp", caption: "Parth" },
    ],
  },
  {
    name: "Food Fiesta",
    students: 5,
    description: "Managing food and refreshments for HostelFest 2023",
    images: [
      { src: "/f1.jpg", caption: "Krishn Maloo" },
      { src: "/f2.jpg", caption: "Sujay" },
      { src: "/f3.jpg", caption: "Aadhya" },
      { src: "/f4.png", caption: "Hasnain" },
      { src: "/f5.jpg", caption: "Harsh" },
    ],
  },
  {
    name: "Student Organising Committee",
    students: 3,
    description: "Student representatives coordinating HostelFest 2023",
    images: [
      { src: "/so1.jpg", caption: "Shreyansh" },
      { src: "/so2.jpg", caption: "Pramananda" },
      { src: "/so3.jpg", caption: "Robin" },
    ],
  },
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Committee Modal Component
const CommitteeModal = ({ committee, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!selectedImage) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === committee.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [selectedImage, committee.images.length]);

  if (!committee) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-lg overflow-y-auto ${poppins.className}`}
    >
      <div className="container mx-auto px-4 py-20">
        <button
          onClick={onClose}
          className="fixed top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft /> Back
        </button>

        <motion.div {...fadeInUp} className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {committee.name}
          </h2>
          <p className="text-xl text-gray-400 mb-8">{committee.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {committee.images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="relative aspect-square group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 space-y-1">
                      <p className="text-white font-medium">{image.caption}</p>
                      {image.role && (
                        <p className="text-purple-400 text-sm">{image.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl aspect-square">
              <Image
                src={selectedImage.src}
                alt={selectedImage.caption}
                fill
                className="object-contain"
              />
              <p className="absolute bottom-4 left-4 text-white text-xl font-medium">
                {selectedImage.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Component
export default function Home() {
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      setScrollProgress((currentProgress / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Admin", href: "/admin/login" },
  ];

  return (
    <div className={`min-h-screen bg-black text-white ${poppins.className}`}>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-purple-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
              >
                HostelFest
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-purple-900/50"
            >
              <div className="px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="block text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/img1.jpg"
            alt="HostelFest Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Farouche 25
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Join us for an incredible celebration of talent, creativity, and
              community
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>December 15-17, 2023</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-purple-400" />
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-purple-400" />
                <span>1000+ Participants</span>
              </div>
            </div>

            <Link href="/events">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Explore Events
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-purple-400" />
        </motion.div>
      </div>

      {/* Leadership Sections */}
      {hostelLeadership.map((group, groupIndex) => (
        <section key={group.title} className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {group.title}
            </span>
          </motion.h2>

          {group.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto"
            >
              {group.description}
            </motion.p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {group.members.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-purple-400 mb-2">{member.role}</p>
                  {member.description && (
                    <p className="text-gray-400 text-sm">
                      {member.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}

      {/* Committees Section */}
      <section id="committees" className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Our Committees
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {committees.map((committee, idx) => (
            <motion.div
              key={committee.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedCommittee(committee)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/50 to-black/50 p-6 border border-purple-900/50 cursor-pointer hover:border-purple-500 transition-colors duration-300"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">{committee.name}</h3>
                <p className="text-gray-400 mb-4">{committee.description}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm">
                  {committee.students} Members
                </span>
              </div>

              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                <Image
                  src={committee.images[0].src}
                  alt={committee.name}
                  fill
                  className="object-cover opacity-50"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Committee Modal */}
      <AnimatePresence>
        {selectedCommittee && (
          <CommitteeModal
            committee={selectedCommittee}
            onClose={() => setSelectedCommittee(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
