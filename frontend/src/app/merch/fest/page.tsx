"use client";

import React from "react";
import { Clock } from "lucide-react";

export default function FestMerchPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-foreground">
      <div className="max-w-md w-full text-center space-y-8 yugdhara-fade-in">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 yugdhara-glow" />
          <div className="absolute inset-2 rounded-full border border-primary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock className="h-9 w-9 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
            Farouche 2026
          </p>
          <h1 className="text-4xl text-white" style={{ fontFamily: "'Cinzel', serif" }}>
            Fest Merch
          </h1>
          <div className="w-12 h-px bg-primary mx-auto" />
          <h2 className="text-2xl text-primary font-medium mt-4 tracking-widest" style={{ fontFamily: "'Cinzel', serif" }}>
            Coming Soon
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm mt-4">
            The official Farouche 2026 fest merchandise is currently being designed. 
            Stay tuned for updates!
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => (window.location.href = "/merch")}
            className="w-full border border-primary/50 text-primary font-semibold py-3 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm tracking-widest uppercase yugdhara-glow"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Back to Category
          </button>
        </div>
      </div>
    </div>
  );
}