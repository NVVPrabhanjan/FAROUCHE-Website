"use client";

import Link from "next/link";

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-8 py-16">
      <div className="max-w-lg w-full mx-auto space-y-12">

        {/* Header */}
        <div>
          <p className="text-sm tracking-widest uppercase text-gray-500 mb-3">Official Store</p>
          <h1 className="text-5xl font-bold tracking-tight">Farouche Merch</h1>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Categories */}
        <div className="space-y-4">
          <Link
            href="/merch/fest"
            className="flex items-center justify-between w-full px-6 py-6 rounded-xl bg-white/5 hover:bg-white/10 transition group"
          >
            <div className="space-y-1">
              <p className="text-xl font-semibold">Fest Merch</p>
              <p className="text-base text-gray-400">Official festival merchandise</p>
            </div>
            <span className="text-2xl text-gray-600 group-hover:text-white transition">→</span>
          </Link>

          <Link
            href="/merch/sports"
            className="flex items-center justify-between w-full px-6 py-6 rounded-xl bg-white/5 hover:bg-white/10 transition group"
          >
            <div className="space-y-1">
              <p className="text-xl font-semibold">Sports Merch</p>
              <p className="text-base text-gray-400">Official sports merchandise</p>
            </div>
            <span className="text-2xl text-gray-600 group-hover:text-white transition">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}