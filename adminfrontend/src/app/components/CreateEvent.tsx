"use client"

import { useEffect,useState } from "react";
import { DialogFooter } from "../ui/dialog";
import {toast} from "sonner"



export function RegisterForm(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [group, setGroup] = useState(false);
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
        console.log(1);
        // Append form data
        formData.append('title', title);  // Your form state value for title
        formData.append('description', description);  // Your form state value for description
        formData.append('date', date);  // Your form state value for date
        formData.append('venue', venue);  // Your form state value for venue
        formData.append('eventStart', eventStart);  // Your form state value for eventStart
        formData.append('eventEnd', eventEnd);  // Your form state value for eventEnd
        console.log(2);
        // If there's an image, append it as well
        if (imageFile) {
          formData.append('image', imageFile);  // Your image file input
        }
        console.log(3);
        try {
          console.log(4);
          const response = await fetch('http://127.0.0.1:4000/api/v1/event/addEvent', {
            method: 'POST',
            body: formData, // Send FormData as the body
            
          });
          console.log(5);
          if (response.ok) {
            alert('Event created successfully');
            toast("Event created successfully")

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

        <div>
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
    )
}