"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

// Components
import Hero from "./components/Hero";
import CreditCardGrid from "./components/CreditCard";
import HostelLeadershipSection from "./components/HostelLeadershipSection";
import CommitteesSection from "./components/CommitteesSection";
import ScrollProgressBar from "./components/ScrollProgressBar";

// Data
import { hostelLeadership, committees } from "@/data/homeData";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <div className={`min-h-screen bg-black text-white ${poppins.className}`}>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Hero Section */}
      <Hero />

      {/* Hostel Leadership Section */}
      <HostelLeadershipSection hostelLeadership={hostelLeadership} />


      {/* Committees Section */}
      <CommitteesSection committees={committees} fontClassName={poppins.className} />

      {/* Credit Card Grid */}
      <div className="my-10">
        <CreditCardGrid />
      </div>
    </div>
  );
}
