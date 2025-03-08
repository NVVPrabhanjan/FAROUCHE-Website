"use client";

import { useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { toast } from "sonner";
import { REGISTRATION_API_END_POINT } from "@/app/utils/constants"
export function RegisterationForm() {
  const [names, setNames] = useState(""); // For storing the user's name
  const [phoneNumber, setPhoneNumber] = useState(""); // For storing the phone number
  const [email, setEmail] = useState(""); // For storing the email
  const [hostelName, setHostelName] = useState(""); // For storing the hostel name
  const [eventTitle, setEventTitle] = useState(""); // For storing the event title

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append("names", names);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("hostelName", hostelName);
    formData.append("eventTitle", eventTitle);

    try {
      const response = await fetch(
        "http://127.0.0.1:4000/api/v1/results/addResults",
        {
          method: "POST",
          body: formData, // Send FormData as the body
        }
      );

      if (response.ok) {
        // Handle successful form submission
        toast.success("Result created successfully");
        alert("Result created successfully");
        const result = await response.json();
      } else {
        // Handle error response
        console.error("Error submitting form", response.status);
      }
    } catch (error) {
      // Handle any other errors
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div>
        <label htmlFor="names" className="block text-sm font-semibold text-white">
          Full Name
        </label>
        <input
          id="names"
          type="text"
          placeholder="Your full name"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-white">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="Your phone number"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your email address"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Hostel Name Input */}
      <div>
        <label htmlFor="hostelName" className="block text-sm font-semibold text-white">
          Hostel Name
        </label>
        <input
          id="hostelName"
          type="text"
          placeholder="Your hostel name"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={hostelName}
          onChange={(e) => setHostelName(e.target.value)}
        />
      </div>

      {/* Event Title Input */}
      <div>
        <label htmlFor="eventTitle" className="block text-sm font-semibold text-white">
          Event Title
        </label>
        <input
          id="eventTitle"
          type="text"
          placeholder="Title of the event"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <DialogFooter>
        <button
          type="submit"
          className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Submit Details
        </button>
      </DialogFooter>
    </form>
  );
}
