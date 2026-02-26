






"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
import Navbar from "@/app/components/NavBar";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAPIConfig } from "@/context/APIConfigContext";

export default function FilteredGallery() {
  const { GALLERY_API_END_POINT } = useAPIConfig();
  const [images, setImages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const [events, setEvents] = useState<string[]>([]);
  const currentEvent = decodeURIComponent(params.filter?.toString() || "");


  useEffect(() => {
    async function loadEventNames() {
      try {
        const res = await fetch(`${GALLERY_API_END_POINT}/`);
        const data = await res.json();
        const imgs: { eventName?: string }[] = data.images || [];
        const unique = Array.from(new Set(imgs.map(i => i.eventName).filter(Boolean))) as string[];
        setEvents(unique);
      } catch {  }
    }
    loadEventNames();
  }, []);

  async function filterEvent(eventName: any) {
    setLoading(true);
    try {
      const result = await axios.get(
        `${GALLERY_API_END_POINT}/${eventName}`
      );
      setImages(result.data.images);
      setMessage("");
    } catch (err) {
      setImages([]);
      setMessage("No images added for this event");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params.filter) {
      filterEvent(params.filter);
    }
  }, [params]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-12">
      <ScrollProgressBar />
      <Navbar />

      
      <div className="relative min-h-screen pt-20 pb-10 bg-gradient-to-b from-purple-900/60 via-purple-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              {currentEvent.charAt(0).toUpperCase() + currentEvent.slice(1)} Gallery
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Browse through our collection of {currentEvent} event photos
            </p>
          </div>

          
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <Link
              href="/gallery"
              className="px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 bg-gradient-to-r from-purple-900/70 to-pink-900/70 text-purple-200 hover:from-purple-800 hover:to-pink-800 hover:shadow-md"
            >
              All Events
            </Link>
            {events.map((event) => (
              <Link
                key={event}
                href={`/gallery/${encodeURIComponent(event)}`}
                className={`
                  px-8 py-3 rounded-full text-lg font-medium transition-all duration-300
                  ${event === currentEvent
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105" 
                    : "bg-gradient-to-r from-purple-900/70 to-pink-900/70 text-purple-200 hover:from-purple-800 hover:to-pink-800 hover:shadow-md"
                  }
                `}
              >
                {event.charAt(0).toUpperCase() + event.slice(1)}
              </Link>
            ))}
          </div>

          
          {message && (
            <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded mb-8 text-center">
              {message}
            </div>
          )}

          
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md shadow-purple-900/30">
                  <img
                    src={img}
                    className="w-full h-64 object-cover object-center transition-all duration-500 group-hover:brightness-110"
                  />
                </div>
              ))}
            </div>
          )}

          
          {loading && (
            <div className="text-center py-20">
              <p className="text-xl text-purple-300">Loading gallery images...</p>
              <div className="mt-4 w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin mx-auto"></div>
            </div>
          )}

          
          {!loading && images.length === 0 && !message && (
            <div className="text-center py-20">
              <p className="text-xl text-purple-300">No images available for {currentEvent}</p>
              <Link 
                href="/gallery" 
                className="mt-6 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all duration-300"
              >
                Return to All Events
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}