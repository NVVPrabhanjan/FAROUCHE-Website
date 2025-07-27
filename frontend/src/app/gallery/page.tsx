"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import Link from "next/link";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const events = ["Inaguration", "Food Fiesta - 3rd Year","Chiguru", "Food Fiesta - IH", "Food Fiesta - 1 & 2nd Year"];
  const [selectedEvent, setSelectedEvent] = useState("");

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://farouche25.tech/api/v1/gallery/");
      console.log(res);
      setImages(res.data.images);
      setMessage("");
    } catch (error) {
      console.error(error);
      setImages([]);
      setMessage("No images found or event does not exist.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-12">
      <ScrollProgressBar />
      <Navbar />
      
      {/* Hero section with gradient */}
      <div className="relative min-h-screen pt-20 pb-10 bg-gradient-to-b from-purple-900/60 via-purple-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              Event Gallery
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Browse through our collection of memorable moments
            </p>
          </div>

          {/* Event filters in oval shape */}
          <div className="flex justify-center space-x-4 mb-12">
            {events.map((event) => (
              <Link
                key={event}
                href={`/gallery/${encodeURIComponent(event)}`}
                className={`
                  px-8 py-3 rounded-full text-lg font-medium transition-all duration-300
                  ${selectedEvent === event
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105" 
                    : "bg-gradient-to-r from-purple-900/70 to-pink-900/70 text-purple-200 hover:from-purple-800 hover:to-pink-800 hover:shadow-md"
                  }
                `}
              >
                {event.charAt(0).toUpperCase() + event.slice(1)}
              </Link>
            ))}
          </div>

          {/* Error message */}
          {message && (
            <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded mb-8 text-center">
              {message}
            </div>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md shadow-purple-900/30">
                <img
                  src={img.imageUrl}
                  alt={`Event photo ${idx + 1}`}
                  className="w-full h-64 object-cover object-center transition-all duration-500 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  {img.event && (
                    <span className="text-purple-300 text-sm">{img.event}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No images state */}
          {images.length === 0 && !message && (
            <div className="text-center py-20">
              <p className="text-xl text-purple-300">No images in gallery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}