import type { Metadata } from "next";
// import { Poppins } from "next/font/google"; // Using Geist for now to minimize breakage, or I can switch to Poppins
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farouche Admin",
  description: "Admin Panel for Farouche",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ScrollProgressBar />
        <Navbar />
        <main className="min-h-screen pt-24 pb-10 px-4 md:px-6">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
