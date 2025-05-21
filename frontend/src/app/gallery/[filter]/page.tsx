// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import ScrollProgressBar from "@/app/components/ScrollProgressBar";
// import Navbar from "@/app/components/NavBar";
// import { useParams } from "next/navigation";

// export default function Gallery() {
//   const [images, setImages] = useState<any[]>([]);
//   const [message,setMessage] = useState<string>();
//   const e = useParams();
//   console.log(e);
//   async function filterEvent(eventName: any) {
//     try{
//         const result = await axios.get(
//             `http://localhost:4001/api/v1/gallery/${eventName}`
//           );
//           console.log(result);
//           setImages(result.data.images);
//     }catch(err){
//         setMessage("no images added for this event")
//     }
//   }
//   useEffect(() => {
//     filterEvent(e.filter);
//   }, [e]);
//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden">
//       <ScrollProgressBar />
//       <Navbar />
//       <div className="relative min-h-[45vh] pt-16 md:pt-20 flex items-center justify-center bg-gradient-to-b from-purple-900/60 to-black text-white">
//         <div className="p-6 max-w-5xl mx-auto">
//           {message && <p className="text-red-500">{message}</p>}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt="Event"
//                 className="w-full h-48 object-cover rounded shadow-md"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
import Navbar from "@/app/components/NavBar";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function FilteredGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const events = ["Inaguration", "Food Fiesta - 3rd Year","Chiguru", "Food Fiesta - IH", "Food Fiesta - 1 & 2nd Year"];
  const currentEvent = params.filter?.toString() || "";

  async function filterEvent(eventName: any) {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:4001/api/v1/gallery/${eventName}`
      );
      console.log(result);
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

      {/* Hero section with gradient */}
      <div className="relative min-h-screen pt-20 pb-10 bg-gradient-to-b from-purple-900/60 via-purple-900/30 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
              {currentEvent.charAt(0).toUpperCase() + currentEvent.slice(1)} Gallery
            </h1>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Browse through our collection of {currentEvent} event photos
            </p>
          </div>

          {/* Event filters in oval shape */}
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

          {/* Error message */}
          {message && (
            <div className="bg-red-900/40 border border-red-500 text-red-300 px-4 py-3 rounded mb-8 text-center">
              {message}
            </div>
          )}

          {/* Gallery Grid */}
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

          {/* Loading state */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-xl text-purple-300">Loading gallery images...</p>
              <div className="mt-4 w-12 h-12 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin mx-auto"></div>
            </div>
          )}

          {/* No images state */}
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