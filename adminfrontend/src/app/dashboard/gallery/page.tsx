"use client";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImagePlus, X, Upload, Loader2, Trash2, Edit2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useAPIConfig } from "@/context/APIConfigContext";

// Need to also get the dynamic endpoints based on the base URL
import { GALLERY_EVENTS_END_POINT, GALLERY_API_END_POINT } from "@/app/utils/constants";

interface GalleryEvent {
    _id: string;
    eventName: string;
    eventImages: string[];
}

export default function GalleryPage() {
    const { GALLERY_ADD_END_POINT } = useAPIConfig();
    const [activeTab, setActiveTab] = useState<"upload" | "manage">("manage");

    // --- UPLOAD STATE ---
    const [eventName, setEventName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // --- MANAGE STATE ---
    const [events, setEvents] = useState<GalleryEvent[]>([]);
    const [fetchingEvents, setFetchingEvents] = useState(true);
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
    const [editingEvent, setEditingEvent] = useState<string | null>(null);
    const [editNameValue, setEditNameValue] = useState("");

    // --- FETCH EVENTS ---
    const fetchEvents = async () => {
        setFetchingEvents(true);
        try {
            const res = await axios.get(GALLERY_EVENTS_END_POINT);
            setEvents(res.data.events || []);
        } catch (err) {
            console.error("Failed to fetch gallery events:", err);
            toast.error("Failed to fetch events.");
        } finally {
            setFetchingEvents(false);
        }
    };

    useEffect(() => {
        if (activeTab === "manage") {
            fetchEvents();
        }
    }, [activeTab]);

    // --- UPLOAD HANDLERS ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        addFiles(selected);
        e.target.value = "";
    };

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
        addFiles(dropped);
    }, []);

    const addFiles = (newFiles: File[]) => {
        const imageFiles = newFiles.filter(f => f.type.startsWith("image/"));
        setFiles(prev => [...prev, ...imageFiles]);
        const newPreviews = imageFiles.map(f => URL.createObjectURL(f));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeFile = (index: number) => {
        URL.revokeObjectURL(previews[index]);
        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventName.trim()) { toast.error("Enter an event name."); return; }
        if (files.length === 0) { toast.error("Select at least one image."); return; }

        setLoading(true);
        const formData = new FormData();
        formData.append("eventName", eventName.trim());
        files.forEach(f => formData.append("images", f));

        try {
            await axios.post(GALLERY_ADD_END_POINT, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(`✅ ${files.length} image(s) uploaded to "${eventName}"`);
            setEventName("");
            setFiles([]);
            setPreviews([]);
            // Auto switch to manage if successful
            setActiveTab("manage");
        } catch (err: any) {
            const msg = err.response?.data?.message || "Upload failed. Is Gallery Service running?";
            toast.error(`❌ ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    // --- MANAGE HANDLERS ---
    const handleDeleteEvent = async (name: string) => {
        if (!confirm(`Are you sure you want to completely delete the gallery for "${name}"?`)) return;
        try {
            await axios.delete(`${GALLERY_API_END_POINT}/${encodeURIComponent(name)}`);
            toast.success(`Event "${name}" deleted.`);
            setEvents(events.filter(e => e.eventName !== name));
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete event.");
        }
    };

    const handleDeleteImage = async (eventName: string, imageUrl: string) => {
        if (!confirm("Remove this image from the gallery?")) return;
        try {
            await axios.delete(`${GALLERY_API_END_POINT}/${encodeURIComponent(eventName)}/image`, {
                data: { imageUrl }
            });
            toast.success("Image removed.");
            setEvents(events.map(ev => {
                if (ev.eventName === eventName) {
                    return { ...ev, eventImages: ev.eventImages.filter(img => img !== imageUrl) };
                }
                return ev;
            }));
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete image.");
        }
    };

    const handleRenameStart = (ev: GalleryEvent) => {
        setEditingEvent(ev._id);
        setEditNameValue(ev.eventName);
    };

    const handleRenameSubmit = async (oldName: string) => {
        if (!editNameValue.trim() || editNameValue.trim() === oldName) {
            setEditingEvent(null);
            return;
        }

        try {
            const res = await axios.put(`${GALLERY_API_END_POINT}/${encodeURIComponent(oldName)}`, {
                newEventName: editNameValue.trim()
            });
            toast.success("Event renamed!");
            setEditingEvent(null);
            fetchEvents();
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to rename event.");
        }
    };


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <ToastContainer theme="dark" position="top-right" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gallery</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage and upload photos for events</p>
                </div>
                
                <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                    <button 
                        onClick={() => setActiveTab("manage")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "manage" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Manage Events
                    </button>
                    <button 
                        onClick={() => setActiveTab("upload")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "upload" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
                    >
                        Upload Photos
                    </button>
                </div>
            </div>

            {/* TAB: UPLOAD */}
            {activeTab === "upload" && (
                <form onSubmit={handleUploadSubmit} className="space-y-5 bg-black/20 p-6 rounded-2xl border border-white/5">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Event Name <span className="text-gray-500 font-normal">(Existing names will append images)</span></label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={e => setEventName(e.target.value)}
                            placeholder="e.g. MH Cricket Finals"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div
                        onDrop={handleDrop}
                        onDragOver={e => e.preventDefault()}
                        className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer group"
                        onClick={() => document.getElementById("gallery-file-input")?.click()}
                    >
                        <ImagePlus size={36} className="mx-auto mb-3 text-gray-600 group-hover:text-purple-400 transition-colors" />
                        <p className="text-gray-400 text-sm">
                            <span className="text-purple-400 font-semibold">Click to select</span> or drag &amp; drop images
                        </p>
                        <p className="text-gray-600 text-xs mt-1">PNG, JPG, WEBP — max 20MB each</p>
                        <input
                            id="gallery-file-input"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {previews.length > 0 && (
                        <div>
                            <p className="text-gray-400 text-xs mb-3">{files.length} image(s) selected</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {previews.map((src, i) => (
                                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                            className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} className="text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || files.length === 0}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-40"
                    >
                        {loading ? (
                            <><Loader2 size={18} className="animate-spin" /> Uploading…</>
                        ) : (
                            <><Upload size={18} /> Upload {files.length > 0 ? `${files.length} Photo(s)` : "Photos"}</>
                        )}
                    </button>
                </form>
            )}

            {/* TAB: MANAGE */}
            {activeTab === "manage" && (
                <div className="space-y-4">
                    {fetchingEvents ? (
                         <div className="text-center py-10 text-gray-400 flex items-center justify-center gap-2">
                            <Loader2 size={18} className="animate-spin" /> Fetching gallery events...
                        </div>
                    ) : events.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 bg-white/5 rounded-2xl border border-white/5">
                            No gallery events found. Click 'Upload Photos' to create one.
                        </div>
                    ) : (
                        events.map(ev => (
                            <div key={ev._id} className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
                                {/* Header / Accordion Toggle */}
                                <div 
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => setExpandedEvent(expandedEvent === ev._id ? null : ev._id)}
                                >
                                    <div className="flex items-center gap-4">
                                        {editingEvent === ev._id ? (
                                            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                                <input 
                                                    autoFocus
                                                    value={editNameValue}
                                                    onChange={e => setEditNameValue(e.target.value)}
                                                    className="bg-black/50 border border-purple-500/50 rounded-lg px-2 py-1 text-white text-sm focus:outline-none"
                                                    onKeyDown={e => e.key === 'Enter' && handleRenameSubmit(ev.eventName)}
                                                />
                                                <button onClick={() => handleRenameSubmit(ev.eventName)} className="text-green-400 hover:text-green-300">
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button onClick={() => setEditingEvent(null)} className="text-red-400 hover:text-red-300">
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="font-semibold text-lg text-white">{ev.eventName}</h3>
                                                <span className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-full">
                                                    {ev.eventImages.length} images
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Actions */}
                                        <div className="flex items-center gap-1 mr-2" onClick={e => e.stopPropagation()}>
                                             <button 
                                                title="Rename Event"
                                                onClick={() => handleRenameStart(ev)}
                                                className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                                             >
                                                <Edit2 size={16} />
                                             </button>
                                             <button 
                                                title="Delete Event"
                                                onClick={() => handleDeleteEvent(ev.eventName)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                             >
                                                <Trash2 size={16} />
                                             </button>
                                        </div>
                                        {expandedEvent === ev._id ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                                    </div>
                                </div>

                                {/* Expanded Grid View */}
                                {expandedEvent === ev._id && (
                                    <div className="p-4 border-t border-white/5 bg-black/20">
                                        {ev.eventImages.length === 0 ? (
                                            <p className="text-sm text-gray-500 text-center py-4">No images. Delete the event or upload new ones.</p>
                                        ) : (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                 {ev.eventImages.map((imgUrl, i) => (
                                                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                                                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            title="Delete Image"
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteImage(ev.eventName, imgUrl); }}
                                                            className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 size={14} className="text-white" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="mt-4 flex justify-end">
                                            <button 
                                                onClick={() => {
                                                    setEventName(ev.eventName);
                                                    setActiveTab("upload");
                                                }}
                                                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                            >
                                                <ImagePlus size={16} /> Add more photos to "{ev.eventName}"
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
