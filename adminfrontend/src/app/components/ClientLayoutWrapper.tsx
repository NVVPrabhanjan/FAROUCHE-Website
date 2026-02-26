"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { APIConfigProvider } from "@/context/APIConfigContext";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
      return <APIConfigProvider>{children}</APIConfigProvider>;
  }

  return (
    <APIConfigProvider>
      <Navbar />
      <main className="min-h-screen pt-24 pb-10 px-4 md:px-6">
        {children}
      </main>
      <Footer />
    </APIConfigProvider>
  );
}
