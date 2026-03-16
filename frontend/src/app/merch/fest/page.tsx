"use client";

import React, { useState } from "react";
import { useAPIConfig } from "@/context/APIConfigContext";
import { toast } from "sonner";
import { Loader2, Shirt } from "lucide-react";

const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const MERCH_IMAGE_URL =
  "https://img.freepik.com/free-psd/t-shirt-concept-mock-up_23-2148187214.jpg";
const QR_CODE_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=farouche@upi&pn=Farouche%20Fest&am=399&cu=INR";

export default function FestMerchPage() {
  const { MERCH_API_END_POINT } = useAPIConfig();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hostelName: "",
    academicYear: "",
    transactionId: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${MERCH_API_END_POINT}/fest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        toast.success("Order submitted successfully!");
      } else {
        toast.error(data.message || "Failed to submit order.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8 yugdhara-fade-in">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 yugdhara-glow" />
            <div className="absolute inset-2 rounded-full border border-primary/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shirt className="h-9 w-9 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
              Request Submitted
            </h1>
            <div className="w-12 h-px bg-primary mx-auto" />
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your purchase request has been submitted. Your transaction will be verified by the admin.
              Once verified, you will receive a confirmation email.
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full border border-primary/50 text-primary font-semibold py-3 rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm tracking-widest uppercase yugdhara-glow"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-foreground">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 yugdhara-fade-in space-y-4">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium">
            Farouche 2026 · Cultural Fest
          </p>
          <h1
            className="text-4xl md:text-6xl text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Fest Merchandise
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="h-px w-16 bg-primary/40" />
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Own the official Farouche 2026 t-shirt. Limited stock — secure yours today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Product + QR */}
          <div className="space-y-6 yugdhara-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-sm overflow-hidden border border-border bg-card">
              <div className="yugdhara-shimmer absolute inset-0 pointer-events-none z-10" />
              <img src={MERCH_IMAGE_URL} alt="Fest Merch T-shirt" className="w-full h-auto object-cover" />
              <div className="absolute top-4 right-4 bg-background/90 border border-primary/40 px-3 py-1.5 rounded-sm yugdhara-glow">
                <span className="text-primary text-sm font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                  ₹399
                </span>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-6 space-y-5">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />
                <h3 className="text-primary text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  Payment Instructions
                </h3>
                <div className="h-px flex-1 bg-border" />
              </div>
              <ol className="space-y-2.5 text-sm text-muted-foreground">
                {[
                  <>Scan the QR code using any UPI app.</>,
                  <>Complete the payment of <span className="text-primary font-semibold">₹399</span>.</>,
                  <>Note down your <span className="text-foreground font-medium">Transaction ID</span>.</>,
                  <>Fill the form and submit your request.</>,
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary text-xs mt-0.5 w-4 shrink-0" style={{ fontFamily: "'Cinzel', serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="flex justify-center pt-2">
                <div className="border border-primary/30 p-3 rounded-sm bg-white yugdhara-glow">
                  <img src={QR_CODE_URL} alt="UPI QR Code" className="w-40 h-40" />
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Scan with PhonePe · GPay · Paytm · any UPI app
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="bg-card border border-border rounded-sm p-6 md:p-8 yugdhara-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="mb-8 space-y-1">
              <h2 className="text-xl text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>
                Purchase Request
              </h2>
              <p className="text-muted-foreground text-xs tracking-wide">
                Fill in your details to complete the order
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Full Name</label>
                  <input
                    type="text" name="name" required value={form.name} onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Email Address</label>
                  <input
                    type="email" name="email" required value={form.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Phone Number</label>
                  <input
                    type="tel" name="phone" required value={form.phone} onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Hostel Name</label>
                  <input
                    type="text" name="hostelName" required value={form.hostelName} onChange={handleChange}
                    placeholder="Aryabhata Hostel"
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Academic Year</label>
                  <select
                    name="academicYear" required value={form.academicYear} onChange={handleChange}
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your year</option>
                    {ACADEMIC_YEARS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs text-muted-foreground tracking-widest uppercase">Transaction ID</label>
                  <input
                    type="text" name="transactionId" required value={form.transactionId} onChange={handleChange}
                    placeholder="UPI12345678"
                    className="w-full bg-background border border-input rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition font-mono"
                  />
                  <p className="text-xs text-muted-foreground/60">
                    Found in your UPI app under transaction history
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-widest uppercase text-sm yugdhara-glow"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {loading ? (
                  <><Loader2 className="animate-spin h-4 w-4" /> Processing...</>
                ) : (
                  <><Shirt className="h-4 w-4" /> Submit Request</>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground/60">
                Your order is subject to transaction verification by admin.
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}