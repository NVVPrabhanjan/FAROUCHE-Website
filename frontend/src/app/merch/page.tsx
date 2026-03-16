"use client";

import Link from "next/link";

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Farouche Merch</h1>
          <p className="text-gray-500 mt-1 text-sm">Choose a category</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/merch/fest"
            className="flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition min-h-[140px]"
          >
            <span className="text-xs font-medium text-purple-400 border border-purple-400/40 bg-purple-400/10 rounded-full px-2.5 py-0.5 w-fit">
              Fest
            </span>
            <div>
              <p className="text-base font-semibold text-white mt-3">Fest Merch</p>
              <p className="text-xs text-gray-500 mt-0.5">Official fest merchandise</p>
              <p className="text-xs text-purple-400 mt-3">/merch/fest →</p>
            </div>
          </Link>

          <Link
            href="/merch/sports"
            className="flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition min-h-[140px]"
          >
            <span className="text-xs font-medium text-emerald-400 border border-emerald-400/40 bg-emerald-400/10 rounded-full px-2.5 py-0.5 w-fit">
              Sports
            </span>
            <div>
              <p className="text-base font-semibold text-white mt-3">Sports Merch</p>
              <p className="text-xs text-gray-500 mt-0.5">Official sports merchandise</p>
              <p className="text-xs text-emerald-400 mt-3">/merch/sports →</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}