"use client"

import { useEffect, useState } from "react";
import { DialogFooter } from "../ui/dialog";
import { toast } from "sonner";
import { EVENT_API_END_POINT } from '@/app/utils/constants';
import { CheckCircle } from "lucide-react";

export function RegisterForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [group, setGroup] = useState(false);
    const [teamSize, setTeamSize] = useState(2); // Default team size of 2
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]; // Get the selected file
    
        if (file) {
          setImageFile(file); // Update the state with the selected image file
        }
    };

    const handleGroupChange = (event) => {
        setGroup(event.target.checked); // Update the state for the checkbox
        
        // Reset team size to default if group is unchecked
        if (!event.target.checked) {
            setTeamSize(2);
        }
    };
    
    const handleTeamSizeChange = (event) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setTeamSize(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
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
            const result = await response.json();
            toast("Event created successfully");
            
            // Show success animation
            setShowSuccess(true);
            
            // Reset form after successful submission
            setTimeout(() => {
              setShowSuccess(false);
              // Reset the form
              setTitle("");
              setDescription("");
              setDate("");
              setVenue("");
              setImageFile(null);
              setGroup(false);
              setTeamSize(2);
            }, 3000);
          } else {
            console.error('Error submitting form', response.status);
            toast.error("Failed to create event");
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error("An error occurred");
        } finally {
          setIsSubmitting(false);
        }
    };

    return (
        <div className="relative">
            {/* Success animation overlay */}
            {showSuccess && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-lg">
                    <div className="flex flex-col items-center justify-center space-y-4 bg-neutral-800 p-8 rounded-lg animate-in fade-in-50 duration-500">
                        <CheckCircle className="w-16 h-16 text-green-500 animate-pulse" />
                        <p className="text-white text-xl font-semibold">Event Created Successfully!</p>
                    </div>
                </div>
            )}
            
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-h-[80vh] overflow-y-auto p-4"
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
                        rows={3}
                        className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            
                {/* Date and Venue Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                </div>
        
                {/* Group and Team Size section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <label htmlFor="group" className="flex items-center space-x-2">
                            <input
                                id="group"
                                type="checkbox"
                                checked={group}
                                onChange={handleGroupChange}
                                className="h-5 w-5 rounded border border-neutral-700 bg-neutral-800 text-white"
                            />
                            <span className="text-sm text-white">Group Event</span>
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
                </div>
            
                {/* Image Input */}
                <div>
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
                    {imageFile && (
                        <p className="mt-1 text-sm text-green-400">
                            Image selected: {imageFile.name}
                        </p>
                    )}
                </div>
            
                {/* Submit Button */}
                <DialogFooter className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center py-2 px-4 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Registering..." : "Register Event"}
                    </button>
                </DialogFooter>
            </form>
        </div>
    );
}