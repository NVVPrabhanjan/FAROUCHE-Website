"use client"

import { useEffect, useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { toast } from "sonner"
import { EVENT_API_END_POINT } from '@/app/utils/constants'
export function RegisterForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [group, setGroup] = useState(false);
    const [teamSize, setTeamSize] = useState<number>(2); // Default team size of 2
    
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
    
        if (file) {
          setImageFile(file); // Update the state with the selected image file
        }
    };

    const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup(event.target.checked); // Update the state for the checkbox
        
        // Reset team size to default if group is unchecked
        if (!event.target.checked) {
            setTeamSize(2);
        }
    };
    
    const handleTeamSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setTeamSize(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('venue', venue);
        formData.append('group', String(group));
        if (group) {
            formData.append('teamSize', String(teamSize));
        }
        if (imageFile) {
          formData.append('image', imageFile);
        }
        try {
          const response = await fetch(`${EVENT_API_END_POINT}/addEvent`, {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            alert('Event created successfully');
            toast("Event created successfully")
            const result = await response.json();
          } else {
            console.error('Error submitting form', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);  
          // Add your form submission logic here
     
          // Process newEvent (e.g., API call)
        }}
        className="space-y-4"
      >
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-white">
            Event Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Event title"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
    
        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Event description"
            rows={4}
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
    
        {/* Date Input */}
        <div className=' flex gap-10'>
        <div className=' basis-[30%]'>
          <label htmlFor="date" className="block text-sm font-semibold text-white">
            Event Date
          </label>
          <input
            id="date"
            type="date"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        </div>
    
        {/* Venue Input */}
        <div>
          <label htmlFor="venue" className="block text-sm font-semibold text-white">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            placeholder="Event venue"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
            required
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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
              className="h-5 w-5 mt-10 rounded border border-neutral-700 bg-neutral-800 text-white"
            />
            <span className="text-sm mt-10 text-white">Group Event</span>
          </label>
        </div>
        
        {/* Team Size Input - Only visible if group is checked */}
        {group && (
          <div>
            <label htmlFor="teamSize" className="block text-sm font-semibold text-white">
              Team Size
            </label>
            <input
              id="teamSize"
              type="number"
              min="2"
              value={teamSize}
              onChange={handleTeamSizeChange}
              className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
              required
            />
          </div>
        )}
    
        {/* Image Input */}
        <div className="flex gap-4">
          <div className='basis-[40%]'>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-white"
            >
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
          <div></div>
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