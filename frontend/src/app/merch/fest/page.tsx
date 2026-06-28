"use client";

import React, { useState, useEffect } from "react";
import { useAPIConfig } from "@/context/APIConfigContext";
import { toast } from "sonner";
import { Loader2, ShoppingBag, CheckCircle2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
const HOSTELS = [
  "Himalaya Block", "Godavari Block", "Vindhya Block", "Nilgiri Block",
  "Nandi Block", "Tungabhadra Block", "Sapthagiri Block", "Aravali Block",
  "Lal Bagh Block", "Banashankari Block", "Ganga Block", "Sarayu Block",
  "Kaveri Block", "Sindhu Block", "Narmada Block", "Yamuna Block",
];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const PRICE = 399;

export default function FestMerchPage() {
  const { MERCH_API_END_POINT } = useAPIConfig();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", hostelName: "",
    academicYear: "1st Year", size: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => { const n = { ...p }; delete n[e.target.name]; return n; });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError(null);
    setFieldErrors({});

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Required";
    if (!form.email) errors.email = "Required";
    if (!form.phone) errors.phone = "Required";
    if (!form.hostelName) errors.hostelName = "Required";
    if (!form.size) errors.size = "Required";
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create Order
      const orderRes = await fetch(`${MERCH_API_END_POINT}/fest/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const orderData = await orderRes.json();

      if (!orderData.success) {
          throw new Error(orderData.message || "Failed to initiate payment.");
      }

      // 2. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FAROUCHE 2026",
        description: "Official Fest Merchandise",
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch(`${MERCH_API_END_POINT}/fest/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userDetails: form
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setSuccess(true);
              toast.success("Order placed successfully!");
            } else {
              toast.error(verifyData.message || "Payment verification failed.");
            }
          } catch (err) {
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="max-w-sm w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-400" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-white tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Thank you for your purchase. A confirmation email will be sent to <span className="text-white font-medium">{form.email}</span> once verified.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition shadow-xl shadow-white/5 active:scale-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* ── DECORATIVE ELEMENTS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── PAGE HEADER ── */}
        <div className="text-center pt-20 pb-12 px-4 space-y-4">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-bold animate-in fade-in slide-in-from-bottom-2 duration-700">Limited Edition Drop</p>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
            FAROUCHE 2026
          </h1>
          <div className="flex items-center justify-center gap-4 py-2">
              <span className="h-px w-8 bg-white/20" />
              <p className="text-gray-400 text-sm font-medium tracking-wide">
                Official Fest Merchandise
              </p>
              <span className="h-px w-8 bg-white/20" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 pb-24">
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
            
            {/* Price Tag */}
            <div className="absolute top-8 right-8 bg-white text-black px-4 py-1.5 rounded-full font-black text-sm rotate-3 group-hover:rotate-0 transition-transform">
                ₹{PRICE}
            </div>

            <form onSubmit={handlePayment} className="space-y-10">
              {/* Personal Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">01</span>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { label: "Full Name", name: "name", type: "text", placeholder: "e.g. John Doe" },
                      { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
                      { label: "Phone", name: "phone", type: "tel", placeholder: "10-digit number" },
                    ].map((f) => (
                      <div key={f.name} className={`flex flex-col gap-2 ${f.name === 'name' ? 'sm:col-span-2' : ''}`}>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">{f.label}</label>
                        <input
                          type={f.type} name={f.name} required
                          placeholder={f.placeholder}
                          value={(form as any)[f.name]} onChange={handleChange}
                          className="w-full rounded-2xl border border-white/5 px-5 py-4 text-sm bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
                        />
                      </div>
                    ))}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Hostel</label>
                        <select
                          name="hostelName" required value={form.hostelName} onChange={handleChange}
                          className="w-full rounded-2xl border border-white/5 px-5 py-4 text-sm bg-black text-white focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select Resident Block</option>
                          {HOSTELS.map((h) => <option key={h} value={h}>{h}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Academic Year</label>
                        <select
                          name="academicYear" required value={form.academicYear} onChange={handleChange}
                          className="w-full rounded-2xl border border-white/5 px-5 py-4 text-sm bg-black text-white focus:outline-none focus:border-white/20 transition-all appearance-none cursor-pointer"
                        >
                          {ACADEMIC_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>
              </div>

              {/* Size Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">02</span>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Fit</h3>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {SIZES.map((s) => {
                    const sel = form.size === s;
                    return (
                      <button
                        key={s} type="button"
                        onClick={() => setForm((p) => ({ ...p, size: s }))}
                        className={`py-4 rounded-2xl border text-sm font-black transition-all ${
                          sel
                            ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                  <button
                    type="submit" disabled={loading}
                    className="w-full group relative flex items-center justify-center gap-3 py-5 rounded-[2rem] bg-white text-black font-black text-lg hover:bg-gray-100 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-6 w-6" />
                    ) : (
                      <>
                        <ShoppingBag className="h-6 w-6" />
                        PAY ₹{PRICE}
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-gray-500 mt-6 font-bold uppercase tracking-widest opacity-60">
                    Secure checkout powered by Razorpay
                  </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}