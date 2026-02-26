"use client";
import React, { useState } from 'react';
import { addEvent } from '../../services/adminService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEventPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        teamSize: 1,
        group: false
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, group: e.target.checked }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please upload an event image");
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('date', formData.date);
        data.append('venue', formData.venue);
        data.append('teamSize', formData.teamSize.toString());
        data.append('group', formData.group.toString());
        data.append('image', image);

        try {
            await addEvent(data);
            toast.success("Event added successfully!");
            setFormData({
                title: '',
                description: '',
                date: '',
                venue: '',
                teamSize: 1,
                group: false
            });
            setImage(null);
            setPreview(null);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-card text-card-foreground p-4 md:p-8 rounded-lg shadow-md border border-border">
            <ToastContainer theme="dark" />
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Add New Event</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-muted-foreground font-medium mb-2">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-input border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-muted-foreground font-medium mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full bg-input border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-muted-foreground font-medium mb-2">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                            className="w-full bg-input border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                        />
                    </div>

                    <div>
                        <label className="block text-muted-foreground font-medium mb-2">Team Size</label>
                        <input
                            type="number"
                            name="teamSize"
                            value={formData.teamSize}
                            onChange={handleChange}
                            min="1"
                            required
                            className="w-full bg-input border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-muted-foreground font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-input border border-border p-3 rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="group"
                        checked={formData.group}
                        onChange={handleCheckbox}
                        className="w-5 h-5 text-primary border-border rounded bg-input"
                    />
                    <label htmlFor="group" className="text-muted-foreground font-medium">Is this a Group Event?</label>
                </div>

                <div>
                    <label className="block text-muted-foreground font-medium mb-2">Event Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full bg-input border border-border p-2 rounded-lg text-foreground"
                    />
                    {preview && (
                        <div className="mt-4">
                            <img src={preview} alt="Preview" className="w-48 h-32 object-cover rounded-lg shadow border border-border" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {loading ? "Creating Event..." : "Create Event"}
                </button>
            </form>
        </div>
    );
}
