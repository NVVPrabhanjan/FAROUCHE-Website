import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import { APIConfigProvider } from "@/context/APIConfigContext";
import { Toaster } from "sonner";
import Script from "next/script";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FAROUCHE",
  description: "BMSCE FAROUCHE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4G065WMGFH"></Script>
        <Script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4G065WMGFH');
          `}
        </Script>
        <APIConfigProvider>
          <Toaster position="top-center" richColors />
          <Navbar />
          {children}
          <Footer />
        </APIConfigProvider>
      </body>
    </html>
  );
}