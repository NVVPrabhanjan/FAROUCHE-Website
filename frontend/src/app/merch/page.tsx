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

// "use client"

// import Link from "next/link"

// export default function MerchPage() {
//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">

//       {/* Subtle animated grain overlay */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

//         .grain {
//           position: fixed;
//           inset: 0;
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
//           pointer-events: none;
//           z-index: 10;
//           opacity: 0.35;
//         }

//         .glow-ring {
//           position: absolute;
//           width: 500px;
//           height: 500px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
//           border: 1px solid rgba(255,255,255,0.05);
//           animation: pulse-ring 4s ease-in-out infinite;
//         }

//         @keyframes pulse-ring {
//           0%, 100% { transform: scale(1); opacity: 0.4; }
//           50% { transform: scale(1.08); opacity: 0.8; }
//         }

//         .fade-in {
//           animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
//         }
//         .fade-in-delay-1 { animation-delay: 0.15s; }
//         .fade-in-delay-2 { animation-delay: 0.3s; }
//         .fade-in-delay-3 { animation-delay: 0.5s; }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         .tag {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 11px;
//           font-weight: 400;
//           letter-spacing: 0.25em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.35);
//         }

//         .headline {
//           font-family: 'Bebas Neue', sans-serif;
//           font-size: clamp(64px, 14vw, 130px);
//           line-height: 0.92;
//           color: #fff;
//           letter-spacing: 0.02em;
//         }

//         .sub {
//           font-family: 'DM Sans', sans-serif;
//           font-weight: 300;
//           font-size: clamp(14px, 2vw, 16px);
//           color: rgba(255,255,255,0.45);
//           letter-spacing: 0.03em;
//           line-height: 1.7;
//         }

//         .divider {
//           width: 40px;
//           height: 1px;
//           background: rgba(255,255,255,0.15);
//         }

//         .home-btn {
//           font-family: 'DM Sans', sans-serif;
//           font-size: 12px;
//           font-weight: 400;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.5);
//           border: 1px solid rgba(255,255,255,0.12);
//           padding: 12px 28px;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//           text-decoration: none;
//           display: inline-block;
//         }
//         .home-btn:hover {
//           color: #fff;
//           border-color: rgba(255,255,255,0.5);
//           background: rgba(255,255,255,0.04);
//         }
//       `}</style>

//       <div className="grain" />
//       <div className="glow-ring" />

//       <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-xl">

//         {/* Tag */}
//         <p className="tag fade-in">Merch Drop</p>

//         {/* Headline */}
//         <h1 className="headline fade-in fade-in-delay-1">
//           Coming<br />Soon
//         </h1>

//         <div className="divider fade-in fade-in-delay-1" />

//         {/* Body copy */}
//         <p className="sub fade-in fade-in-delay-2">
//           We're working on something worth wearing.<br />
//           Stay updated — we'll let you know the moment it's live.
//         </p>

//         {/* CTA */}
//         <div className="fade-in fade-in-delay-3 mt-2">
//           <Link href="/" className="home-btn">
//             Go Home
//           </Link>
//         </div>

//       </div>
//     </div>
//   )
// }