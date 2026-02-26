"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImagePlus, X, Upload, Loader2 } from "lucide-react";
import { useAPIConfig } from "@/context/APIConfigContext";

export default function GalleryPage() {
    const { GALLERY_ADD_END_POINT } = useAPIConfig();
    const [eventName, setEventName] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
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
        } catch (err: any) {
            const msg = err.response?.data?.message || "Upload failed. Is Gallery Service running?";
            toast.error(`❌ ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <ToastContainer theme="dark" position="top-right" />

            <div>
                <h1 className="text-2xl font-bold text-white">Gallery Upload</h1>
                <p className="text-gray-400 text-sm mt-1">Upload multiple photos to an event gallery</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Event Name</label>
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
                                        onClick={() => removeFile(i)}
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
        </div>
    );
}
