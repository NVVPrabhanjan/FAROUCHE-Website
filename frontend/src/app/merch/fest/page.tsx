// "use client";

// import React, { useState } from "react";
// import { useAPIConfig } from "@/context/APIConfigContext";
// import { toast } from "sonner";
// import { Loader2, ShoppingBag, Copy, Check } from "lucide-react";

// const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
// const HOSTELS = [
//   "Himalaya Block", "Godavari Block", "Vindhya Block", "Nilgiri Block",
//   "Nandi Block", "Tungabhadra Block", "Sapthagiri Block", "Aravali Block",
//   "Lal Bagh Block", "Banashankari Block", "Ganga Block", "Sarayu Block",
//   "Kaveri Block", "Sindhu Block", "Narmada Block", "Yamuna Block",
// ];
// const SIZES = ["S", "M", "L", "XL", "XXL"];
// const UPI_ID = "vanshnagpal@ptyes"; // Replace with actual UPI ID
// const QR_CODE_URL = "/QR.jpeg";

// export default function FestMerchPage() {
//   const { MERCH_API_END_POINT } = useAPIConfig();

//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
//   const [globalError, setGlobalError] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     name: "", email: "", phone: "", hostelName: "",
//     academicYear: "1st Year", transactionId: "", size: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
//     setFieldErrors((p) => { const n = { ...p }; delete n[e.target.name]; return n; });
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(UPI_ID);
//     setCopied(true);
//     toast.success("UPI ID copied!");
//     setTimeout(() => setCopied(false), 2500);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setGlobalError(null);
//     setFieldErrors({});

//     // Client-side transaction ID validation
//     if (!/^\d{12}$/.test(form.transactionId)) {
//       setFieldErrors({ transactionId: "Transaction ID must be exactly 12 digits." });
//       toast.error("Transaction ID must be exactly 12 digits.");
//       setLoading(false);
//       return;
//     }

//     // Client-side size validation
//     if (!form.size) {
//       setFieldErrors({ size: "Please select a size." });
//       toast.error("Please select a size.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${MERCH_API_END_POINT}/fest`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSuccess(true);
//         toast.success("Order submitted!");
//       } else {
//         setGlobalError(data.message || "Submission failed. Please try again.");
//         toast.error(data.message || "Something went wrong.");
//       }
//     } catch {
//       toast.error("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── SUCCESS ──────────────────────────────────────────────────────────────
//   if (success) {
//     return (
//       <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
//         <div className="max-w-sm w-full text-center space-y-8">
//           <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
//             <ShoppingBag className="h-8 w-8 text-green-400" />
//           </div>
//           <div className="space-y-3">
//             <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Order Placed!</h1>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Your request is submitted. Admin will verify your payment and send a confirmation to your email.
//             </p>
//           </div>
//           <button
//             onClick={() => (window.location.href = "/")}
//             className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0a0a0a] text-white">
//       <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

//       {/* ── PAGE HEADER ── */}
//       <div className="text-center pt-12 pb-8 px-4 space-y-2">
//         <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-medium">Farouche 2026 · Fest</p>
//         <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
//           Fest Merchandise
//         </h1>
//         <p className="text-gray-400 text-sm max-w-xs mx-auto pt-1">
//           Official fest merch · Limited stock
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">

//         {/* ══════════════════════════════════════════════
//             SECTION 1 — PAYMENT (QR + UPI)
//         ══════════════════════════════════════════════ */}
//         <section className="space-y-5">
//           <div className="flex items-center gap-3">
//             <span className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center shrink-0">1</span>
//             <h2 className="text-lg font-semibold text-white">Make Payment</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             {/* QR — big, white bg, full visibility */}
//             <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-4">
//               <p className="text-black font-bold text-base tracking-wide">Scan to Pay</p>
//               <img
//                 src={QR_CODE_URL}
//                 alt="UPI QR Code"
//                 className="w-full max-w-xs mx-auto block rounded-xl"
//                 style={{ imageRendering: "crisp-edges" }}
//               />
//               <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white text-sm font-bold">
//                 Farouche Fest Merch
//               </div>
//               <p className="text-gray-500 text-xs text-center">PhonePe · GPay · Paytm · any UPI app</p>
//             </div>

//             {/* UPI ID + steps */}
//             <div className="flex flex-col gap-4">
//               {/* UPI ID copy */}
//               <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
//                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Or pay via UPI ID</p>
//                 <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
//                   <span className="font-mono text-white text-sm flex-1 select-all">{UPI_ID}</span>
//                   <button
//                     onClick={handleCopy}
//                     className="shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white"
//                     title="Copy UPI ID"
//                   >
//                     {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* How to pay */}
//               <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-4 flex-1">
//                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Steps</p>
//                 <ol className="space-y-4">
//                   {[
//                     { t: "Scan QR or open UPI App", d: "Use PhonePe, GPay, Paytm or any app" },
//                     { t: "Pay the required amount", d: "To Farouche — don't change the amount" },
//                     { t: "Save your Transaction ID", d: "You'll need it in the form below" },
//                     { t: "Fill & submit the form", d: "Complete Step 2 below" },
//                   ].map((s, i) => (
//                     <li key={i} className="flex gap-3 items-start">
//                       <span className="w-6 h-6 rounded-full bg-white/10 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
//                         {i + 1}
//                       </span>
//                       <div>
//                         <p className="text-sm text-white font-medium">{s.t}</p>
//                         <p className="text-xs text-gray-500 mt-0.5">{s.d}</p>
//                       </div>
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════════════════════
//             SECTION 2 — ORDER FORM
//         ══════════════════════════════════════════════ */}
//         <section className="space-y-5">
//           <div className="flex items-center gap-3">
//             <span className="w-7 h-7 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center shrink-0">2</span>
//             <h2 className="text-lg font-semibold text-white">Fill Order Details</h2>
//           </div>

