"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function UploadImages() {
  const [eventName, setEventName] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!eventName || files.length === 0) {
      setMessage("Please provide event name and select images.");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", eventName);
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await axios.post("http://143.110.185.244:4001/api/v1/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setEventName("");
      setFiles([]);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link
        href="/dashboard"
        className="block w-full py-3 text-sm text-center rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
      >
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4">Upload Event Images</h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <select
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="border p-2 rounded"
        >
          <option className="text-black" value="">Select Event</option>
          <option className="text-black" value="Inaguration">Inaguration</option>
          <option className="text-black" value="Chiguru">Chiguru</option>
          <option className="text-black" value="Hostel Day">Hostel Day</option>
          <option className="text-black" value="Food Fiesta - 1 & 2nd Year">Food Fiesta 1 & 2nd Year</option>
          <option className="text-black" value="Food Fiesta - 3rd Year">Food Fiesta 3rd Year</option>
          <option className="text-black" value="Food Fiesta - IH">Food Fiesta IH</option>
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
