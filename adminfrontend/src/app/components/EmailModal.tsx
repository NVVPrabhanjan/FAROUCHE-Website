import React, { useState } from 'react';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    
    selectedCount: number;
    totalCount: number;
}

export default function EmailModal({ isOpen, onClose, onSubmit, selectedCount, totalCount }: EmailModalProps) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [sending, setSending] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        await onSubmit({ subject, message, whatsappLink });
        setSending(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Send Custom Email</h2>
                
                <p className="mb-4 text-gray-600">
                    Sending to <span className="font-bold">{selectedCount > 0 ? selectedCount : totalCount}</span> recipients.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                            type="text"
                            required
                            className="w-full border rounded px-3 py-2"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Regarding Event Update"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            required
                            className="w-full border rounded px-3 py-2 h-32"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Dear participant, ..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">WhatsApp Group Link (Optional)</label>
                        <input
                            type="url"
                            className="w-full border rounded px-3 py-2"
                            value={whatsappLink}
                            onChange={(e) => setWhatsappLink(e.target.value)}
                            placeholder="https://chat.whatsapp.com/..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={sending}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {sending ? "Sending..." : "Send Email"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
