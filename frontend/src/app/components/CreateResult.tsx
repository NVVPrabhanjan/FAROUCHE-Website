"use client";

import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export function ResultForm() {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState("");
  const [win, setWin] = useState("");
  const [manOfTheMatch, setManOfTheMatch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append('name', name);
    formData.append('teams', teams);
    formData.append('win', win);
    formData.append('manofthematch', manOfTheMatch);

    // If there's an image, append it as well
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/results/addResults', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Result created successfully');
        alert('Result created successfully');
        const result = await response.json();
        console.log('Event created:', result);
      } else {
        console.error('Error submitting form', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-white">
          Event Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Event name"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Teams Input */}
      <div>
        <label htmlFor="teams" className="block text-sm font-semibold text-white">
          Teams
        </label>
        <input
          id="teams"
          type="text"
          placeholder="Teams (e.g. NH2,MH,IH)"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={teams}
          onChange={(e) => setTeams(e.target.value)}
        />
      </div>

      {/* Winning Team Input */}
      <div>
        <label htmlFor="win" className="block text-sm font-semibold text-white">
          Winning Team
        </label>
        <input
          id="win"
          type="text"
          placeholder="Winning team"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={win}
          onChange={(e) => setWin(e.target.value)}
        />
      </div>

      {/* Man of the Match Input */}
      <div>
        <label htmlFor="manofthematch" className="block text-sm font-semibold text-white">
          Man of the Match
        </label>
        <input
          id="manofthematch"
          type="text"
          placeholder="Man of the match"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
          required
          value={manOfTheMatch}
          onChange={(e) => setManOfTheMatch(e.target.value)}
        />
      </div>

      {/* Image Input */}
      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-white">
          Event Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
          onChange={handleImageUpload}
        />
      </div>

      {/* Submit Button */}
      <DialogFooter>
        <button
          type="submit"
          className="inline-flex items-center justify-center py-2.5 px-5 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Submit Result
        </button>
      </DialogFooter>
    </form>
  );
}