//           <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8">

//             {globalError && (
//               <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
//                 <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shrink-0" />
//                 {globalError}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Personal */}
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Personal Info</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[
//                     { label: "Full Name", name: "name", type: "text" },
//                     { label: "Email Address", name: "email", type: "email" },
//                     { label: "Phone Number", name: "phone", type: "tel" },
//                   ].map((f) => (
//                     <div key={f.name} className="flex flex-col gap-1.5">
//                       <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{f.label}</label>
//                       <input
//                         type={f.type} name={f.name} required
//                         value={(form as any)[f.name]} onChange={handleChange}
//                         className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm bg-white/5 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition"
//                       />
//                     </div>
//                   ))}
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Hostel Name</label>
//                     <select
//                       name="hostelName" required value={form.hostelName} onChange={handleChange}
//                       className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm bg-white/5 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition appearance-none cursor-pointer"
//                     >
//                       <option value="" disabled className="bg-[#0a0a0a]">Select your hostel</option>
//                       {HOSTELS.map((h) => <option key={h} value={h} className="bg-[#0a0a0a]">{h}</option>)}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="h-px bg-white/5" />

//               {/* Academic + Transaction */}
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Academic & Payment</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Academic Year</label>
//                     <select
//                       name="academicYear" required value={form.academicYear} onChange={handleChange}
//                       className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm bg-white/5 text-white focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition appearance-none cursor-pointer"
//                     >
//                       {ACADEMIC_YEARS.map((y) => <option key={y} value={y} className="bg-[#0a0a0a]">{y}</option>)}
//                     </select>
//                   </div>
//                   <div className="flex flex-col gap-1.5">
//                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Transaction ID / UTR</label>
//                     <input
//                       type="text" name="transactionId" required value={form.transactionId} onChange={handleChange}
//                       placeholder="12-digit number from your UPI app"
//                       maxLength={12}
//                       className={`w-full rounded-xl border px-4 py-3 text-sm bg-white/5 text-white font-mono focus:outline-none focus:ring-2 transition placeholder-gray-700 ${
//                         fieldErrors.transactionId
//                           ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
//                           : "border-white/10 focus:border-white/30 focus:ring-white/10"
//                       }`}
//                     />
//                     {fieldErrors.transactionId && (
//                       <p className="text-xs text-red-400 font-medium">{fieldErrors.transactionId}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="h-px bg-white/5" />

//               {/* Size Selector */}
//               <div>
//                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">Select Size</p>
//                 <div className="flex flex-wrap gap-3">
//                   {SIZES.map((s) => {
//                     const sel = form.size === s;
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => {
//                           setForm((p) => ({ ...p, size: s }));
//                           setFieldErrors((p) => { const n = { ...p }; delete n.size; return n; });
//                         }}
//                         className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
//                           sel
//                             ? "bg-white text-black border-white ring-2 ring-white/30"
//                             : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
//                         }`}
//                       >
//                         {s}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {fieldErrors.size && (
//                   <p className="text-xs text-red-400 font-medium mt-1.5">{fieldErrors.size}</p>
//                 )}
//               </div>

//               {/* CTA */}
//               <button
//                 type="submit" disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-100 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading
//                   ? <><Loader2 className="animate-spin h-5 w-5" /> Submitting...</>
//                   : <><ShoppingBag className="h-5 w-5" /> Submit Order</>
//                 }
//               </button>

//               <p className="text-center text-xs text-gray-600">
//                 Payment will be verified by admin before order confirmation.
//               </p>
//             </form>
//           </div>
//         </section>

//       </div>

//       <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//     </div>
//   );
// }

"use client"

import Link from "next/link"

export default function MerchPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">

            {/* Subtle animated grain overlay */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400&display=swap');

        .grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 10;
          opacity: 0.35;
        }

        .glow-ring {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);
          border: 1px solid rgba(255,255,255,0.05);
          animation: pulse-ring 4s ease-in-out infinite;
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.8; }
        }

        .fade-in {
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .fade-in-delay-1 { animation-delay: 0.15s; }
        .fade-in-delay-2 { animation-delay: 0.3s; }
        .fade-in-delay-3 { animation-delay: 0.5s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 14vw, 130px);
          line-height: 0.92;
          color: #fff;
          letter-spacing: 0.02em;
        }

        .sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.03em;
          line-height: 1.7;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: rgba(255,255,255,0.15);
        }

        .home-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 12px 28px;
          border-radius: 2px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        .home-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.04);
        }
      `}</style>

            <div className="grain" />
            <div className="glow-ring" />

            <div className="relative z-10 text-center flex flex-col items-center gap-6 max-w-xl">

                {/* Tag */}
                <p className="tag fade-in">Merch Drop</p>

                {/* Headline */}
                <h1 className="headline fade-in fade-in-delay-1">
                    Coming<br />Soon
                </h1>

                <div className="divider fade-in fade-in-delay-1" />

                {/* Body copy */}
                <p className="sub fade-in fade-in-delay-2">
                    We're working on something worth wearing.<br />
                    Stay updated — we'll let you know the moment it's live.
                </p>

                {/* CTA */}
                <div className="fade-in fade-in-delay-3 mt-2">
                    <Link href="/" className="home-btn">
                        Go Home
                    </Link>
                </div>

            </div>
        </div>
    )
}