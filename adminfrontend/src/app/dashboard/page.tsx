"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    fetchEventsAdmin, 
    fetchEventRegistrations, 
    markAttendance,
    sendCustomEmail,
    deleteEvent
} from "../services/adminService";
import AddEventModal from "../components/AddEventModal";
import EmailModal from "../components/EmailModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pencil, Trash2 } from "lucide-react";

interface Registration {
    _id: string;
    name: string;
    registrationId: string;
    email: string;
    phoneNumber: string;
    year?: string;
    hostelName?: string;
    teamMembers?: string[];
    attendance: boolean;
}

interface Event {
    _id: string;
    title: string;
    date: string;
    venue: string;
    teamSize?: number;
    registrationCount?: number;
    description?: string;
    image?: string;
    group?: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);
    

    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all"); 


    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setLoading(true);
        try {
            const data = await fetchEventsAdmin();
            if (data.success) {
                setEvents(data.events);
            }
        } catch (error: any) {
            toast.error("Failed to load events");
            if (error.response?.status === 401) {
                router.push("/");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEventSelect = async (event: Event) => {
        setSelectedEvent(event);
        setLoading(true);
        try {
            const data = await fetchEventRegistrations(event._id);
            if (data.success) {
                setRegistrations(data.registrations || []);
                setSelectedUsers([]);
                setSearchTerm("");
                setFilterStatus("all");
            }
        } catch (error) {
            toast.error("Failed to load registrations");
            setRegistrations([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (e: React.MouseEvent, eventId: string) => {
        e.stopPropagation(); 
        if (confirm("Are you sure you want to delete this event? This cannot be undone.")) {
            try {
                await deleteEvent(eventId);
                toast.success("Event deleted");
                if (selectedEvent?._id === eventId) setSelectedEvent(null);
                loadEvents();
            } catch (error) {
                toast.error("Failed to delete event");
            }
        }
    };

    const handleEditEvent = (e: React.MouseEvent, event: Event) => {
        e.stopPropagation();
        setEventToEdit(event);
        setIsAddEventModalOpen(true);
    };

    const handleAttendance = async (regId: string, currentStatus: boolean) => {
        const updatedRegistrations = registrations.map(r => 
            r._id === regId ? { ...r, attendance: !currentStatus } : r
        );
        setRegistrations(updatedRegistrations);
        try {
            await markAttendance(regId, !currentStatus);
            toast.success("Attendance updated");
        } catch (error) {
            toast.error("Failed to update attendance");
            setRegistrations(registrations); 
        }
    };

    const toggleSelectUser = (id: string) => {
        setSelectedUsers(prev => 
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredRegistrations.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredRegistrations.map(r => r._id));
        }
    };

    const handleSendEmail = async (emailData: any) => {
        try {
            const payload = {
                eventId: selectedEvent?._id,
                userIds: selectedUsers.length > 0 ? selectedUsers : null,
                ...emailData
            };
            const response = await sendCustomEmail(payload);
            toast.success(response.message);
        } catch (error) {
            toast.error("Failed to send emails");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExportCSV = () => {
        if (!filteredRegistrations.length) {
            toast.warn("No data to export");
            return;
        }

        const headers = ["Registration ID", "Name", "Email", "Phone", "Year", "Status"];
        const rows = filteredRegistrations.map(reg => [
            reg.registrationId || "N/A",
            `"${reg.name}"`,
            reg.email,
            reg.phoneNumber,
            reg.year || "-",
            reg.attendance ? "Present" : "Absent"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${selectedEvent?.title}_registrations.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const filteredRegistrations = useMemo(() => {
        if (!registrations) return [];
        return registrations.filter(reg => {
            const searchLower = (searchTerm || "").toLowerCase();
            const name = (reg.name || "").toLowerCase();
            const email = (reg.email || "").toLowerCase();
            const regId = (reg.registrationId || "").toLowerCase();
            
            const matchesSearch = 
                name.includes(searchLower) || 
                email.includes(searchLower) ||
                regId.includes(searchLower);
            
            const matchesFilter = 
                filterStatus === 'all' ? true :
                filterStatus === 'present' ? reg.attendance === true :
                reg.attendance === false;

            return matchesSearch && matchesFilter;
        });
    }, [registrations, searchTerm, filterStatus]);


    const totalGlobalRegistrations = useMemo(() => {
        return events.reduce((acc, curr) => acc + (curr.registrationCount || 0), 0);
    }, [events]);

    const eventStats = useMemo(() => {
        if (!registrations || registrations.length === 0) return { total: 0, present: 0, absent: 0, attendanceRate: 0 };
        const total = registrations.length;
        const present = registrations.filter(r => r.attendance).length;
        return {
            total,
            present,
            absent: total - present,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0
        };
    }, [registrations]);

    if (loading && !events.length) return <div className="p-10 text-center text-foreground font-bold text-xl animate-pulse">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-6 text-foreground">
            <ToastContainer theme="dark" />
            <div className="max-w-7xl mx-auto hide-print"> 
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        {!selectedEvent && (
                            <button
                                onClick={() => { setEventToEdit(null); setIsAddEventModalOpen(true); }}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-purple-900/20 transition transform hover:scale-105 active:scale-95"
                            >
                                + Create Event
                            </button>
                        )}
                        {selectedEvent && (
                            <button 
                                onClick={() => setSelectedEvent(null)}
                                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded font-medium transition"
                            >
                                &larr; Back to Events
                            </button>
                        )}
                    </div>
                </div>

                
                {!selectedEvent && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-6 rounded-xl shadow-sm">
                            <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Total Events</h3>
                            <p className="text-4xl font-bold text-blue-500 mt-2">{events.length}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 p-6 rounded-xl shadow-sm">
                            <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm">Total Registrations</h3>
                            <p className="text-4xl font-bold text-purple-500 mt-2">{totalGlobalRegistrations}</p>
                        </div>
                         <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 p-6 rounded-xl shadow-sm">
                            <h3 className="text-muted-foreground font-medium uppercase tracking-wider text-sm">System Status</h3>
                            <p className="text-4xl font-bold text-emerald-500 mt-2">Active</p>
                        </div>
                    </div>
                )}
            </div>

            
            {!selectedEvent ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {events.map(event => (
                        <div 
                            key={event._id} 
                            onClick={() => handleEventSelect(event)}
                            className="bg-card text-card-foreground p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 border border-border hover:border-primary group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-bold group-hover:text-primary transition-colors flex-1">{event.title}</h2>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => handleEditEvent(e, event)}
                                        className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                                        title="Edit Event"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                     <button 
                                        onClick={(e) => handleDeleteEvent(e, event._id)}
                                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                                        title="Delete Event"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-1 flex items-center gap-2">📅 <span>{new Date(event.date).toLocaleDateString()}</span></p>
                            <p className="text-muted-foreground mb-4 flex items-center gap-2">📍 <span>{event.venue || "TBD"}</span></p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-border">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground uppercase font-semibold">Registrations</span>
                                    <span className="text-lg font-bold text-primary">{event.registrationCount || 0}</span>
                                </div>
                                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                    View Details &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                
                <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 border border-border max-w-7xl mx-auto">
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 print:hidden">
                        <div className="bg-background p-4 rounded-lg border border-border text-center">
                            <p className="text-muted-foreground text-xs uppercase font-bold">Total</p>
                            <p className="text-2xl font-bold">{eventStats.total}</p>
                        </div>
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                            <p className="text-green-600 text-xs uppercase font-bold">Present</p>
                            <p className="text-2xl font-bold text-green-700">{eventStats.present}</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 text-center">
                            <p className="text-red-500 text-xs uppercase font-bold">Absent</p>
                            <p className="text-2xl font-bold text-red-600">{eventStats.absent}</p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-center">
                            <p className="text-blue-500 text-xs uppercase font-bold">Turnout</p>
                            <p className="text-2xl font-bold text-blue-600">{eventStats.attendanceRate}%</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 hide-print gap-4 pb-6 border-b border-border">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                                <button 
                                    onClick={(e) => handleEditEvent(e, selectedEvent)}
                                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-full transition-colors"
                                    title="Edit Event"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1">{new Date(selectedEvent.date).toDateString()} • {selectedEvent.venue}</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                             <button 
                                onClick={handleExportCSV}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition"
                            >
                                📥 Export CSV
                            </button>
                            <button 
                                onClick={handlePrint}
                                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition"
                            >
                                🖨️ Print List
                            </button>
                            <button 
                                onClick={() => setIsEmailModalOpen(true)}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition shadow-lg shadow-primary/20"
                            >
                                ✉️ Broadcast Email
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex flex-col md:flex-row gap-4 mb-6 hide-print">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">🔍</span>
                            </div>
                            <input 
                                type="text"
                                placeholder="Search by name, email, or Reg ID..."
                                className="w-full bg-input border border-border pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex-shrink-0 w-full md:w-48">
                            <select 
                                className="w-full bg-input border border-border px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="present">Only Present</option>
                                <option value="absent">Only Absent</option>
                            </select>
                        </div>
                    </div>

                    
                    <div className="hidden show-print mb-8 border-b border-black pb-4">
                        <h1 className="text-3xl font-bold mb-2">{selectedEvent.title}</h1>
                        <div className="flex gap-8 text-sm font-mono uppercase tracking-wider">
                            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                            <p><strong>Type:</strong> {(selectedEvent.teamSize || 1) > 1 ? `Group Event (Size: ${selectedEvent.teamSize})` : "Individual Event"}</p>
                            <p><strong>Total Registrations:</strong> {registrations.length}</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto print-container rounded-lg border border-border">
                        <table className="min-w-full divide-y divide-border">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider hide-print w-10">
                                        <input 
                                            type="checkbox" 
                                            onChange={toggleSelectAll}
                                            checked={filteredRegistrations.length > 0 && selectedUsers.length === filteredRegistrations.length}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider hide-print">Reg ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Participant</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Year</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-border">
                                {filteredRegistrations.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No registrations found matching your search.</td></tr>
                                ) : filteredRegistrations.map((reg) => (
                                    <tr key={reg._id} className={`transition-colors ${reg.attendance ? "bg-green-500/5 hover:bg-green-500/10" : "hover:bg-muted/50"}`}>
                                        <td className="px-6 py-4 whitespace-nowrap hide-print">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedUsers.includes(reg._id)}
                                                onChange={() => toggleSelectUser(reg._id)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-muted-foreground hide-print">{reg.registrationId || "N/A"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-sm">{reg.name}</span>
                                                {(selectedEvent.teamSize || 1) > 1 && <span className="text-[10px] uppercase tracking-wide text-primary font-semibold mt-0.5">Team Leader</span>}
                                            </div>
                                            {(selectedEvent.teamSize || 1) > 1 && reg.teamMembers && reg.teamMembers.length > 0 && (
                                                <div className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                                                    <p className="font-semibold mb-1">Team Members:</p>
                                                    <ul className="list-disc list-inside space-y-0.5">
                                                        {reg.teamMembers.map((member: string, i: number) => (
                                                            <li key={i}>{member}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{reg.year || "-"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-foreground">{reg.phoneNumber}</span>
                                                <span className="text-muted-foreground text-xs">{reg.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center hide-print">
                                            <button
                                                onClick={() => handleAttendance(reg._id, reg.attendance)}
                                                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all transform active:scale-95 ${
                                                    reg.attendance 
                                                    ? 'bg-green-500/20 text-green-500 border-green-500/30 hover:bg-green-500/30' 
                                                    : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                                                }`}
                                            >
                                                {reg.attendance ? "Present" : "Mark Present"}
                                            </button>
                                        </td>
                                        
                                        <td className="hidden show-print px-6 py-4 whitespace-nowrap text-center">
                                            {reg.attendance ? "✅" : "❌"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    
                    <div className="mt-4 text-xs text-muted-foreground text-right hide-print">
                        Showing {filteredRegistrations.length} of {registrations.length} registrations
                    </div>
                </div>
            )}

            <EmailModal 
                isOpen={isEmailModalOpen} 
                onClose={() => setIsEmailModalOpen(false)}
                onSubmit={handleSendEmail}
                selectedCount={selectedUsers.length}
                totalCount={registrations.length}
            />

            <AddEventModal 
                isOpen={isAddEventModalOpen}
                onClose={() => {
                    setIsAddEventModalOpen(false);
                    setEventToEdit(null);
                }}
                onEventAdded={loadEvents}
                initialData={eventToEdit}
            />

            <style jsx global>{`
                @media print {
                    .hide-print {
                        display: none !important;
                    }
                    .show-print {
                        display: block !important;
                    }
                    tr.show-print, td.show-print {
                         display: table-cell !important;
                    }
                    .print-container {
                        overflow: visible !important;
                        border: none !important;
                    }
                    html, body {
                        background: white !important;
                        background-color: white !important;
                        background-image: none !important;
                        color: black !important;
                    }
                    table {
                        width: 100% !important;
                        border-collapse: collapse !important;
                    }
                    table, th, td {
                        border: 1px solid #000 !important;
                        color: #000 !important;
                    }
                    
                    * {
                        background-color: white !important;
                        color: black !important;
                        border-color: black !important;
                        background-image: none !important;
                        box-shadow: none !important;
                        text-shadow: none !important;
                    }
                    thead th {
                        background-color: #f3f4f6 !important;
                        font-weight: bold !important;
                    }
                    
                    * {
                        box-shadow: none !important;
                        text-shadow: none !important;
                    }
                }
                .show-print {
                    display: none;
                }
            `}</style>
        </div>
    );
}