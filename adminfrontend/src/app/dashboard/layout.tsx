"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-transparent text-foreground">
      
      <div className="md:hidden fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between z-40 print:hidden">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Admin Panel
        </h1>
        <button 
            onClick={() => setSidebarOpen(true)}
            className="text-foreground p-2 hover:bg-white/10 rounded-full"
        >
            <Menu size={24} />
        </button>
      </div>

      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        className="print:hidden"
      />

      
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-24 md:pt-8 min-h-screen print:ml-0 print:p-0 print:pt-0">
        {children}
      </main>
    </div>
  );
}
