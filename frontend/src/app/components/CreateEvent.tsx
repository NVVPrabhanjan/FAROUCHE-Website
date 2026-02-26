"use client"

import { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAPIConfig } from "@/context/APIConfigContext";

export function RegisterForm() {
  const { EVENT_API_END_POINT } = useAPIConfig();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [group, setGroup] = useState(false);
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('venue', venue);
    formData.append('group', String(group));
    formData.append('eventStart', eventStart);
    formData.append('eventEnd', eventEnd);

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
        toast("Event created successfully");
      }
    } catch {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
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

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-white">
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

      <div className="flex gap-10">
        <div className="basis-[30%]">
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

        <div className="basis-[30%]">
          <label htmlFor="StartTime" className="block text-sm font-semibold text-white">
            Event Start
          </label>
          <input
            id="StartTime"
            type="time"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
            required
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
          />
        </div>

        <div className="basis-[30%]">
          <label htmlFor="EndTime" className="block text-sm font-semibold text-white">
            Event End
          </label>
          <input
            id="EndTime"
            type="time"
            className="mt-2 p-3 w-full rounded-md border border-neutral-700 bg-neutral-800 text-white"
            required
            value={eventEnd}
            onChange={(e) => setEventEnd(e.target.value)}
          />
        </div>
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

      <div className="flex gap-4">
        <div className="basis-[40%]">
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

        <div>
          <label htmlFor="group" className="flex items-center space-x-2">
            <input
              id="group"
              type="checkbox"
              checked={group}
              onChange={handleGroupChange}
              className="h-5 w-5 mt-10 rounded border border-neutral-700 bg-neutral-800 text-white"
            />
            <span className="text-sm mt-10 text-gray-700">Select Group</span>
          </label>
        </div>
      </div>

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