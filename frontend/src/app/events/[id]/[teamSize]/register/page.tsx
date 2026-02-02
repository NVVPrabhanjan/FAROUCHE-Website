"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { REGISTRATION_API_END_POINT } from "@/utils/constants";

export default function EventRegistration() {
  const { id, teamSize } = useParams();
  const router = useRouter();
  const parsedTeamSize = parseInt(teamSize as string) || 1;
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    hostelName: "",
    year: "",
  });

  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  useEffect(() => {
    if (parsedTeamSize > 1) {
      setTeamMembers(Array(parsedTeamSize - 1).fill(""));
    }
  }, [parsedTeamSize]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamMemberChange = (index: number, value: string) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic Validation
      if (!/^\d{10}$/.test(formData.phone)) throw new Error("Phone must be 10 digits");
      if (!/^[a-zA-Z0-9._%+-]+@(bmsce\.ac\.in|bmsca\.org|bmccl\.ac\.in)$/.test(formData.email)) {
         throw new Error("Use official college email (@bmsce.ac.in)");
      }

      const res = await fetch(`${REGISTRATION_API_END_POINT}/createRegistration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: formData.name,
          email: formData.email,
          hostelName: formData.hostelName,
          phoneNumber: formData.phone,
          year: formData.year,
          teamMembers: parsedTeamSize > 1 ? teamMembers : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setIsSuccess(true);
      setTimeout(() => router.push('/events'), 4000);

    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 flex flex-col">
      
      {/* Minimal Header */}
      <header className="px-6 py-8 border-b border-white/10 flex justify-between items-center">
         <Link href={`/events/${id}/${teamSize}`} className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            <span>Cancel</span>
         </Link>
         <span className="font-cinzel font-bold text-xl tracking-wider">REGISTRY</span>
      </header>

      {/* Main Form Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
         
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
         
         <div className="w-full max-w-2xl relative z-10">
            
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 font-cinzel uppercase tracking-tight">Participant Details</h1>
                <p className="font-mono text-sm text-neutral-500 uppercase tracking-widest">
                    {parsedTeamSize > 1 ? `Team Registration / ${parsedTeamSize} Members` : "Individual Entry Protocol"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Section: Leader Info */}
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        <div className="group">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">Full Name</label>
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text" 
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-purple-500 focus:outline-none transition-colors rounded-none"
                                placeholder="ENTER NAME"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">College Email</label>
                            <input 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email" 
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-purple-500 focus:outline-none transition-colors rounded-none"
                                placeholder="ENTER EMAIL"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        <div className="group">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">Phone (10 Digits)</label>
                            <input 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel" 
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-purple-500 focus:outline-none transition-colors rounded-none"
                                placeholder="0000000000"
                            />
                        </div>
                         <div className="group">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">Hostel Block</label>
                            <input 
                                name="hostelName"
                                value={formData.hostelName}
                                onChange={handleChange}
                                type="text" 
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-purple-500 focus:outline-none transition-colors rounded-none"
                                placeholder="ENTER HOSTEL"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">Year</label>
                            <select 
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-purple-500 focus:outline-none transition-colors rounded-none text-white [&>option]:bg-black"
                            >
                                <option value="">SELECT</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section: Team Members */}
                {parsedTeamSize > 1 && (
                    <div className="pt-8 border-t border-white/10">
                        <h3 className="font-cinzel text-2xl mb-8 text-neutral-300">Team Manifest</h3>
                        <div className="space-y-6">
                            {teamMembers.map((member, idx) => (
                                <div key={idx} className="group">
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 group-focus-within:text-purple-500 transition-colors">
                                        Member 0{idx + 2} Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={member}
                                        onChange={(e) => handleTeamMemberChange(idx, e.target.value)}
                                        required
                                        className="w-full bg-transparent border-b border-white/20 py-2 text-lg focus:border-purple-500 focus:outline-none transition-colors rounded-none"
                                        placeholder="ENTER NAME"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/50 p-4 flex items-center gap-4 text-red-500"
                        >
                            <AlertTriangle size={20} />
                            <span className="font-mono text-sm uppercase">{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submit Action */}
                <div className="pt-8">
                    <button 
                        type="submit" 
                        disabled={isLoading || isSuccess}
                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-5 hover:bg-purple-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Processing Protocol..." : "Confirm Registration"}
                    </button>
                </div>

            </form>
         </div>
      </main>

      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 bg-black flex items-center justify-center p-6"
            >
                <div className="text-center">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 text-black"
                    >
                        <Check size={48} strokeWidth={3} />
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-cinzel font-bold mb-6 text-white uppercase tracking-tight">Access Granted</h2>
                    <p className="font-mono text-neutral-500 uppercase tracking-widest mb-12">Registration Complete. Welcome to Farouche.</p>
                    <div className="w-1 h-24 bg-gradient-to-b from-purple-500 to-transparent mx-auto" />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}