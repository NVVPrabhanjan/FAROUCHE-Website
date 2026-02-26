"use client";
import React from "react";

import Hero from "./components/Hero";
import CreditCardGrid from "./components/CreditCard";
import HostelLeadershipSection from "./components/HostelLeadershipSection";
import CommitteesSection from "./components/CommitteesSection";
import ScrollProgressBar from "./components/ScrollProgressBar";

import { hostelLeadership, committees } from "@/data/homeData";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollProgressBar />
      <Hero />
      <HostelLeadershipSection hostelLeadership={hostelLeadership} />
      <CommitteesSection committees={committees} />
      <div className="my-10">
        <CreditCardGrid />
      </div>
    </div>
  );
}
