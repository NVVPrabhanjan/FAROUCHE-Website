"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2, Calendar, MapPin, Users, Type } from "lucide-react";
import { addEvent, updateEvent } from "../services/adminService";
import { toast } from "react-toastify";

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEventAdded: () => void;
    initialData?: any; 
}

export default function AddEventModal({ isOpen, onClose, onEventAdded, initialData }: AddEventModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        venue: "",
        teamSize: 1,
        isGroup: false,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);


    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
                venue: initialData.venue || "",
                teamSize: initialData.teamSize || 1,
                isGroup: initialData.group || false, 
            });
        } else {
             setFormData({
                title: "",
                description: "",
                date: "",
                venue: "",
                teamSize: 1,
                isGroup: false,
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        

        if (!initialData && !imageFile) {
            toast.error("Please upload an event image");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("date", formData.date);
            data.append("venue", formData.venue);
            data.append("teamSize", formData.teamSize.toString());
            data.append("group", formData.isGroup.toString());
            
            if (imageFile) {
                data.append("image", imageFile);
            }

            if (initialData) {

                data.append("eventId", initialData._id); 
                await updateEvent(data);
                toast.success("Event updated successfully!");
            } else {
                await addEvent(data);
                toast.success("Event added successfully!");
            }
            
            onEventAdded();
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to save event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-zinc-900/95 border-b border-zinc-800 backdrop-blur-md">
                            <h2 className="text-2xl font-bold text-white">{initialData ? "Edit Event" : "Create New Event"}</h2>
                            <button onClick={onClose} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-white">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Event Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-3 top-3 text-zinc-500" size={18} />
                                        <input 
                                            name="title" 
                                            required 
                                            value={formData.title} 
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" 
                                            placeholder="e.g. Hackathon 2026"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full bg-black/50 border border-zinc-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition resize-none" 
                                        placeholder="Brief details about the event..."
                                    />
                                </div>
                            </div>

                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 text-zinc-500" size={18} />
                                        <input 
                                            type="date" 
                                            name="date" 
                                            required 
                                            value={formData.date} 
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition [color-scheme:dark]" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Venue</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 text-zinc-500" size={18} />
                                        <input 
                                            type="text"
                                            name="venue" 
                                            value={formData.venue} 
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
                                            placeholder="e.g. Main Auditorium"
                                        />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-white font-medium">Group Event?</h3>
                                        <p className="text-xs text-zinc-500">Enable this if participants register as a team.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.isGroup} 
                                            onChange={(e) => setFormData(p => ({...p, isGroup: e.target.checked}))} 
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>

                                {formData.isGroup && (
                                    <div className="pt-2 border-t border-zinc-700/50">
                                         <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-400">Max Team Size</label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-3 text-zinc-500" size={18} />
                                                <input 
                                                    type="number" 
                                                    name="teamSize" 
                                                    min={2}
                                                    value={formData.teamSize} 
                                                    onChange={handleChange}
                                                    className="w-full bg-black/50 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                             
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">{initialData ? "Change Banner (Optional)" : "Event Banner"}</label>
                                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:bg-zinc-800/50 transition cursor-pointer relative group">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-zinc-800 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition">
                                            <Upload size={24} className="text-zinc-400 group-hover:text-purple-400" />
                                        </div>
                                        {imageFile ? (
                                            <p className="text-sm text-green-400 font-medium">{imageFile.name}</p>
                                        ) : (
                                            <div className="space-y-1">
                                                <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                                                <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/20 transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (initialData ? "Save Changes" : "Create Event")}
                            </button>

                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
