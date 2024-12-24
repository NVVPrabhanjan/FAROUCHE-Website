"use client";

import { useEffect, useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";

export function ResultForm() {
  const [name, setName] = useState(""); // changed from title to name
  const [teams, setTeams] = useState(""); // for storing the teams (a string)
  const [win, setWin] = useState(""); // to store the winning team
  const [manOfTheMatch, setManOfTheMatch] = useState(""); // for storing man of the match
  const [imageFile, setImageFile] = useState<File | null>(null); // image file upload
  const [group, setGroup] = useState(false); // checkbox for group
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setImageFile(file); // Update the state with the selected image file
    }
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(event.target.checked); // Update the state for the checkbox
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append form data
    formData.append('name', name); // changed from title to name
    formData.append('teams', teams); // teams as string
    formData.append('win', win); // winning team
    formData.append('manofthematch', manOfTheMatch); // man of the match
    formData.append('group', String(group)); // boolean group
    formData.append('eventStart', eventStart); // event start time
    formData.append('eventEnd', eventEnd); // event end time

    // If there's an image, append it as well
    if (imageFile) {
      formData.append('image', imageFile); // Image file
    }

    try {
      const response = await fetch('http://127.0.0.1:4000/api/v1/event/addEvent', {
        method: 'POST',
        body: formData, // Send FormData as the body
      });

      if (response.ok) {
        // Handle successful form submission
        const result = await response.json();
        console.log('Event created:', result);
      } else {
        // Handle error response
        console.error('Error submitting form', response.status);
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
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
          Teams (Comma separated)
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

      {/* Group Checkbox */}
      <div>
        <label htmlFor="group" className="flex items-center space-x-2">
          <input
            id="group"
            type="checkbox"
            checked={group}
            onChange={handleGroupChange}
            className="h-5 w-5 mt-2 rounded border border-neutral-700 bg-neutral-800 text-white"
          />
          <span className="text-sm text-white">Select Group</span>
        </label>
      </div>

      {/* Event Timing Inputs */}
      <div className="flex gap-10">
        <div className="basis-[30%]">
          <label htmlFor="eventStart" className="block text-sm font-semibold text-white">
            Event Start
          </label>
          <input
            id="eventStart"
            type="time"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
            required
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          />
        </div>
        <div className="basis-[30%]">
          <label htmlFor="eventEnd" className="block text-sm font-semibold text-white">
            Event End
          </label>
          <input
            id="eventEnd"
            type="time"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
            required
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          />
        </div>
      </div>

      {/* Submit Button */}
      <DialogFooter>
        <button
          type="submit"
          className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Register Event
        </button>
      </DialogFooter>
    </form>
  );
}
